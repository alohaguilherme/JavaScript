var express = require('express');
var users = require('./../inc/users');
var router = express.Router();

router.get("/login", function(req, res, next){

    users.render(req, res, null);

});

router.post("/login", function(req, res, next){

  if (!req.body.email) {
    users.render(req,res, "Preencha o campo e-mail.");
  } else if (!req.body.password) {
    users.render(req,res, "Preencha o campo senha.");
  } else {

    users.login(req.body.email, req.body.password).then(user =>{

        req.session.user = user;

        res.redirect("/admin");

    }).catch(err => {

        users.render(req, res, err.message);

    });

  }

});

module.exports = router;