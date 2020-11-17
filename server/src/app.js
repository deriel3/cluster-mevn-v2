const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const path=require('path')
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/cluster-mevn');
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", function(callback){
  console.log("Connection Succeeded");
});

const app = express()
app.use('/assets',express.static(path.join(__dirname,'assets')))
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

app.use('/api',require('./routes/index'));

app.listen(process.env.PORT || 3000)