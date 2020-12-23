var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var port = 8080;
var alumni = require('./routes/alumni');
let url = "mongodb+srv://alumni:alumni@bd-alunos.qtji9.mongodb.net/test";

mongoose.connect(url,{
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
}); //via Modulus

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use('/alumni', alumni);

app.get('/', function(req, res){
    console.log('app starting on port: '+port)
    res.send('tes express nodejs mongodb');
});

app.listen(port, function(){
    console.log('app listening on port: '+port);
});
