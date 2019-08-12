const express = require('express')
const router = express.Router()

//Importando o moongose e o model
const mongoose = require('mongoose')
require("../models/Category")
const Categoria = mongoose.model('Categories')

require("../models/Post")
const Postagem = mongoose.model("Posts")

// eAdmin - usando helpers
const { eAdmin } = require("../helpers/eAdmin")


router.get('/', eAdmin, (req, res) => {
  res.render("admin/index")
})

// started category
router.get("/category", eAdmin, (req, res) => {
  Categoria.find().sort({ date: 'desc' }).then((categoria) => {
    res.render("admin/category", { categorias: categoria })
  }).catch((error) => {
    req.flash("error_msg", "Houve um erro ao listar as categorias")
    res.redirect("/admin")
  })
})

router.get("/category/form", eAdmin, (req, res) => {
  res.render("admin/categoryform")
})

router.post("/category/add", eAdmin, (req, res) => {

  // criando a validação do formulário
  var erros = []

  if (!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null) {
    erros.push({ texto: "Nome inválido" })
  }

  if (!req.body.slug || typeof req.body.slug == undefined || req.body.slug == null) {
    erros.push({ texto: "Slug inválido" })
  }

  // se houver erros chamar a rotar e passar o objeto erros
  if (erros.length > 0) {
    res.render("admin/categoryform", { erros: erros })
  } else {
    const newCategory = {
      nome: req.body.nome,
      slug: req.body.slug
    }

    new Categoria(newCategory).save().then(() => {
      // console.log("Categoria salva com sucesso");
      req.flash("success_msg", "Categoria crianda com sucesso!")
      res.redirect("/admin/category")
    }).catch((err) => {
      req.flash("error_msg", "Houve um erro ao tentar salvar categoria, tente novamente!")
      res.redirect("/admin")
    })
  }
})

router.get("/category/edit/:id", eAdmin, (req, res) => {
  Categoria.findOne({ _id: req.params.id }).then((categoria) => {
    res.render("admin/categoryformedit", { categoria: categoria })
  }).catch((error) => {
    req.flash("error_msg", "Esta categoria não existe")
    res.redirect("/admin/category")
  })
})

router.post("/category/edit", eAdmin, (req, res) => {
  Categoria.findOne({ _id: req.body.id }).then((categoria) => {
    categoria.nome = req.body.nome
    categoria.slug = req.body.slug

    categoria.save().then(() => {
      req.flash("success_msg", "Categoria editada com sucesso!")
      res.redirect("/admin/category")
    }).catch((err) => {
      req.flash("error_msg", "Houve um error ao tentar editar a categoria")
      res.redirect("/admin/category")
    })

  }).catch((err) => {
    req.flash("error_msg", "houve um erro ao editar a categoria")
    res.redirect("/admin/category")
  })

})

router.post("/category/deletar", eAdmin, (req, res) => {
  Categoria.deleteOne({ _id: req.body.id }).then(() => {
    req.flash("success_msg", "Categoria deletada com sucesso!")
    res.redirect("/admin/category")
  }).catch((err) => {
    req.flash("error_msg", "Houve um error deletar a categoria")
    res.redirect("/admin/category")
  })
})
// finished category

// started posts
router.get("/posts", eAdmin, (req, res) => {
  Postagem.find().populate("categoria").sort({ data: "desc" }).then((postagens) => {
    //res.send(postagens)
    res.render("admin/posts", { postagens: postagens })
  }).catch((err) => {
    req.flash("error_msg", "Houver um erro ao listar as postagens")
    res.rendirect("/admin")
  })
})

router.get("/posts/form", eAdmin, (req, res) => {
  Categoria.find().then((categorias) => {
    res.render("admin/postsform", { categorias: categorias })
  }).catch((err) => {
    req.flash("error_msg", "Houve um erro ao carregar o formulário")
    res.redirect("/admin/posts")
  })
})

router.post("/posts/add", eAdmin, (req, res) => {
  var erros = []
  if (req.body.catecogy == "0") {
    erros.push({ texto: "Categoria inválida, registre uma categoria" })
  }

  if (erros.length > 0) {
    res.render("admin/postsform", { erros: erros })
  } else {
    const novaPostagem = {
      titulo: req.body.title,
      descricao: req.body.describe,
      conteudo: req.body.content.toString(), // por algum motivo o text area salva um array de string
      slug: req.body.slug,
      categoria: req.body.category
    }

    new Postagem(novaPostagem).save().then(() => {
      req.flash("success_msg", "Postagem salva com sucesso!")
      res.redirect("/admin/posts")
    }).catch((err) => {
      req.flash("error_msg", "Houve um erro durante o salvamento da posstagem!")
      res.redirect("/admin/posts")
    })
  }
})

router.get("/posts/edit/:id", eAdmin, (req, res) => {
  Postagem.findOne({ _id: req.params.id }).then((postagem) => {
    Categoria.find().then((categoria) => {
      res.render("admin/postsformedit", { postagem: postagem, categorias: categoria })
    }).catch((err) => {
      console.log(err);
      req.flash("error_msg", "houve um erro ao listar categoria")
      res.redirect("/admin/posts")
    })
  }).catch((err) => {
    console.log(err);
    req.flash("error_msg", "Houve um erro ao carregar o formulário de edição")
    res.redirect("/admin/posts")
  })
})

router.post("/posts/edit", eAdmin, (req, res) => {
  Postagem.findOne({ _id: req.body.id }).then((postagem) => {
    postagem.titulo = req.body.title,
      postagem.descricao = req.body.describe,
      postagem.conteudo = req.body.content.toString(), // por algum motivo o text area salva um array de string
      postagem.slug = req.body.slug,
      postagem.categoria = req.body.category

    postagem.save().then(() => {
      req.flash("success_msg", "Postagem salva como sucesso!")
      res.redirect("/admin/posts")
    }).catch((err) => {
      req.flash("error_msg", "erro!")
      res.redirect("/admin/posts")
    })
  }).catch((err) => {
    console.log(err);
    req.flash("error_msg", "Houve um erro ao editar postagem!")
    res.redirect("/admin/posts")
  })
})

router.post("/posts/deletar", eAdmin, (req, res) => {
  Postagem.deleteOne({ _id: req.body.id }).then(() => {
    req.flash("success_msg", "Postagem deletada com sucesso!")
    res.redirect("/admin/posts")
  }).catch((err) => {
    req.flash("error_msg", "Houve um error deletar a postagem")
    res.redirect("/admin/posts")
  })

})
// finished posts
module.exports = router
