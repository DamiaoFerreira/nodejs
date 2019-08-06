var db = require('./DB')

const Post = db.sequelize.define('postagens', {
  titulo:{
    type: db.Sequelize.STRING
  },
  conteudo:{
    type: db.Sequelize.TEXT
  }
})

// Criar o banco
// Post.sync({force:true})

module.exports = Post
