const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
require("../models/User")
const Usuario = mongoose.model("Users")
const bcrypt = require("bcryptjs")
const passport = require("passport")


router.get("/", (req, res)=>{
    res.render("usuarios/registry")
})

router.post("/add", (req, res)=>{
    var erros = []
    var body = req.body

    if(!body.nome || body.nome == undefined || body.nome == null){
      erros.push({texto: "Nome inválido"})
    }

    if(!body.email || body.email == undefined || body.email == null){
      erros.push({texto: "Email inválido"})
    }

    if(!body.senha || body.senha == undefined || body.senha == null){
      erros.push({texto: "Senha inválido"})
    }

    if(body.senha.length < 0){
      erros.push({texto: "Senha muito curta"})
    }

    if(body.senha != body.senha2){
      erros.push({texto: "as senhas são diferentes"})
    }

  if(erros.length > 0){
    res.render("usuarios/registry", {erros: erros})
  }else{
    Usuario.findOne({email:body.email}).then((usuario)=>{
      if(usuario){
        req.flash("error_msg","Já existe uma conta com esse e-mail no nosso sistema")
        res.redirect("/registry")
      }else{
        const novoUsuario = new Usuario({
          nome: body.nome,
          email: body.email,
          senha: body.senha
        })

        bcrypt.genSalt(10, (erro, salt)=>{
          bcrypt.hash(novoUsuario.senha, salt, (erro, hash)=>{
            if(erro){
              console.log(erro);
              req.flash("error_msg", "Houve um error ao salvar o usuario")
              res.redirect("/")
            }

            novoUsuario.senha = hash
            novoUsuario.save().then(()=>{
              req.flash("success_msg","Usuario salvo com sucesso")
              res.redirect("/")
            }).catch((err)=>{
              console.log(err);
              req.flash("error_msg","Houve um erro ao salvo o usuario")
              res.redirect("/")
            })
          })
        })

      }
    }).catch((err)=>{
      console.log(err);
      req.flash("error_msg", "Houve um erro interno")
      res.redirect("/")
    })
  }
})

router.get("/login", (req, res) =>{
  res.render("usuarios/login")
})

router.post("/login", (req, res, next)=>{
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "login",
    failureFlash: true
  })(req, res, next)
})

router.get("/logout", (req, res)=>{
  req.logout()
  req.flash("success_msg", "Deslogado com sucesso")
  res.redirect("/")
})
module.exports = router
