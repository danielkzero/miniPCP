import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import db from './db.js';  // Certifique-se de que o arquivo db.js está corretamente configurado

import authRoutes from './auth.js';
import verificarToken from './authMiddleware.js';
import { infoCard, grafico15dias, historicaFabricacao, ultimos10registroentrega } from './dashboard.js';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);

// Rota para listar todos os usuários
app.get('/api/usuarios', async (req, res) => {
    try {
      const [rows] = await db.execute('SELECT id, nome, login FROM aion_usuarios WHERE excluido = 0 AND ativo = 1');
      res.json({ usuarios: rows });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao listar os usuários' });
    }
});

infoCard(app, db);
grafico15dias(app, db);
historicaFabricacao(app, db);
ultimos10registroentrega(app, db);
// Exemplo de rota protegida
app.get('/api/protegido', verificarToken, (req, res) => {
  res.json({ mensagem: `Olá, ${req.user.nome}, você acessou uma rota protegida!` });
});

app.get('/', (req, res) => {
  res.send('API AION - Sistema de Gestão Empresarial');
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
