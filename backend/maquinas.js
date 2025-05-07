export function maquinas(app, db) {
    app.get("/api/maquinas", async (req, res) => {
        try {
            const [rows] = await db.execute(`
                SELECT 
                    id,
                    icon,
                    codigo,
                    nome,
                    descricao
                FROM aion_equipamento
                WHERE excluido = 0 AND ativo = 1
            `);

            // Se quiser adicionar preço fixo ou simulado, pode mapear aqui
            const maquinas = rows.map(row => ({
                ...row,
                preco: 40000 // ou alguma lógica para determinar o preço
            }));

            res.json({ maquinas });
        } catch (err) {
            console.error("Erro ao buscar máquinas:", err);
            res.status(500).json({ error: "Erro ao buscar máquinas" });
        }
    });
    app.get("/api/maquinasemuso", async (req, res) => {
        try {
             // Query: máquinas EM USO (ATIVO)
             const [ativos] = await db.query(`
                SELECT  
                    e.id AS id,
                    e.icon,
                    e.nome,
                    h.codigo_ordem_servico AS ordem_servico,
                    prd.codigo_produto,
                    prd.nome AS produto,
                    ii.quantidade AS quantidade,
                    (
                        SELECT SUM(hh.quantidade)
                        FROM aion_ordem_servico_historico hh
                        WHERE hh.id_ordem_servico = h.id_ordem_servico
                    ) AS fabricado,
                    h.data AS data_fabricacao,
                    'ATIVO' AS status,
                    usu.codigo codigo_usuario,
                    usu.avatar avatar_usuario,
                    usu.nome nome_usuario,
                    usu.login login_usuario 

                FROM aion_ordem_servico_historico h
                JOIN (
                    SELECT codigo_ordem_servico, MAX(data) AS max_data
                    FROM aion_ordem_servico_historico
                    GROUP BY codigo_ordem_servico
                ) ult ON h.codigo_ordem_servico = ult.codigo_ordem_servico AND h.data = ult.max_data
                JOIN aion_observacao o ON h.id_observacao = o.id
                INNER JOIN aion_equipamento e ON e.id = h.id_equipamento
                LEFT JOIN aion_ordem_servico ss ON ss.id = h.id_ordem_servico
                LEFT JOIN aion_ordem_producao pp ON ss.id_ordem_producao = pp.id
                LEFT JOIN aion_pedidos_itens ii ON pp.id_pedido_item = ii.id
                LEFT JOIN aion_produto prd ON ii.id_produto = prd.id
                INNER JOIN aion_usuarios usu ON h.id_usuario = usu.codigo

                WHERE o.parada = 0
                  AND h.excluido = 0
                  AND o.excluido = 0
                  AND o.ativo = 1
            `);

            // Obtenha IDs das máquinas ativas
            const ativosIds = ativos.map(m => m.id);

            // Query: máquinas FORA DE USO (INATIVO)
            const [inativos] = await db.query(`
                SELECT 
                    e.id AS id,
                    e.icon,
                    e.nome,
                    NULL AS ordem_servico,
                    NULL AS produto,
                    NULL AS quantidade,
                    NULL AS fabricado,
                    NULL AS data_fabricacao,
                    'INATIVO' AS status
                FROM aion_equipamento e
                WHERE e.id NOT IN (${ativosIds.length > 0 ? ativosIds.join(',') : 'NULL'}) AND e.excluido = 0 AND e.ativo = 1
            `);

            // Combina tudo
            const maquinas = [...ativos, ...inativos];

            res.json({ maquina_uso: maquinas });
        } catch (err) {
            console.error("Erro ao buscar máquinas em uso:", err);
            res.status(500).json({ error: "Erro ao buscar máquinas em uso" });
        }
    });
}
