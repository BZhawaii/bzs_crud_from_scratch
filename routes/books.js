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
      res.render("books", {
        data: ans
      });
    }) //this closes then
}); //this GET books listing

// GO TO add book form.
router.get('/add', function(req, res, next) {
  knex('authors')
    .select('last_name', 'first_name', 'id')
    .orderBy('last_name', 'asc')
    .then(function(ans) {
      res.render('add-book', {
        data: ans
      });
    })
}); //this closes GO TO add book form.


function validForm(book) {
  return typeof book.title == 'string' &&
          typeof book.description == 'string' &&
          typeof book.genre == 'string';
}; //closes validForm


// GO TO edit form
router.get('/:id/book-edit', function(req, res) {
  var id = req.params.id;
  console.log("Hello, I'm in edit form", id);
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
  var id = req.params.id;
  console.log('This is the req.body in the put', req.body, id);
  if(validForm(req.body)) {
    var bodyObj = {
      title: req.body.title,
      genre: req.body.genre,
      cover: req.body.cover_url,
      description: req.body.description
    };

    knex('books')
      .where('id', id)
      .update(bodyObj)
      .then(function() {
        res.redirect(`/books`);
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
      var authID = req.body.id;
    knex('books')
      .insert(bookObj, 'id')
      .then(function(ans) {
        var joinObj = {
          book_id: ans[0],
          author_id: authID
        };
        knex('book_author_join')
          .insert(joinObj)
          .then(function() {
            res.redirect(`/books`);
          })
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
