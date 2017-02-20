

exports.up = function(knex, Promise) {
  return knex.schema
  .createTable('authors', function(table) {

    table.increments();
    table.text('first_name');
    table.text('last_name');
    table.text('portrait');
    table.text('bio');

  }) //closes createTable
} //closes exports up

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('authors');
}; //closes exports down
