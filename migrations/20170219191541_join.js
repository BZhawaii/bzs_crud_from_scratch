

exports.up = function(knex, Promise) {
  return knex.schema
  .createTable('book_author_join', function(table) {
    table.increments();
    table.integer('book_id').references('books','id');
    table.integer('author_id').references('authors', 'id');
  })
}; //closes exports.up

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('book_author_join');
}; //closes exports.down
