import moment from 'moment';
import 'moment/locale/pt-br.js'; // Importa o locale para português do Brasil
export function estoque(app, db) {
    app.get('/api/historico_estoque', async (req, res) => {
        try {
            const [rows] = await db.execute(`
                SELECT 
                    a.codigo_produto,
                    b.nome as produto,
                    d.estoque_operacao, 
                    a.quantidade,
                    c.nome as usuario,
                    a.cadastrado_em,
                    a.alterado_em
                FROM aion_estoque_historico a 
                INNER JOIN aion_produto b ON a.codigo_produto = b.codigo_produto
                INNER JOIN aion_usuarios c ON a.usuario = c.id
                INNER JOIN aion_estoque_operacao d ON a.usuario = d.id
            `);
            res.json({
                historico_estoque: rows.map(row => ({
                    codigo_produto: row.codigo_produto,
                    produto: row.produto,
                    quantidade: row.quantidade,
                    tipo_operacao_estoque: row.estoque_operacao,
                    usuario: row.usuario,
                    data_cadastro: moment(row.data_cadastro).locale('pt-br').format('DD/MM/YYYY HH:mm:ss'),
                    data_alteracao: moment(row.data_alteracao).locale('pt-br').format('DD/MM/YYYY HH:mm:ss'),
                }))
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao listar o estoque' });
        }
    });

    app.get('/api/meu_estoque', async (req, res) => {
        try {
            const [rows] = await db.execute(`
                SELECT 
                    a.codigo_produto,
                    b.nome as produto,
                    d.estoque_operacao, 
                    a.quantidade,
                    c.nome as usuario,
                    a.cadastrado_em,
                    a.alterado_em
                FROM aion_estoque_historico a 
                INNER JOIN aion_produto b ON a.codigo_produto = b.codigo_produto
                INNER JOIN aion_usuarios c ON a.usuario = c.id
                INNER JOIN aion_estoque_operacao d ON a.usuario = d.id
                WHERE c.id = ?
            `, [req.user.id]);
            res.json({
                meu_estoque: rows.map(row => ({
                    codigo_produto: row.codigo_produto,
                    produto: row.produto,
                    quantidade: row.quantidade,
                    tipo_operacao_estoque: row.estoque_operacao,
                    usuario: row.usuario,
                    data_cadastro: moment(row.data_cadastro).locale('pt-br').format('DD/MM/YYYY HH:mm:ss'),
                    data_alteracao: moment(row.data_alteracao).locale('pt-br').format('DD/MM/YYYY HH:mm:ss'),
                }))
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao listar o estoque' });
        }
    });
}
