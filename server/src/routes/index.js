const express=require('express');
const mongoose= require('mongoose');
const ObjectId =mongoose.Types.ObjectId
const config=require('../config/config')
const router=express.Router();
const multer = require('multer');
const mult_conf=require('../multer/index')
const upload=multer({storage:mult_conf.storage,fileFilter:mult_conf.filefilter})
const upload_portada=multer({storage:mult_conf.storage2,fileFilter:mult_conf.filefilter2})
const upload_galeria=multer({storage:mult_conf.storage3,filefilter:mult_conf.filefilter2})
const jwt = require('jsonwebtoken');
const moment = require('moment-timezone');
const DeviceDetector = require('node-device-detector');
const fs=require('fs')
const path=require('path')

const middlewares=require('../middleware/middleware')
const bcrypt = require('bcrypt');
const macaddress = require('macaddress');

const empresa=require('../models/empresa')
const usuario=require('../models/user');
const admin=require('../models/admin');
const middleware = require('../middleware/middleware');

router.get('/empresa',async (req,res)=>{
    const lista_empresa=await empresa.find()
    res.json({
        cod:"200",
        data:lista_empresa
    });
});
//Usuario
router.post('/usuario',async (req,res)=>{
    const lista_usuario=await usuario.find(req.body).select('usuario');
    if(lista_usuario.length>0)
    {
        res.json({
            cod:"500"
        });
    }
    else
    {   
        res.json({
            cod:"200"
        });
    }
    
});
router.post('/registrar',async(req,res)=>{
    let nueva_contraseña= await bcrypt.hash(req.body.contraseña,10);
    req.body.contraseña=nueva_contraseña
    let user={
        nombre:req.body.nombre,
        apellido:req.body.apellido,
        genero:req.body.genero,
        correo_electronico:req.body.correo_electronico,
        pais:req.body.pais,
        usuario:req.body.usuario,
        contraseña:req.body.contraseña
    }
    const nuevo_usuario=new usuario(user);
    let data=await nuevo_usuario.save();
    if(typeof data === 'object' && data !== null)
        {
            res.json({
                status:"Creado",
                cod:"200"
            })
        }
        else{
            res.json({
                status:"Error",
                cod:"500"
            })
        }
})
router.post('/iniciar_sesion',async(req,res)=>{
    let data={
        usuario:req.body.usuario
    }
    const usuario_buscado=await usuario.findOne(data).select('contraseña id')
    if(usuario_buscado==null)
    {
        res.json({
            cod:"500"
        })
    }
    else
    {
       let resultado=await bcrypt.compare(req.body.contraseña, usuario_buscado.contraseña);
       if(resultado)
       {
            const payload = {
                user:req.body.usuario
            };
            const detector = new DeviceDetector;
            const userAgent = req.get('user-agent')
            const result = detector.detect(userAgent);
            let nombre_dispostivio="SO:"+result.os.name+" "+result.os.version+" NAVEGADOR:"+result.client.name+" Equipo:"+result.device.type
            const mac=await macaddress.one()
            let sesion={
                name:mac,
                nombre:nombre_dispostivio,
                fecha_ingreso:moment.tz().add(-5,'hours')
            }
            await usuario.findByIdAndUpdate(usuario_buscado.id,{$push:{sesiones_dispositivos:sesion}})
            const token = jwt.sign(payload, config.llave);
               res.json({
                id:usuario_buscado.id,
                token: token,
                cod:"200"
            });
       }
       else
       {
            res.json({
                cod:"500"
            })
       }
    }
})
router.post('/logout',async(req,res)=>{
    const mac=await macaddress.one()
    const usuario_actualizado=await usuario.findByIdAndUpdate(req.body.id,{$pull:{'sesiones_dispositivos':{name:mac}}})
    res.json({
        cod:200
    })
})

