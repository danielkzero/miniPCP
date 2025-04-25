import moment from 'moment';
import 'moment/locale/pt-br.js'; // Importa o locale para português do Brasil
export function estoque(app, db) {
    /**
     * `codigo_produto` CHAR(20) NULL DEFAULT NULL COLLATE 'utf8mb4_unicode_ci',
	`usuario` INT(11) NULL DEFAULT NULL,
	`quantidade` INT(11) NULL DEFAULT NULL,
	`tipo_operacao_estoque` INT(11) NULL DEFAULT NULL,
	`cadastrado_em` DATETIME NULL DEFAULT current_timestamp(),
	`alterado_em` DATETIME NULL DEFAULT NULL ON UPDATE current_timestamp()
     */
    app.get('/api/historico_estoque', async (req, res) => {
        try {
            const [rows] = await db.execute(`
                SELECT 
                    codigo_produto,
                    usuario,
                    quantidade,
                    tipo_operacao_estoque,
                    cadastrado_em,
                    alterado_em
                FROM aion_estoque_historico
            `);
            res.json({
                historico_estoque: rows.map(row => ({
                    codigo_produto: row.codigo_produto,
                    usuario: row.usuario,
                    quantidade: row.quantidade,
                    tipo_operacao_estoque: row.tipo_operacao_estoque,
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