//Ao adicionar o modulo express, temos como retorno uma função
const express = require("express") // o modulo express é orientado a rotas

const app = express() // adicionar a função express a variavel app. Instanciando um objeto express

// req: requisição, res: objeto para envio de dados
// criando uma rota para o endereço raiz
app.get("/", function(req, res ){
  res.send("Welcome to my app!")
})

app.get("/catalogo", function(req, res){
  res.send("Welcome to my catalog")
})

//Parametros
app.get("/catalogo/:provider", function(req, res){
  res.send("Catalog to provider "+req.params.provider)
})

app.get("/club_beer", function(req, res){
  res.send("Welcome to my club_beer")
})

// criando um servidor, necessário que seja a ultima instrução
app.listen(8080, function(){
console.log("Run server, url: http://localhost:8080")
})