router.post('/login-gestion',async(req,res)=>{
    let data={
        usuario:req.body.usuario
    }
    let usuario_buscado=await admin.findOne(data)
    if(usuario_buscado==null)
    {
        res.json({
            cod:"500"
        })
    }
    else
    {
       let resultado=await bcrypt.compare(req.body.contraseña, usuario_buscado.contraseña);
       if(resultado)
       {
            const payload = {
                user:req.body.usuario
            };
            const token = jwt.sign(payload, config.llave,{
                expiresIn:'24h'
            });
               res.json({
                id:usuario_buscado.id,
                token: token,
                cod:"200"
            });
       }
       else
       {
            res.json({
                cod:"500"
            })
       }
    }
})

//Rutas proteguidas

router.get('/mi-perfil/:id',middlewares.rutasProtegidas_get,async(req,res)=>{
    let data_envio={
        _id:req.params.id
    }
    let mac=await macaddress.one()
    let datos=await usuario.findOne(data_envio).select('apellido correo_electronico genero nombre pais sesiones_dispositivos')
    let empresas=await empresa.find({"user_id":req.params.id}).select('ruc razon_social url_logo')
    res.json({
        cod:"200",
        data:datos,
        mac_actual:mac,
        empresa:empresas
    })
});
router.post('/actualizar_datos',middlewares.rutasProtegidas_post,async(req,res)=>{
    const datos_cambiados= await usuario.findByIdAndUpdate(req.body.id,{$set:{ 
        nombre:req.body.persona.nombre,
        apellido:req.body.persona.apellido,
        correo_electronico:req.body.persona.correo,
        pais:req.body.persona.pais,
        genero:req.body.persona.genero
    }
    })
    if(datos_cambiados!=null)
    {
        res.json({cod:"200"})
    }
    else
    {
        res.json({cod:"201"})
    }
})
router.post('/cambio_contrasena',middlewares.rutasProtegidas_post,async(req,res)=>{
    let cont_actual=await usuario.findById(req.body.id).select('contraseña')
    if(cont_actual!=null)
    {
        let es_contraseña=await bcrypt.compare(req.body.antigua, cont_actual.contraseña);
        if(es_contraseña)
        {
            let contraseña_nueva= await bcrypt.hash(req.body.nueva_contraseña,10);
            let es_cambio=await usuario.findByIdAndUpdate(req.body.id,{
                contraseña:contraseña_nueva
            })
            if(es_cambio!=null)
            {
                res.json({cod:"200"})
            }
            else
            {
                res.json({cod:"201"})
            }
        }
        else
        {
            res.json({cod:"202"})
        }
    }
    else
    {
        res.json({cod:"203"})
    }
    
})

