const config=require('../config/config')
const jwt = require('jsonwebtoken');
const macaddress = require('macaddress');
const usuario=require('../models/user')
const multer = require('multer');
const upload=multer()
const cookies=require('js-cookie')

module.exports={
    rutasProtegidas_get:async function(req, res, next) {
      const mac=await macaddress.one()
      const lista_dispositivos= await usuario.find({$and:[
        {
          _id:req.params.id
        },
        {
          "sesiones_dispositivos.name":mac
        }
      ]}).select('sesiones_dispositivos')
      if(lista_dispositivos.length>0)
      {
        const token = req.headers['access-token'];
        if (token) {
          jwt.verify(token, config.llave, (err, decoded) => {     
            if (err) {
              res.json({cod:"403"})
            } else { 
              next()
            }
          });
        } else {
          res.json({cod:"403"})
        }
      }
      else
      {
        res.json({cod:"403"})
      }
     },
     rutasProtegidas_post:async function(req, res, next) {
      const mac=await macaddress.one()
      const lista_dispositivos= await usuario.find({$and:[
        {
          _id:req.body.id
        },
        {
          "sesiones_dispositivos.name":mac
        }
      ]}).select('sesiones_dispositivos')
      if(lista_dispositivos.length>0)
      {
        const token = req.headers['access-token'];
        if (token) {
          jwt.verify(token, config.llave, (err, decoded) => {     
            if (err) {
              //cerrar sesion
              res.json({cod:"403"})
            } else { 
              next()
            }
          });
        } else {
          res.json({cod:"403"})
          //cerrarsesion
        }
      }
      else
      {
        res.json({cod:"403"})
        //cerrar sesion
      }
     }
}