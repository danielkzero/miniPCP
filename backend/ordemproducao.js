import moment from "moment";
import "moment/locale/pt-br.js"; // Importa o locale para português do Brasil

/*
CREATE TABLE `aion_ordem_producao` (
    `id` INT(11) NOT NULL AUTO_INCREMENT,
    `id_pedido` INT(11) NULL DEFAULT NULL,
    `id_pedido_item` INT(11) NULL DEFAULT NULL,
    `id_produto` INT(11) NULL DEFAULT NULL,
    `codigo_produto` CHAR(20) NULL DEFAULT NULL COLLATE 'utf8mb4_unicode_ci',
    `excluido` INT(1) NOT NULL DEFAULT '0',
    `ativo` INT(1) NULL DEFAULT '1',
    `comentario` TEXT NULL DEFAULT NULL COLLATE 'utf8mb4_unicode_ci',
    PRIMARY KEY (`id`) USING BTREE
)
COLLATE='utf8mb4_unicode_ci'
ENGINE=InnoDB
AUTO_INCREMENT=1162
;
CREATE TABLE `aion_ordem_servico` (
    `id` INT(11) NOT NULL AUTO_INCREMENT,
    `id_ordem_producao` INT(11) NULL DEFAULT NULL,
    `id_produto` INT(11) NULL DEFAULT NULL,
    `codigo_produto` CHAR(20) NULL DEFAULT NULL COLLATE 'utf8mb4_unicode_ci',
    `id_operacao` INT(11) NULL DEFAULT NULL,
    `excluido` INT(11) NULL DEFAULT '0',
    PRIMARY KEY (`id`) USING BTREE,
    UNIQUE INDEX `id_ordem_producao_id_produto_id_operacao` (`id_ordem_producao`, `id_produto`, `id_operacao`) USING BTREE
)
COLLATE='utf8mb4_unicode_ci'
ENGINE=InnoDB
ROW_FORMAT=DYNAMIC
AUTO_INCREMENT=1477
;
CREATE TABLE `aion_produto` (
    `id` INT(11) NOT NULL AUTO_INCREMENT,
    `codigo_produto` CHAR(20) NULL DEFAULT NULL COLLATE 'latin1_swedish_ci',
    `nome` TEXT NOT NULL COLLATE 'latin1_swedish_ci',
    `id_unidade` INT(11) NOT NULL DEFAULT '1',
    `id_grupo` INT(11) NULL DEFAULT NULL,
    `id_setor` INT(11) NULL DEFAULT NULL,
    `comprimento` FLOAT NULL DEFAULT '0',
    `largura` FLOAT NULL DEFAULT '0',
    `altura` FLOAT NOT NULL DEFAULT '0',
    `peso` FLOAT NOT NULL DEFAULT '0',
    `preco_custo` DOUBLE NOT NULL DEFAULT '0',
    `preco_venda` DOUBLE NOT NULL DEFAULT '0',
    `comentario` TEXT NULL DEFAULT NULL COLLATE 'latin1_swedish_ci',
    `pode_ser_vendido` INT(1) NULL DEFAULT '1',
    `pode_ser_comprado` INT(1) NULL DEFAULT '0',
    `fabricado_aqui` INT(1) NULL DEFAULT '1',
    `data_cadastro` TIMESTAMP NOT NULL DEFAULT current_timestamp(),
    `data_alteracao` TIMESTAMP NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
    `excluido` INT(1) NULL DEFAULT '0',
    `ativo` INT(1) NULL DEFAULT '1',
    `estoque` FLOAT NULL DEFAULT '0',
    PRIMARY KEY (`id`) USING BTREE,
    UNIQUE INDEX `codigo_produto` (`codigo_produto`) USING BTREE
)
COLLATE='latin1_swedish_ci'
ENGINE=InnoDB
AUTO_INCREMENT=1987
;
CREATE TABLE `aion_ordem_servico_historico` (
    `id` INT(11) NOT NULL AUTO_INCREMENT,
    `id_equipamento` INT(11) NOT NULL DEFAULT '0',
    `id_ordem_servico` INT(11) NOT NULL DEFAULT '0',
    `codigo_ordem_servico` CHAR(12) NOT NULL DEFAULT '0' COLLATE 'utf8mb4_unicode_ci',
    `id_observacao` INT(11) NULL DEFAULT '0',
    `id_usuario` CHAR(12) NOT NULL DEFAULT '0' COLLATE 'utf8mb4_unicode_ci',
    `quantidade` INT(11) NULL DEFAULT '0',
    `teve_almoco` INT(1) NOT NULL DEFAULT '0',
    `data` DATETIME NOT NULL DEFAULT current_timestamp(),
    `excluido` TINYINT(1) NOT NULL DEFAULT '0',
    PRIMARY KEY (`id`) USING BTREE
)
COLLATE='utf8mb4_unicode_ci'
ENGINE=InnoDB
AUTO_INCREMENT=5298
;
{
    "ordem_producao": [
        {
            "id": 1,
            "codigo": "OP-000001",
            "id_pedido": 1,
            "codigo_pedido": "MP-000001",
            "id_cliente": 1,
            "nome_cliente": "CONSMETAL",
            "id_pedido_item": 1,
            "codigo_pedido_item": "MI-000001",
            "id_produto": 1,
            "codigo_produto": "100800100",
            "descricao_produto": "SUPORTE PLACA DE MOTO",
            "quantidade_pedida": 10,
            "quantidade_produzida": 0,
            "percentual_produzido": 80,
            "quantidade_estoque": 100,
            "quantidade_disponivel": 100,
            "comentario": null,
            "datas": {
                "data_cadastro": "2021-01-01",
                "autor_cadastro": 1,
                "nome_autor_cadastro": "ADMIN",
                "data_previsao_entrega": "2021-01-01",
                "autor_previsao_entrega": 1,
                "nome_autor_previsao_entrega": "ADMIN",
                "data_alteracao": "2021-01-01",
                "autor_alteracao": 1,
                "nome_autor_alteracao": "ADMIN",
                "data_exclusao": null,
                "autor_exclusao": null,
                "nome_autor_exclusao": null,
                "motivo_exclusao": null,
                "excluido": false
            },
            "ordem_servico": [
                {
                    "id": 1,
                    "codigo": "OS-000001",
                    "operacao": "CORTE",
                    "tempo": 120,
                    "pronto": 2,
                    "datas": {
                        "data_cadastro": "2021-01-01",
                        "autor_cadastro": 1,
                        "nome_autor_cadastro": "ADMIN",
                        "data_exclusao": null,
                        "autor_exclusao": null,
                        "nome_autor_exclusao": null,
                        "motivo_exclusao": null,
                        "excluido": false
                    },
                },
                {
                    "id": 2,
                    "codigo": "OS-000002",
                    "operacao": "DOBRA",
                    "tempo": 75,
                    "pronto": 2,
                    "datas": {
                        "data_cadastro": "2021-01-01",
                        "autor_cadastro": 1,
                        "nome_autor_cadastro": "ADMIN",
                        "data_exclusao": null,
                        "autor_exclusao": null,
                        "nome_autor_exclusao": null,
                        "motivo_exclusao": null,
                        "excluido": false
                    },        
                },
                {
                    "id": 3,
                    "codigo": "OS-000003",
                    "operacao": "PINTURA",
                    "tempo": 180,
                    "pronto": 2,
                    "datas": {
                        "data_cadastro": "2021-01-01",
                        "autor_cadastro": 1,
                        "nome_autor_cadastro": "ADMIN",
                        "data_exclusao": null,
                        "autor_exclusao": null,
                        "nome_autor_exclusao": null,
                        "motivo_exclusao": null,
                        "excluido": false
                    },
                }
            ]
        },
    ]
}
*/
export function ordemproducao(app, db) {
    app.get("/api/ordemproducao", async (req, res) => {
        try {

            const [ordensProducao] = await db.query(`
            SELECT 
                op.id,
                op.id_pedido,
                op.id_pedido_item,
                op.id_produto,
                op.codigo_produto,
                op.comentario,
                p.nome AS descricao_produto,
                p.estoque AS quantidade_estoque,
                p.estoque AS quantidade_disponivel, 
                c.nome cliente,
                pdi.quantidade quantidade_pedida,
                pd.data_entrega,
                pd.cadastrado_em,
                pd.alterado_em 
            FROM aion_ordem_producao op
            INNER JOIN aion_produto p ON p.id = op.id_produto
            INNER JOIN aion_pedidos pd ON pd.id = op.id_pedido 
            INNER JOIN aion_pedidos_itens pdi ON pdi.id_pedido = pd.id AND pdi.id_produto = p.id 
            INNER JOIN aion_clientes c ON c.id = pd.id_cliente 
            WHERE op.excluido = 0
            ORDER BY op.id DESC
            `);

            const resultado = await Promise.all(ordensProducao.map(async (op) => {

                const [historico] = await db.query(`
                    SELECT 
                        os.id AS id_ordem_servico,
                        os.id_operacao,
                        o.nome_operacao AS operacao,
                        oh.quantidade, 
                        oh.teve_almoco,
                        oh.data,
                        ob.parada 
                    FROM aion_ordem_servico os
                    LEFT JOIN aion_operacao o ON o.id = os.id_operacao
                    LEFT JOIN aion_ordem_servico_historico oh ON oh.id_ordem_servico = os.id 
                    LEFT JOIN aion_ordem_producao op ON op.id = os.id_ordem_producao 
                    INNER JOIN aion_observacao ob ON ob.id = oh.id_observacao 
                    WHERE os.id_ordem_producao = ? AND os.excluido = 0
                `, [op.id]);

                function calcularTempoPorOrdemServico(historico) {
                    const tempoMap = {};

                    const agrupado = historico.reduce((acc, h) => {
                        if (!acc[h.id_ordem_servico]) acc[h.id_ordem_servico] = [];
                        acc[h.id_ordem_servico].push(h);
                        return acc;
                    }, {});

                    for (const [id, eventos] of Object.entries(agrupado)) {
                        eventos.sort((a, b) => new Date(a.data) - new Date(b.data));

                        let tempoTotal = 0;
                        let inicio = null;
                        let almoco = 0;

                        for (const ev of eventos) {
                            if (ev.parada === 0) {
                                inicio = new Date(ev.data);
                                almoco = ev.teve_almoco;
                            } else if (ev.parada === 1 && inicio) {
                                const fim = new Date(ev.data);
                                let segundos = (fim - inicio) / 1000;
                                if (almoco) segundos -= 3600;
                                tempoTotal += Math.max(segundos, 0);
                                inicio = null;
                            }
                        }

                        tempoMap[id] = Math.round(tempoTotal);
                    }

                    return tempoMap;
                }

                const tempoPorOrdem = calcularTempoPorOrdemServico(historico);

                const quantidadeProduzida = Object.values(
                    historico.reduce((acc, h) => {
                        if (!acc[h.id_ordem_servico]) acc[h.id_ordem_servico] = 0;
                        acc[h.id_ordem_servico] += h.quantidade || 0;
                        return acc;
                    }, {})
                ).reduce((max, soma) => Math.max(max, soma), 0);

                const percentualProduzido = op.quantidade_pedida > 0
                    ? Math.round((quantidadeProduzida / op.quantidade_pedida) * 100)
                    : 0;

                const [ordensServico] = await db.query(`
                SELECT 
                    os.id,
                    os.id_operacao,
                    o.nome_operacao AS operacao,
                    oh.quantidade
                FROM aion_ordem_servico os
                LEFT JOIN aion_operacao o ON o.id = os.id_operacao
                LEFT JOIN aion_ordem_servico_historico oh ON oh.id_ordem_servico = os.id 
                LEFT JOIN aion_ordem_producao op ON op.id = os.id_ordem_producao 
                WHERE os.id_ordem_producao = ? AND os.excluido = 0
                `, [op.id]);

                return {
                    id: op.id,
                    codigo: `OP-${String(op.id).padStart(6, "0")}`,
                    id_pedido: op.id_pedido,
                    codigo_pedido: `MP-${String(op.id_pedido).padStart(6, "0")}`,
                    id_cliente: op.id_cliente,
                    nome_cliente: op.cliente,
                    id_pedido_item: op.id_pedido_item,
                    codigo_pedido_item: `MI-${String(op.id_pedido_item).padStart(6, "0")}`,
                    id_produto: op.id_produto,
                    codigo_produto: op.codigo_produto,
                    descricao_produto: op.descricao_produto,
                    quantidade_pedida: op.quantidade_pedida,
                    quantidade_produzida: quantidadeProduzida,
                    percentual_produzido: percentualProduzido > 100 ? 100 : percentualProduzido,
                    quantidade_estoque: op.quantidade_estoque,
                    quantidade_disponivel: op.quantidade_disponivel,
                    comentario: op.comentario,
                    datas: {
                        data_cadastro: op.cadastrado_em,
                        data_previsao_entrega: op.data_entrega,
                        data_alteracao: op.alterado_em,
                        excluido: false
                    },
                    ordem_servico: Object.values(ordensServico.reduce((acc, os) => {
                        if (!acc[os.id_operacao]) {
                            acc[os.id_operacao] = {
                                id: os.id,
                                codigo: `OS-${String(os.id).padStart(6, "0")}`,
                                operacao: os.operacao,
                                tempo: tempoPorOrdem[os.id] ?? 0,
                                pronto: os.quantidade ?? 0,
                            };
                        } else {
                            acc[os.id_operacao].pronto += (os.quantidade * 1) ?? 0;
                        }

                        return acc;
                    }, {}))
                };
            }));

            res.json({ ordem_producao: resultado });
        } catch (err) {
            console.error("Erro ao buscar ordens de produção:", err);
            res.status(500).json({ error: "Erro ao buscar ordens de produção" });
        }
    });
}
