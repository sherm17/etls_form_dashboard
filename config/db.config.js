const { Client } = require('pg');

const pgClient = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'etl_dashboard',
  password: '',
  port: '5433'
});

pgClient
  .connect()
  .then(() => console.log('successfully connected!!!'))
  .catch(err => console.error('connection err', err.stack))

module.exports = pgClient;
