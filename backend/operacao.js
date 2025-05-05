import moment from 'moment';
import 'moment/locale/pt-br.js'; // Importa o locale para português do Brasil

export function operacao(app, db) {
    app.get('/api/operacao', async (req, res) => {
        try {
            const [rows] = await db.execute(`
                SELECT 
                    a.id, 
                    a.nome_operacao,
                    a.cadastrado_em,
                    a.alterado_em,
                    a.ativo
                FROM aion_operacao a 
                WHERE a.excluido = 0
            `);
            res.json({
                operacoes: rows.map(row => ({
                    id: row.id,
                    nome_operacao: row.nome_operacao,
                    ativo: row.ativo,
                    data_cadastro: moment(row.cadastrado_em).locale('pt-br').format('DD/MM/YYYY HH:mm:ss'),
                    data_alteracao: moment(row.alterado_em).locale('pt-br').format('DD/MM/YYYY HH:mm:ss'),
                }))
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao listar o estoque' });
        }
    })
}