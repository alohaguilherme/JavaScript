var express = require('express');
var users = require('./../inc/users');
var criancas = require('./../inc/criancas');
var admin = require('./../inc/admin');
var moment = require('moment');
var router = express.Router();


moment.locale('pt-BR');

router.get("/login", function(req, res, next){

    users.render(req, res, null);

});

router.get("/criancas", function(req, res, next){
  
  criancas.getCriancas().then(data =>{

    res.render("admin/criancas",admin.getParams(req, {
      data,
      moment
    }));

  });


});

router.post("/criancas", function(req, res, next){

  criancas.save(req.fields).then(results=>{

    res.send(results);

  }).catch(err=>{

    res.send(err);

  });

});

router.delete("/criancas/:id", function(req, res, next){

  criancas.delete(req.params.id).then(results=>{
  
    res.send(results);

  }).catch(err=>{
  
    res.send(err);
    
  });

});

router.get("/index", function(req, res, next){

  res.render("admin/index");

});

router.post("/login", function(req, res, next){

  if (!req.body.email) {
    users.render(req,res, "Preencha o campo e-mail.");
  } else if (!req.body.password) {
    users.render(req,res, "Preencha o campo senha.");
  } else {

    users.login(req.body.email, req.body.password).then(user =>{

      req.session.user = user;

      res.redirect('/admin/criancas');

    }).catch(err => {

        users.render(req, res, err.message);

    });

  }

});

module.exports = router;