router.post('/eliminar_dispositivo',middlewares.rutasProtegidas_post,async(req,res)=>{
    let dispositivo_eliminado=await usuario.findByIdAndUpdate(req.body.id,{$pull:{"sesiones_dispositivos":{_id:req.body.id_dispositivo}}})
    if(dispositivo_eliminado!=null)res.json({cod:"200"})
    else res.json({cod:"201"})
})
router.get('/obt_misfavoritos/:id',middlewares.rutasProtegidas_get,async(req,res)=>{
    let mis_favoritos=await usuario.findById(req.params.id).select('lista_favoritos.empresa_id lista_favoritos.url_imagen lista_favoritos.titulo')
    res.json({cod:"200",data:mis_favoritos})
})
router.post('/nueva-empresa/:id',[middlewares.rutasProtegidas_get,upload.single('image')],async(req,res)=>{
    let cantidad=await empresa.find({'user_id':req.params.id}).select('ruc');
    if(cantidad.length<=5)
    {
        let url=req.body.ruc+".png"
        const nueva_empresa=new empresa({ruc:req.body.ruc,
            razon_social:req.body.razon_social,
            nombre_comercial:req.body.nombre_comercial,
            url_logo: url,
            user_id: req.body.id,
            categorias:[req.body.categoria],
            forma_contacto:[{
                tipo_dispositivo: req.body.tipo_dispositivo,
                contacto: req.body.contacto,
                persona: req.body.persona
            }],
            locacion: [
                {
                    tipo_sede: req.body.tipo_sede,
                    direccion: req.body.direccion
                }
            ]  
            })
        let data = await nueva_empresa.save()
        if(data!=null){res.json({cod:"200"})}
        else {res.json({cod:"201"})}
    }
    else
    {
        res.json({cod:"202"})
    }
})
router.post('/ver_empresa',middleware.rutasProtegidas_post,async(req,res)=>{
    let ver_empresa=await empresa.find({ruc:req.body.ruc}).select('ruc')
    
    if(ver_empresa.length>0)
    {
        res.json({
            cod:"500"
        });
    }
    else
    {   
        res.json({
            cod:"200"
        });
    }
})
router.get('/obt_misempresas/:id',middlewares.rutasProtegidas_get,async(req,res)=>{
    let mis_favoritos=await empresa.find({"user_id":req.params.id}).select('id ruc razon_social url_logo estado')
    res.json({cod:"200",data:mis_favoritos})

})
router.get('/:id/obt_empresa/:ruc',middlewares.rutasProtegidas_get,async(req,res)=>{
    const userID=req.params.id
    const empresaRUC=req.params.ruc
    let verificar_propiedad=await empresa.find({"ruc":empresaRUC,"user_id":userID})
    if(verificar_propiedad!=null && verificar_propiedad.length>0)
    {
        res.json({
            cod:"200",
            data:verificar_propiedad
        })
    }
    else
    {
        res.json({
            cod:"201"
        })
    }
})
router.post('/act_logo/:id',[middlewares.rutasProtegidas_get,upload.single('image')],async(req,res)=>{
    res.json({cod:"200"})
})
router.post('/act_datos',middlewares.rutasProtegidas_post,async(req,res)=>{
    let empresa_act =await empresa.findOneAndUpdate({'ruc':req.body.ruc,"user_id":req.body.id},{$set:{
        "razon_social":req.body.razon_social,
        "nombre_comercial":req.body.nombre_comercial,
        "categorias":[],
        "descripcion":req.body.descripcion
    }})
    empresa_act =await empresa.findOneAndUpdate({'ruc':req.body.ruc,"user_id":req.body.id},{$set:{
        "categorias":req.body.categorias
    }})
    res.json({
        cod:"200"
    })
})
router.post('/act_locacion',middlewares.rutasProtegidas_post,async(req,res)=>{
    let empresa_act =await empresa.findOneAndUpdate({'ruc':req.body.ruc,"user_id":req.body.id},{$set:{
        "locacion":[]
    }})
    empresa_act =await empresa.findOneAndUpdate({'ruc':req.body.ruc,"user_id":req.body.id},{$set:{
        "locacion":req.body.locacion
    }})
    res.json({
        cod:"200"
    })
})
router.post('/act_formacontacto',middlewares.rutasProtegidas_post,async(req,res)=>{
    let empresa_act =await empresa.findOneAndUpdate({'ruc':req.body.ruc,"user_id":req.body.id},{$set:{
        "forma_contacto":[]
    }})
    empresa_act =await empresa.findOneAndUpdate({'ruc':req.body.ruc,"user_id":req.body.id},{$set:{
        "forma_contacto":req.body.forma_contacto
    }})
    res.json({
        cod:"200"
    })
})
router.post('/nuevo_producto/:id',[middlewares.rutasProtegidas_get,upload_portada.single('image')],async(req,res)=>{
        let url="/empresas/"+req.body.id+"/"+req.body.ruc+"-"+req.body.codigo+"/p-"+req.body.codigo+".png"
    let nuevo_producto=await empresa.findOneAndUpdate({"ruc":req.body.ruc,"user_id":req.body.id},{$push:{
        "producto":{"codigo":req.body.codigo.toUpperCase(),"marca":req.body.marca,"nombre":req.body.nombre,"descripcion":req.body.descripcion,
    "categoria":req.body.categoria,"imagen_portada":url}
    }})
    if(nuevo_producto!=null)  res.json({cod:"200"})
    else res.json({cod:"201"})
})
router.post('/vercodigo',middleware.rutasProtegidas_post,async(req,res)=>{
    let ver_empresa=await empresa.find({"ruc":req.body.ruc,"producto.codigo":req.body.codigo.toUpperCase()}).select('producto.codigo')
    if(ver_empresa.length>0)
    {
        res.json({
            cod:"500"
        });
    }
    else
    {   
        res.json({
            cod:"200"
        });
    }

})
router.post('/act_cabproducto',middlewares.rutasProtegidas_post,async(req,res)=>{
    let act_producto =await empresa.update({'producto._id':req.body.producto_id},{$set:{
        "producto.$.nombre":req.body.nombre,
        "producto.$.descripcion":req.body.descripcion,
        "producto.$.marca":req.body.marca,
        "producto.$.categoria":req.body.categoria,
        "producto.$.tipo_producto":"",
        "producto.$.tipo_calzado":"",
        "producto.$.material":"",
        "producto.$.genero":""
    }})
    if(act_producto!=null) res.json({cod:"200"})
    else res.json({cod:"201"})
})
router.post('/obtener_producto/:id/:ruc/:codigo',middlewares.rutasProtegidas_get,async(req,res)=>{
   //let producto=await  empresa.find({"ruc":req.params.ruc,"user_id":req.params.id,"producto":{$elemMatch:{'codigo':req.params.codigo}}}).select('producto')  

   let producto=await  empresa.aggregate(
    [{$unwind: "$producto"}, {$match:{"producto.codigo" : req.params.codigo,"ruc":req.params.ruc}}]
   )
   if(producto!=null)
   {
       let empresa_id=producto[0]._id
        res.json({cod:"200",data:producto[0].producto,empresa_id:empresa_id})
   }
   else
   {
       res.json({cod:"403"})
   }
   
})
router.post('/act_prodportada/:id',[middlewares.rutasProtegidas_get,upload_portada.single('image')],async(req,res)=>{
    res.json({cod:"200"})
})
router.post('/act_galeria/:id',[middlewares.rutasProtegidas_get,upload_galeria.single('image')],async (req,res)=>{
    let url='/empresas/'+req.params.id+"/"+req.body.ruc+"-"+req.body.codigo+"/galeria/"+req.body.nombre+"-"+req.body.codigo+".png"
    let galeria=await empresa.update({"_id":req.body.empresa_id,"producto._id":req.body.producto_id},
    { "$push": 
        {"producto.$.galeria": 
            {
                "url_imagen": url
            }
        }
    })
    if(galeria!=null) res.json({cod:"200"})
    else res.json({cod:"201"})
})
router.post('/eliminar_imagengaleria',middleware.rutasProtegidas_post,async(req,res)=>{
    //let path=req.body.ruta
    let ruta=path.join(__dirname,'..','public',req.body.ruta);
    fs.unlink(ruta,async(erro)=>{
      if(erro){res.json({"cod":"201"})}
      let galeria=await empresa.updateOne   ({"_id":req.body.empresa_id},
        { "$pull": 
            {"producto.0.galeria":
                {"url_imagen": req.body.ruta}
            }
        })
        if(galeria!=null) res.json({cod:"200"})
        else res.json({cod:"201"})
    })
    
})
router.post('/act_precios',middleware.rutasProtegidas_post,async(req,res)=>{
    let empresa_act=await empresa.update({"producto._id":req.body.producto_id},{$set:{"producto.$.precios":[]}})
    empresa_act=await empresa.update({"producto._id":req.body.producto_id},{$push:{"producto.$.precios":req.body.precios}})
    if(empresa_act!=null)res.json({cod:"200"})
    else res.json({cod:"201"})
})
router.post('/act_materiales',middleware.rutasProtegidas_post,async (req,res)=>{
    let empresa_act=await empresa.update({"producto._id":req.body.producto_id},{$set:{
        "producto.$.tipo_producto":req.body.tipo_producto,
        "producto.$.tipo_calzado":req.body.tipo_calzado,
        "producto.$.material":req.body.material,
        "producto.$.genero":req.body.genero
    }}) 
    if(empresa_act!=null) res.json({cod:"200"})
    else res.json({cod:"201"})
})
router.post('/add_color',middleware.rutasProtegidas_post,async(req,res)=>{
    let empresa_act=await empresa.update({"producto._id":req.body.producto_id},{$push:{
        "producto.$.colores":req.body.color
    }})
    if(empresa_act!=null) res.json({cod:"200"})
    else res.json({cod:"201"})
})
router.post('/eliminar_color',middleware.rutasProtegidas_post,async(req,res)=>{
    let empresa_act=await empresa.update(
        {_id:req.body.empresa_id,"producto._id":req.body.producto_id},
        {$pull:{"producto.0.colores":{"color":req.body.color}}}
    )
    if(empresa_act!=null) res.json({cod:"200"})
    else res.json({cod:"201"})
})
router.post('/producto_estado',middleware.rutasProtegidas_post,async(req,res)=>{
    let empresa_act= await empresa.update(
        {"producto._id":req.body.producto_id},
        {$set:{"producto.$.estado":req.body.estado}}
    )   
    if(empresa_act!=null) res.json({cod:"200"})
    else res.json({cod:"201"})
})
router.post('/empresa_estado',middleware.rutasProtegidas_post,async(req,res)=>{
    let empresa_act= await empresa.update(
        {"ruc":req.body.ruc},
        {$set:{"estado":req.body.estado}}
    )  
    if(empresa_act!=null) res.json({cod:"200"})
    else res.json({cod:"201"})
})
router.get('/obt_empresas',async (req,res)=>{
    let mis_favoritos=await empresa.find({"estado":"1"}).sort({razon_social:'ascending'}).select('id ruc razon_social url_logo cantidad_favoritos categorias producto.nombre')
    res.json({cod:"200",data:mis_favoritos})
})
router.get('/obt_datos_empresa/:id',async (req,res)=>{
    let mis_favoritos=await empresa.find({"_id":req.params.id}).select('_id url_logo cantidad_favoritos categorias descripcion forma_contacto locacion razon_social')
    res.json({cod:"200",data:mis_favoritos})
})
router.get('/obtener_producto/:id/:pagina',async(req,res)=>{
    let tipo=req.params.id
    let producto
    if(tipo=="all")
    {
        producto=await empresa.aggregate([
            {$unwind:"$producto"},
            {$match:{"producto.estado":1}},
            {$project:{array:"$producto",nombre:"$razon_social"}}
        ]).skip(req.params.pagina>0?((req.params.pagina-1)*5):0).limit(5)
    }
    else
    {
        producto=await empresa.aggregate([
            {$match:{"_id":ObjectId(req.params.id)}},
            {$unwind:"$producto"},
            {$match:{"producto.estado":1}},
            {$project:{array:"$producto",nombre:""}}
        ]).skip(req.params.pagina>0?((req.params.pagina-1)*5):0).limit(5)
    }
    res.json({cod:"200",data:producto})
})
router.get('/obtener_todos_productos/:id',async(req,res)=>{
    let id=req.params.id
    let producto=""
    if(id=="all")
    {
        producto=await empresa.aggregate([
            {$unwind:"$producto"},
            {$match:{"producto.estado":1}},
            {$project:{array:"$producto"}}
        ])
    }
    else
    {
        producto=await empresa.aggregate([
            {$match:{"_id":ObjectId(req.params.id)}},
            {$unwind:"$producto"},
            {$match:{"producto.estado":1}},
            {$project:{array:"$producto"}}
        ])
    }

    res.json({cod:"200",data:producto})
})
router.get('/producto/:id/:cod',async(req,res)=>{
    let producto= await empresa.find({"_id":req.params.id},{"producto":{$elemMatch:{"codigo":req.params.cod}}})
    res.json({cod:"200",data:producto})
})
router.get('/obt_Todos_productos',async(req,res)=>{
    let producto=await empresa.aggregate([
        {$unwind:"$producto"},
        {$match:{"producto.estado":1}},
        {$project:{array:"$producto"}}
    ])
    res.json({cod:"200",data:producto})
})

module.exports=router;
