const mongoose = require("mongoose")
//em vez de usar function(){}, podemos usar o () ->{}, conhecido como arrow function
//Config
mongoose.Promise = global.Promise
mongoose.connect("mongodb://localhost/aprendendo", {useNewUrlParser: true})
.then(() => {
  console.log('Conexão com o mongodb realizada com sucesso.')
}).catch((err) => {
  console.log('Houve um erro ao se conectar com o mongodb '+err)
})

// Models - Padrão do mongoose, ModeloSchema
const UsuarioSchema = mongoose.Schema({
  nome:{
    type: String,
    require: true
  },
  sobrenome:{
    type: String,
    require: true
  },
  email:{
    type: String,
    require: true
  },
  idade:{
    type: Number,
    require: true
  },
  pais:{
    type: String,
  }
})

//Criando a collection
mongoose.model('Usuarios', UsuarioSchema)

// salvando
const usuario = mongoose.model('Usuarios')

 new usuario({
  nome:"Damiao",
  sobrenome:"Ferreira",
  email:"damyaoferreyra@hotmai.com",
  idade: 24,
  pais: "Brasil"
}).save().then(()=>{
  console.log("Usuario cadastrado com sucesso!");
}).catch((err)=>{
  console.log("erro ao cadastrar usuario "+err);
})
