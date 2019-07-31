//Adicionando modulos
const express = require("express")
const handlebars = require("express-handlebars")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const path = require("path") // modulo padrão para manipulação de diretorios

const app = express()
const admin = require("./routes/admin")

//Configurações
  //body-parser
  app.use(bodyParser.urlencoded({extended: true}))
  app.use(bodyParser.json())

  // handlebars
  app.engine('handlebars', handlebars({defaultLayout: 'main'}))
  app.set('view engine', 'handlebars')

  //mongoose
  mongoose.Promise = global.Promise
  mongoose.connect("mongodb://localhost/blogapp", {useNewUrlParser: true}).then(()=>{
    console.log("Conectado ao mongodb");
  }).catch((err)=>{
    console.log("erro ao se conectar com o mongodb"+err);
  })

  //Public
  app.use(express.static(path.join(__dirname, "public")))
//Rotas
app.use("/admin", admin)

//Outros
const port = 8081
app.listen(port,() =>{
  console.log("Servidor rodando na url http://localhost:"+port);
})
