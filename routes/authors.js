var express = require('express');
var router = express.Router();

var knex = require('../db/knex');

// GET authors listing.
router.get('/', function(req, res) {
  console.log("Hello, we're in books.js");
  knex('authors')
    .select('id','first_name','last_name', 'portrait', 'bio')
    .orderBy('last_name', 'asc')
    .then(function(ans) {
      console.log("HERE ",ans);
      res.render("authors", {
        data: ans
      });
    }) //this closes then
}); //this GET authors listing





module.exports = router;
