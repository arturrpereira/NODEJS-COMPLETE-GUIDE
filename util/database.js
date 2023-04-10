const pgsql = require('pg');

/*const pool = pgsql.Pool({
  host: 'localhost',
  user: 'postgres',
  database: 'nodejs',
  password: '1234',
  port: '5432'
});*/

const pool = new pgsql.Pool({
  host: 'localhost',
  user: 'postgres',
  database: 'nodejs',
  password: '1234',
  port: '5432'

});

module.exports = pool;
