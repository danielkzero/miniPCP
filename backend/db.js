import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

// Logando as informações da configuração do banco de dados
console.log('Conectando ao banco de dados...');

// Testando a conexão com o banco de dados
pool.getConnection((err, connection) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
  } else {
    console.log('Conexão com o banco de dados estabelecida com sucesso!');
    connection.release(); // Libera a conexão de volta para o pool
  }
});

export default pool.promise();
