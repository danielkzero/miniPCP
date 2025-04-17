import express from 'express';
import db from './db.js';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/login', async (req, res) => {
  const { login, senha } = req.body;

  try {
    const senhaHash = crypto.createHash('md5').update(senha).digest('hex');

    const [rows] = await db.execute(
      'SELECT * FROM aion_usuarios WHERE login = ? AND senha = ? AND excluido = 0 AND ativo = 1',
      [login, senhaHash]
    );

    if (rows.length === 0) {
      return res.status(401).json({ error: 'Login inválido' });
    }

    const usuario = rows[0];

    const token = jwt.sign(
      {
        id: usuario.id,
        nome: usuario.nome,
        id_nivel: usuario.id_nivel,
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({
      token,
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        login: usuario.login,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro no servidor' });
  }
});

export default router;
