var express = require('express');
var router = express.Router();

var knex = require('../db/knex');

// GET authors listing.
router.get('/', function(req, res) {
  console.log("Hello, we're in authors.js");
  knex('authors')
    .select('id','first_name','last_name', 'portrait', 'bio')
    .orderBy('last_name', 'asc')
    .then(function(ans) {
      res.render("authors", {
        data: ans
      });
    }) //this closes then
}); //this GET authors listing

// GO TO new author form.
router.get('/add', function(req, res, next) {
  res.render('add-author');
}); //this closes GO TO new author form.

function validForm(author) {
  return typeof author.first_name == 'string' &&
          typeof author.last_name == 'string' &&
          typeof author.bio == 'string';
}; //closes validForm

// CREATE a new author in database.
router.post('/', function(req, res) {
  console.log("This is REQ.BODY ", req.body);
  if(validForm(req.body)) { //launches validForm function
    var authorObj = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      portrait: req.body.portrait,
      bio: req.body.bio
    }; //closes obj
    knex('authors')
      .insert(authorObj, 'id')
      .then(function(ans) {
        var id = ans[0];
        res.redirect(`authors`);
      }) //closes then
  } else {
    res.status(500);
    res.render('error', {
      message: 'Invalid author'
    }); //closes res.render
  }; //closes if else
}); //this closes CREATE a new author in database.

//GO TO single author page
router.get('/:id', function(req, res) {
  console.log('We are in single author by id');
  var id = req.params.id;
  if(typeof id != 'undefined') {
    knex('authors')
      .select()
      .where('id', id)
      .first()
      .then(function(ans) {
        console.log('This is a single author', ans);
        res.render('single-author', ans);
      }) //closes then
  } else {
    res.status(500);
    res.render('error', {
      message: 'Invalid id'
    }); //closes res.render
  }; //closes if else statement
}); //closes GO TO single author page



module.exports = router;
