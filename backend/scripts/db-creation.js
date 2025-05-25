const mysql = require('mysql2/promise');

async function createDatabase() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Tinoreji123#',
  });
  await connection.query('CREATE DATABASE IF NOT EXISTS compounds_db');
  console.log('Database created');
  await connection.end();
}

createDatabase().catch(err => console.error('Error:', err));