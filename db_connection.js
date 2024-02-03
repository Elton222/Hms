const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'hms',
  password: '009889',
  port: '5432',
});

module.exports = pool;
