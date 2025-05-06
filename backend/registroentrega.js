import moment from "moment";
import "moment/locale/pt-br.js";
export function registroentrega(app, db) {
    app.get("/api/registroentrega", async (req, res) => {
        try {
            const [rows] = await db.execute(`
                SELECT 
                    oe.id AS id,
                    oe.id_ordem_entrega AS codigo_registro_entrega,
                    c.nome AS nome,
                    p.id AS codigo_pedido,
                    oe.id_ordem_producao AS codigo_ordem_producao,
                    oe.codigo_produto AS codigo,
                    oe.descricao AS nome_produto,
                    oe.quantidade_emitida,
                    IFNULL(pit.qtd_total, oe.quantidade_emitida) AS quantidade_total,
                    IFNULL(prod.peso, 0) AS peso,
                    oe.data_cadastro 
                FROM aion_ordem_entrega_itens oe
                LEFT JOIN aion_pedidos p ON oe.id_pedido = p.id
                LEFT JOIN aion_clientes c ON oe.id_cliente = c.id
                LEFT JOIN (
                    SELECT id_ordem_producao, SUM(quantidade_emitida) AS qtd_total
                    FROM aion_ordem_entrega_itens
                    GROUP BY id_ordem_producao
                ) pit ON oe.id_ordem_producao = pit.id_ordem_producao
                LEFT JOIN aion_produto prod ON oe.id_produto = prod.id
                WHERE oe.excluido = 0
                ORDER BY oe.id_ordem_entrega DESC
            `);

            // Agrupamento por codigo_registro_entrega
            const agrupado = {};

            for (const row of rows) {
                const cod = `8001${String(row.codigo_registro_entrega).padStart(5, "0")}`;
                if (!agrupado[cod]) {
                    agrupado[cod] = {
                        id: cod,
                        itens: []
                    };
                }

                agrupado[cod].itens.push({
                    id_filho: row.id,
                    nome: row.nome,
                    codigo_pedido: `MP-${String(row.codigo_pedido * 1).padStart(6, "0")}`,
                    codigo_ordem_producao: `OP-${String(row.codigo_ordem_producao)}`,
                    codigo: row.codigo,
                    nome_produto: row.nome_produto,
                    quantidade_emitida: row.quantidade_emitida,
                    quantidade_total: row.quantidade_total,
                    peso: row.peso,
                    data_cadastro: moment(row.data_cadastro).format("DD/MM/YYYY"),
                });
            }

            res.json({
                registro_entrega: Object.values(agrupado)
            });
        } catch (err) {
            console.error("Erro ao buscar registros de entrega:", err);
            res.status(500).json({ error: "Erro interno ao buscar registros de entrega" });
        }
    });
}
