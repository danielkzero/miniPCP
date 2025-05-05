import moment from 'moment';
import 'moment/locale/pt-br.js'; // Importa o locale para português do Brasil

export function setor(app, db) {
    app.get('/api/setor', async (req, res) => {
        try {
            const [rows] = await db.execute(`
                SELECT 
                    a.id, 
                    a.nome_estoque,
                    a.descricao, 
                    a.data_cadastro,
                    a.data_alteracao,
                    a.ativo 
                FROM aion_estoque_setor a 
                WHERE a.excluido = 0
            `);
            res.json({
                setores: rows.map(row => ({
                    id: row.id,
                    nome_estoque: row.nome_estoque,
                    descricao: row.descricao,
                    ativo: row.ativo,
                    data_cadastro: moment(row.cadastrado_em).locale('pt-br').format('DD/MM/YYYY HH:mm:ss'),
                    data_alteracao: moment(row.alterado_em).locale('pt-br').format('DD/MM/YYYY HH:mm:ss'),
                }))
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao listar o setor' });
        }
    })
}