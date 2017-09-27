//Servidor criado e configurado
var express = require('express');
var app = express();
app.listen(5000);

//BodyParser configurado permite o uso de JSON
var bodyParser= require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended : true
}));

//Base criada e MONGODB configurado
var db_string = 'mongodb://127.0.0.1/webservicerestfull';
var mongoose = require('mongoose').connect(db_string);
var db = mongoose.connection;

var User;
//Caso de algum erro na conexão do banco
db.on('error', console.error.bind(console, 'Erro ao conectar com o banco'));
db.once('open', function(){

  var userSchema = mongoose.Schema({
    fullname: String,
    email: String,
    password: String,
    created_at: Date
  });

  User = mongoose.model('User', userSchema);
});

app.get('/', function(req, res){
  res.end('Servidor ON!');
});

app.get('/users', function(req, res){

  User.find({}, function(error, users){
        if(error){
          res.json({error: 'Não foi possivel salvar os usuarios'})
        }else{
          res.json(users);
        }
     });
});

app.get('/users/:id', function(req, res){

  var id = req.param('id');
  User.findById(id, function(error, user){
        if(error){
          res.json({error: 'Não foi possivel retornar o usuario'})
        }else{
          res.json(user);
        }
     });
});

app.post('/users', function(req, res){
  //  new User({
  //    fullname: 'Eric Galdino',
  //    email: 'ericgaldino0@gmail.com',
  //    password: 123456,
  //    created_at: new Date()
  //  }).save(function(error, user){

  //    if(error){
  //      res.json({error: 'Não foi possivel salvar o usuario'})
  //    }else{
  //      res.json(user);
  //    }
  //  });
});

app.put('/users', function(req, res){

});

app.delete('/users/:id', function(req, res){

  var id = req.param('id');
  User.findById(id, function(error, user){
        if(error){
          res.json({error: 'Não foi possivel retornar o usuario'})
        }else{

          user.remove(function(error){

            if(!error){
              res.json({response: 'Usuário excluido com sucesso'})
            }
            
          });
        }
     });
});
