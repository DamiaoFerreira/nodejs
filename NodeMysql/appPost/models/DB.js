const Sequelize = require('sequelize')

//Conexão com banco de dados
const sequelize = new Sequelize("postApp", "root", "", {
  host:"localhost",
  dialect: "mysql"
})

module.exports = {
  Sequelize: Sequelize,
  sequelize: sequelize
}
