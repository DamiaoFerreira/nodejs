const express = require('express')
const app = express()
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const Post = require('./appPost/models/Post')

//config
// Template Engine: como existe varios tamplates engine, precisamos define qual iremos utilizar
app.engine('handlebars', handlebars({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

//Body Parser
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())


//Rotas
app.get("/", function(req, res){
  // busca todas as postagem no banco
  Post.findAll({order:[['id','asc']]}).then(function(posts){
    res.render('home', {posts: posts})
  })
})

app.get('/deletar/:id', function(req, res){
  Post.destroy({where:{'id':req.params.id}}).then(function(){
    res.render('home')
  }).catch(function(erro){
    res.send("erro: "+erro)
  })
})

app.get("/cads", function(req, res){
  res.render('formulario')
})

app.post("/add", function(req, res){
  Post.create({
    titulo:req.body.titulo,
    conteudo: req.body.conteudo
  }).then(function(){
    res.redirect('/')
  }).catch(function(erro){
    res.send("Erro ao salvar postagem. "+erro)
  })
})

app.listen(8081, function(req, res){
  console.log("Servidor rodando na url http://localhost:8081");
})
