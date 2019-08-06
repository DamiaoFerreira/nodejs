const express = require('express')
const router = express.Router()

//Importando o moongose e o model
const mongoose = require('mongoose')
require("../models/Category")
const Categoria = mongoose.model('Categories')

router.get('/', (req, res)=>{
  res.render("admin/index")
})

// started category
router.get("/category", (req, res)=>{
  Categoria.find().sort({date:'desc'}).then((categoria)=>{
    res.render("admin/category", {categorias: categoria})
  }).catch((error)=>{
    req.flash("error_msg", "Houve um erro ao listar as categorias")
    res.redirect("/admin")
  })
})

router.get("/category/form", (req, res)=>{
  res.render("admin/categoryform")
})

router.post("/category/add", (req, res)=>{

// criando a validação do formulário
  var erros = []

  if(!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null){
    erros.push({texto: "Nome inválido"})
  }

  if(!req.body.slug || typeof req.body.slug == undefined || req.body.slug == null){
      erros.push({texto: "Slug inválido"})
  }

// se houver erros chamar a rotar e passar o objeto erros
  if(erros.length > 0){
    res.render("admin/categoryform", {erros: erros})
  }else{
    const newCategory = {
      nome: req.body.nome,
      slug: req.body.slug
    }

    new Categoria(newCategory).save().then(()=>{
      // console.log("Categoria salva com sucesso");
      req.flash("success_msg", "Categoria crianda com sucesso!")
      res.redirect("/admin/category")
    }).catch((err)=>{
      req.flash("error_msg", "Houve um erro ao tentar salvar categoria, tente novamente!")
      res.redirect("/admin")
    })
  }
})

router.get("/category/edit/:id",(req, res)=>{
  Categoria.findOne({_id:req.params.id}).then((categoria)=>{
    res.render("admin/categoryformedit", {categoria: categoria})
  }).catch((error)=>{
    req.flash("error_msg", "Esta categoria não existe")
    res.redirect("/admin/category")
  })
})

router.post("/category/edit", (req, res)=>{
  Categoria.findOne({_id:req.body.id}).then((categoria)=>{
    categoria.nome = req.body.nome
    categoria.slug = req.body.slug

    categoria.save().then(()=>{
      req.flash("success_msg", "Categoria editada com sucesso!")
      res.redirect("/admin/category")
    }).catch((err)=>{
        req.flash("error_msg", "Houve um error ao tentar editar a categoria")
        res.redirect("/admin/category")})

  }).catch((err)=>{
    req.flash("error_msg", "houve um erro ao editar a categoria")
    res.redirect("/admin/category")
  })

})

router.post("/category/deletar", (req, res)=>{
  Categoria.remove({_id: req.body.id}).then(()=>{
    req.flash("success_msg", "Categoria deletada com sucesso!")
    res.redirect("/admin/category")
  }).catch((err)=>{
    req.flash("error_msg", "Houve um error deletar a categoria")
    res.redirect("/admin/category")
  })
})
// finished category

// started posts
router.get("/posts", (req, res)=>{
  res.render("admin/posts")
})

router.get("/posts/add", (req, res)=>{
  Categoria.find().then((categorias)=>{
    res.render("admin/postsform", {categorias: categorias})
  }).catch((err)=>{
    req.flash("error_msg", "Houve um erro ao carregar o formulário")
    res.redirect("/admin/posts")
  })
})

// finished posts
module.exports = router
