var express = require('express');
var router = express.Router();

var knex = require('../db/knex');

// GET books listing.
router.get('/', function(req, res) {
  console.log("Hello, we're in books.js");
  knex('books')
    .select('id','title','description', 'genre', 'cover')
    .orderBy('title', 'asc')
    .then(function(ans) {
      console.log("HERE ",ans);
      res.render("books", {
        data: ans
      });
    }) //this closes then
}); //this GET books listing

// GO TO add book form.
router.get('/add', function(req, res, next) {
  res.render('add-book');
}); //this closes GO TO add book form.


function validForm(book) {
  return typeof book.title == 'string' &&
          typeof book.description == 'string' &&
          typeof book.genre == 'string';
}; //closes validForm


// GO TO edit form
router.get('/:id/book-edit', function(req, res) {
  var id = req.params.id;
  if(typeof id != 'undefined') {
    knex('books')
      .select()
      .where('id', id)
      .first()
      .then(function(ans) {
        console.log('This is a single book', ans);
        res.render('book-edit', ans);
      }) //closes then
  } else {
    res.status(500);
    res.render('error', {
      message: 'Invalid id'
    }); //closes res.render
  }; //closes if else statement
}); //closes GO TO edit form


//GO TO single book page
router.get('/:id', function(req, res) {
  var id = req.params.id;
  if(typeof id != 'undefined') {
    knex('books')
      .select()
      .where('id', id)
      .first()
      .then(function(ans) {
        console.log('This is a single book', ans);
        res.render('single-book', ans);
      }) //closes then
  } else {
    res.status(500);
    res.render('error', {
      message: 'Invalid id'
    }); //closes res.render
  }; //closes if else statement
}); //closes GO TO single book page

// Update the books database
router.put('/:id', function(req, res) {
  console.log('This is the req.body in the put', req.body);
  if(validForm(req.body)) {
    var bodyObj = {
      title: req.body.title,
      genre: req.body.genre,
      cover: req.body.cover_url,
      description: req.body.description
    }
    knex('books')
      .where('id', req.params.id)
      .update(bodyObj, 'id')
      .then(function(ans) {
        var id = ans[0];
        res.redirect(`/books/${id}`);
      });  //closes then
  }; //closes if
}); //closes Update the books database




// CREATE a new book in database.
router.post('/', function(req, res) {
  console.log("This is REQ.BODY ", req.body);
  if(validForm(req.body)) { //launches validForm function
    var bookObj = {
      title: req.body.title,
      genre: req.body.genre,
      cover: req.body.cover_url,
      description: req.body.description
    }; //closes obj
    knex('books')
      .insert(bookObj, 'id')
      .then(function(ans) {
        var id = ans[0];
        res.redirect(`/books/${id}`);
      }) //closes then
  } else {
    res.status(500);
    res.render('error', {
      message: 'Invalid book'
    }); //closes res.render
  }; //closes if else
}); //this closes CREATE a new book in database.

// GO TO book-delete page
router.get('/:id/book-delete', function(req, res) {
  var id = req.params.id;
  if(typeof id != 'undefined') {
    knex('books')
      .select()
      .where('id', id)
      .first()
      .then(function(ans) {
        console.log('This is a delete book', ans);
        res.render('book-delete', ans);
      }) //closes then
  } else {
    res.status(500);
    res.render('error', {
      message: 'Invalid id'
    }); //closes res.render
  }; //closes if else statement
}); //closes GO TO book-delete page



// DELETE a book
router.delete('/:id', function(req, res) {
  var id = req.params.id;
  if(typeof id != 'undefined') {
    knex('books')
      .where('id', id)
      .del()
      .then(function() {
        res.redirect('/books');
      })
  } else {
    res.status(500);
    res.render('error', {message: 'Invalid id'})
  }//closes if
}) //this closes DELETE a book

module.exports = router;
