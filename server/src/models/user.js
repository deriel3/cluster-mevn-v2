const mongoose= require('mongoose');
const {Schema}= mongoose;

const usuario=new Schema({
    usuario:String,
    contraseña:String,
    estado:{
        type:Number,
        default:1
    },
    sesiones_dispositivos:[{name:String,fecha_ingreso:{type:Date,default:new Date()},nombre:{type:String,default:"SIN NOMBRE"}}],
    nombre:String,
    apellido:String,
    correo_electronico:String,
    genero:String,
    pais:String,
    lista_favoritos:[{empresa_id:String,url_imagen:String,titulo:String}],
    es_proveedor: {
        type: Boolean,
        default: false
    },
    rol:{
        type:Number,
        default:1
    }
});

module.exports=mongoose.model('Usuario',usuario);