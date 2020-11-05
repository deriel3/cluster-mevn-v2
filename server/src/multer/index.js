const multer =require('multer')
const path =require('path')
const fs=require('fs')

const empresa=require('../models/empresa')

module.exports={
    storage:multer.diskStorage({
        destination: (req,file,cb)=>{
            const userID=req.body.id
            const dir ='../cliente/src/assets/empresas/'+userID
            fs.exists(dir,exist=>{
                if(!exist) return fs.mkdir(dir,error=>cb(error,dir))
                return cb(null,dir)
            })
        },
        filename: (req,file,db)=>{
            const empresaID=req.body.ruc
            db(null,empresaID+path.extname(file.originalname))
            
        }
    }),
    storage2:multer.diskStorage({
        destination: (req,file,cb)=>{
            const userID=req.body.id
            const productoCOD=req.body.codigo
            const ruc=req.body.ruc
            const dir ='./src/public/empresas/'+userID+"/"+ruc+"-"+productoCOD
            fs.exists(dir,exist=>{
                if(!exist) return fs.mkdir(dir,error=>cb(error,dir))
                return cb(null,dir)
            })
        },
        filename: (req,file,db)=>{
            const productoCOD=req.body.codigo
            db(null,"p-"+productoCOD+path.extname(file.originalname))
            
        }
    }),
    storage3:multer.diskStorage({
        destination: (req,file,cb)=>{
            const userID=req.body.id
            const productoCOD=req.body.codigo
            const ruc=req.body.ruc
            const dir ='./src/public/empresas/'+userID+"/"+ruc+"-"+productoCOD+"/galeria"
            fs.exists(dir,exist=>{
                if(!exist) return fs.mkdir(dir,error=>cb(error,dir))
                return cb(null,dir)
            })
        },
        filename: (req,file,db)=>{
            const productoCOD=req.body.codigo
            const nombre=req.body.nombre
            db(null,nombre+"-"+productoCOD+path.extname(file.originalname))
            
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