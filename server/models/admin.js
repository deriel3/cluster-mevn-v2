const mongoose= require('mongoose');
const {Schema}= mongoose;

const admin=new Schema({
    usuario:String,
    contraseña:String,
    estado:{
        type:Number,
        default:1,
    }
});

module.exports=mongoose.model('admin',admin);