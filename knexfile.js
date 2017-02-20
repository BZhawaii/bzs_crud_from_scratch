// Update with your config settings.

module.exports = {

  development: {
    client: 'postgresql',
    connection: 'postgres://localhost/reads-db'
  },
  production: {
    client: 'postrgresql',
    connection: process.env.DATABASE_URL + '?ssl=true'
  }

};  //closes module.exports
