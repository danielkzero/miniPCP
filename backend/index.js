import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import db from './db.js';  // Certifique-se de que o arquivo db.js está corretamente configurado

import authRoutes from './auth.js';
import verificarToken from './authMiddleware.js';
import { infoCard, grafico15dias, historicaFabricacao, ultimos10registroentrega } from './dashboard.js';
import { usuarios, niveis } from './usuarios.js';
import { clientes } from './clientes.js';
import { estoque } from './estoque.js';
import { operacao } from './operacao.js';
import { setor } from './setor.js';
import { grupo } from './grupo.js';
import { unidades } from './unidades.js';
import { produtos } from './produtos.js';
import { ordemproducao } from './ordemProducao.js';
import { registroentrega } from './registroentrega.js';
import { maquinas } from './maquinas.js';
import { observacao } from './observacao.js';
import { pedidos } from './pedidos.js';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);

pedidos(app, db);
observacao(app, db);

maquinas(app, db);

registroentrega(app, db);
ordemproducao(app, db);
produtos(app, db);
unidades(app, db);
grupo(app, db);
setor(app, db);
operacao(app, db);
estoque(app, db);
clientes(app, db);
usuarios(app, db);
niveis(app, db);
infoCard(app, db);
grafico15dias(app, db);
historicaFabricacao(app, db);
ultimos10registroentrega(app, db);

app.get('/api/protegido', verificarToken, (req, res) => {
  res.json({ mensagem: `Olá, ${req.user.nome}, você acessou uma rota protegida!` });
});

app.get('/', (req, res) => {
  res.send('API AION - Sistema de Gestão Empresarial');
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
