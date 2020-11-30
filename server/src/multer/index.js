const multer =require('multer')
const path =require('path')
const fs=require('fs')

const empresa=require('../models/empresa')

module.exports={
    //storage de logo de la empresa
    storage:multer.diskStorage({
        destination: (req,file,cb)=>{
            const userID=req.body.id
            const ruc = req.body.ruc
            const dir ='./src/assets/empresas/'+userID
            const dir2 = './src/assets/empresas/'+userID+'/'+ruc
            fs.exists(dir,exist=>{
                if(!exist) {
                    fs.mkdir(dir,error=>cb(error,dir))
                    fs.exists(dir2,ex => {
                        return fs.mkdir(dir2,erro=>cb(erro,dir2))
                    })
                } 
                return cb(null,dir)
            })
        },
        filename: (req,file,db)=>{
            const empresaID=req.body.ruc
            const segundo=req.body.segundo
            const extension = path.extname(file.originalname)
            db(null,segundo+"-"+empresaID+extension.toLowerCase())
        }
    }),
    //storage de producto
    storage2:multer.diskStorage({
        destination: (req,file,cb)=>{
            const userID=req.body.id
            const productoCOD=req.body.codigo
            const ruc=req.body.ruc
            const dir ='./src/assets/empresas/'+userID+"/"+ruc+"-"+productoCOD.toLowerCase()
            fs.exists(dir,exist=>{
                if(!exist) return fs.mkdir(dir,error=>cb(error,dir))
                return cb(null,dir)
            })
        },
        filename: (req,file,db)=>{
            const productoCOD=req.body.codigo
            const segundo = req.body.segundo
            const extension = path.extname(file.originalname)
            db(null,segundo+"-p-"+productoCOD.toLowerCase()+extension.toLowerCase())
            
        }
    }),
    //storage de galeria de producto
    storage3:multer.diskStorage({
        destination: (req,file,cb)=>{
            const userID=req.body.id
            const productoCOD=req.body.codigo
            const ruc=req.body.ruc
            const dir ='./src/assets/empresas/'+userID+"/"+ruc+"-"+productoCOD.toLowerCase()+"/galeria"
            fs.exists(dir,exist=>{
                if(!exist) return fs.mkdir(dir,error=>cb(error,dir))
                return cb(null,dir)
            })
        },
        filename: (req,file,db)=>{
            const productoCOD=req.body.codigo
            const nombre=req.body.nombre
            const extension = path.extname(file.originalname)
            db(null,nombre+"-"+productoCOD.toLowerCase()+extension.toLowerCase())
        }
    }),
    //storage de portada de empresas
    storage4:multer.diskStorage({
        destination: (req,file,cb)=>{
            const userID=req.body.id
            const dir ='./src/assets/empresas/'+userID
            fs.exists(dir,exist=>{
                if(!exist) return fs.mkdir(dir,error=>cb(error,dir))
                return cb(null,dir)
            })
        },
        filename: (req,file,db)=>{
            const empresaID=req.body.ruc
            const segundo = req.body.segundo
            const extension = path.extname(file.originalname)
            db(null,segundo+"-portada"+empresaID+extension.toLowerCase())
            
        }
    }),

    filefilter2:async (req,file,cb)=>{
        if(file.mimetype =='image/png'){
            cb(null,true);
        }
        else
        {
            cb(null,false)
        }
         
        
    },
    filefilter:async (req,file,cb)=>{
        const userID=req.body.id
        const accion=req.body.accion
        let cantidad=await empresa.find({'user_id':userID}).select('ruc');
        if(accion==1)
        {
            if(cantidad.length<=5)
            {
                if(file.mimetype =='image/png'){
                    cb(null,true);
                }
                else
                {
                    cb(null,false)
                }
            }
            else
            {
                cb(null,false)
            }  
        }
        else{
            if(file.mimetype =='image/png'){
                cb(null,true);
            }
            else
            {
                cb(null,false)
            }
        }
         
        
    }
}