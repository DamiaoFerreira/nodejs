//Adicionando modulos
const express = require("express")
const handlebars = require("express-handlebars")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const path = require("path") // modulo padrão para manipulação de diretorios
const session = require("express-session")
const flash = require("connect-flash")

const app = express()
const admin = require("./routes/admin")

//Configurações
  // tudo que for app.user se refere a configurações de Midllewares
  // session
  app.use(session({
    secret: "cursodenode",// password
    resave: true,
    saveUminitialized: true
  }))

  app.use(flash())
  // middleware -> chamando antes de todo request
  app.use((req, res, next)=>{
    //Criando variaveis globais
    // console.log("Middleware executado");
    res.locals.success_msg = req.flash("success_msg"),
    res.locals.error_msg = req.flash("error_msg")
    next(); // liberar a aplicação
  })

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
