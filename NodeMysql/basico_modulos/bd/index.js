const Sequelize = require("sequelize")

const sequelize = new Sequelize("teste", "root", "", {
  host:"localhost",
  dialect: "mysql"
})

//Criando um model na base de dados
const Postagem = sequelize.define('postagens', {
  title:{
    type: Sequelize.STRING
  },
  conteudo:{
    type: Sequelize.TEXT
  }
})

const Usuario = sequelize.define("usuarios",{
  nome:{
    type:Sequelize.STRING
  },
  sobrenome:{
    type: Sequelize.STRING
  },
  idade:{
    type:Sequelize.INTEGER
  },
  email:{
    type:Sequelize.STRING
  }
})

//Sincronizando o model com o banco
// criar a tabela no banco
// Postagem.sync({force: true})
// Usuario.sync({force: true})

Postagem.create({
  title: "Sonhos",
  conteudo: "Voce e dono de seus sonho, torne os reais"
})

Usuario.create({
  nome: "Damiao",
  sobrenome: "Ferreira",
  idade: "24",
  email:"damyaoferreyra@hotmail.com"
})

//Autenticação com o banco de dados

// sequelize.authenticate().then(function(){
//   console.log("Conectado com sucesso")
// }).catch(function(erro){
//   console.log("Falha ao se conectar: "+error)
// })
