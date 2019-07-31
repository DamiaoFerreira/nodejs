const express = require('express')
const router = express.Router()

//Importando o moongose e o model
const mongoose = require('mongoose')
require("../models/Category")
const Categoria = mongoose.model('Categories')

router.get('/', (req, res)=>{
  res.render("admin/index")
})

router.get('/posts', (req, res)=>{
  res.send("Página de posts")
})

router.get("/category", (req, res)=>{
  res.render("admin/category")
})

router.get("/category/form", (req, res)=>{
  res.render("admin/categoryform")
})

router.post("/category/add", (req, res)=>{

  const newCategory = {
    nome: req.body.nome,
    slug: req.body.slug
  }

  new Categoria(newCategory).save().then(()=>{
    console.log("Categoria salva com sucesso");
  }).catch((err)=>{
    console.log("Erro ao salvar categoria "+err);
  })
})

module.exports = router
