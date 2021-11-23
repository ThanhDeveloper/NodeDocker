const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
})

/**
 * Query the database using the pool
 * @param {*} query 
 * @param {*} params 
 * 
 * @see https://node-postgres.com/features/pooling#single-query
 */
async function query(query, params) {
  const client = await pool.connect()
  try {
    var result = await client.query(query, params)
    client.release()
    return result.rows
  } catch (error) {
    return console.error('Error executing query', error.stack)
  }
}

module.exports = {
  query
}