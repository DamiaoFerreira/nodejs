const express = require("express")

const app = express()

// menu

app.get('/', function(req, res){
  res.send("Pagina inicial: "
  +"<a href='/catalog'>catalogo</a> "
  +"<a href='/clubs'>club`s pub</a>")
})

app.get('/catalog', function(req, res){
  res.sendFile(__dirname + "/pags/catalog.html")
})

app.get('/clubs', function(req, res){
  res.sendFile(__dirname + "/pags/clubs.html")
})


app.listen("8080", function(){
  console.log("Run server club_beer")
})
