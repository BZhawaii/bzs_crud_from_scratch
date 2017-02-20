
exports.up = function(knex, Promise) {
  return knex.schema
  .createTable('books', function(table){
    table.increments();
    table.text('title');
    table.text('genre');
    table.text('cover');
    table.text('description');
  })

};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('books');

};
