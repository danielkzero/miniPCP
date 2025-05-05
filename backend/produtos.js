import moment from "moment";
import "moment/locale/pt-br.js"; // Importa o locale para português do Brasil

/*
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
CREATE TABLE `aion_produto_anexo` (
    `id` INT(11) NOT NULL AUTO_INCREMENT,
    `id_produto` INT(11) NOT NULL,
    `url` TEXT NOT NULL COLLATE 'latin1_swedish_ci',
    `nome` TEXT NOT NULL COLLATE 'latin1_swedish_ci',
    `data_cadastro` TIMESTAMP NOT NULL DEFAULT current_timestamp(),
    PRIMARY KEY (`id`) USING BTREE
)
COLLATE='latin1_swedish_ci'
ENGINE=InnoDB
ROW_FORMAT=DYNAMIC
AUTO_INCREMENT=812
;
CREATE TABLE `aion_produto_composicao` (
    `id` INT(11) NOT NULL AUTO_INCREMENT,
    `codigo_produto_pai` CHAR(20) NULL DEFAULT NULL COLLATE 'latin1_swedish_ci',
    `codigo_produto_filho` CHAR(20) NULL DEFAULT NULL COLLATE 'latin1_swedish_ci',
    `quantidade` FLOAT NULL DEFAULT NULL,
    `data_cadastro` TIMESTAMP NOT NULL DEFAULT current_timestamp(),
    `data_alteracao` TIMESTAMP NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
    `excluido` INT(1) NULL DEFAULT '0',
    `ativo` INT(1) NULL DEFAULT '1',
    PRIMARY KEY (`id`) USING BTREE,
    UNIQUE INDEX `codigo_produto_pai_codigo_produto_filho` (`codigo_produto_pai`, `codigo_produto_filho`) USING BTREE
)
COLLATE='latin1_swedish_ci'
ENGINE=InnoDB
;
CREATE TABLE `aion_produto_grupo` (
    `id` INT(11) NOT NULL AUTO_INCREMENT,
    `id_pai` INT(11) NOT NULL DEFAULT '0',
    `sufixo_identificacao` CHAR(9) NULL DEFAULT NULL COLLATE 'latin1_swedish_ci',
    `nome` TEXT NOT NULL COLLATE 'latin1_swedish_ci',
    `materia_prima` INT(1) NOT NULL DEFAULT '0',
    `data_cadastro` TIMESTAMP NOT NULL DEFAULT current_timestamp(),
    `data_alteracao` TIMESTAMP NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
    `excluido` INT(1) NOT NULL DEFAULT '0',
    `ativo` INT(1) NOT NULL DEFAULT '1',
    PRIMARY KEY (`id`) USING BTREE,
    UNIQUE INDEX `sufixo_identificacao` (`sufixo_identificacao`) USING BTREE
)
COLLATE='latin1_swedish_ci'
ENGINE=InnoDB
AUTO_INCREMENT=29
;
CREATE TABLE `aion_produto_materia_prima` (
    `id` INT(11) NOT NULL AUTO_INCREMENT,
    `id_produto` INT(11) NOT NULL,
    `id_materia_prima` INT(11) NOT NULL,
    `cadastrado_em` DATETIME NOT NULL DEFAULT current_timestamp(),
    `alterado_em` DATETIME NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
    PRIMARY KEY (`id`) USING BTREE,
    UNIQUE INDEX `id_produto_id_materia_prima` (`id_produto`, `id_materia_prima`) USING BTREE
)
COLLATE='utf8mb4_unicode_ci'
ENGINE=InnoDB
AUTO_INCREMENT=618
;
CREATE TABLE `aion_produto_operacao` (
    `id` INT(11) NOT NULL AUTO_INCREMENT,
    `id_produto` INT(11) NOT NULL,
    `id_operacao` INT(11) NOT NULL,
    `tempo` INT(11) NOT NULL DEFAULT '0',
    `cadastrado_em` DATETIME NOT NULL DEFAULT current_timestamp(),
    `alterado_em` DATETIME NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
    PRIMARY KEY (`id`) USING BTREE,
    UNIQUE INDEX `id_produto_id_operacao` (`id_produto`, `id_operacao`) USING BTREE
)
COLLATE='utf8mb4_unicode_ci'
ENGINE=InnoDB
AUTO_INCREMENT=1027
;
CREATE TABLE `aion_unidade` (
    `id` INT(11) NOT NULL AUTO_INCREMENT,
    `unidade` CHAR(10) NOT NULL DEFAULT '' COLLATE 'latin1_swedish_ci',
    `descricao` TEXT NOT NULL COLLATE 'latin1_swedish_ci',
    `data_cadastro` TIMESTAMP NOT NULL DEFAULT current_timestamp(),
    `data_alteracao` TIMESTAMP NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
    `excluido` INT(1) NOT NULL DEFAULT '0',
    `ativo` INT(1) NOT NULL DEFAULT '1',
    PRIMARY KEY (`id`) USING BTREE,
    UNIQUE INDEX `unidade` (`unidade`) USING BTREE
)
COLLATE='latin1_swedish_ci'
ENGINE=InnoDB
AUTO_INCREMENT=6
;
CREATE TABLE `aion_operacao` (
    `id` INT(11) NOT NULL AUTO_INCREMENT,
    `nome_operacao` TEXT NOT NULL COLLATE 'utf8mb4_unicode_ci',
    `cadastrado_em` DATETIME NOT NULL DEFAULT current_timestamp(),
    `alterado_em` DATETIME NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
    `ativo` INT(1) NOT NULL DEFAULT '1',
    `excluido` INT(1) NOT NULL DEFAULT '0',
    PRIMARY KEY (`id`) USING BTREE
)
COLLATE='utf8mb4_unicode_ci'
ENGINE=InnoDB
AUTO_INCREMENT=15
;

{
    "produtos": [
        {
            "id": 1,
            "codigos": {
                "EAN13": "1234567890123",
                "CODIGO": "100800030"
            },
            "descricoes": {
                "nome": "SUPORTE PLACA DE MOTO",
                "descricao": "SUPORTE PLACA DE MOTO",
                "apelidos": [
                    "SUP. PLACA MOTO",
                    "SUP. MOTO"
                ],
                "datas": {
                    "data_cadastro": "2021-01-01",
                    "autor_cadastro": 1,
                    "nome_autor_cadastro": "ADMIN",
                    "data_alteracao": "2021-01-01",
                    "autor_alteracao": 1,
                    "nome_autor_alteracao": "ADMIN",
                    "data_exclusao": null,
                    "autor_exclusao": null,
                    "nome_autor_exclusao": null,
                    "motivo_exclusao": null,
                    "excluido": true
                }
            },
            "nome": "SUPORTE PLACA DE MOTO",
            "descricao": "SUPORTE PLACA DE MOTO",
            "id_unidade": 1,
            "nome_unidade": "UN",
            "id_categoria": 1,
            "nome_categoria": "ACESSÓRIOS",
            "tags": [
                "PLACA",
                "MOTO",
                "SUPORTE"
            ],
            "fornecedores": [
                {
                    "id_fornecedor": 1,
                    "nome_fornecedor": "Fornecedor 1",
                    "ativo": true,
                    "datas": {
                        "data_cadastro": "2021-01-01",
                        "autor_cadastro": 1,
                        "nome_autor_cadastro": "ADMIN",
                        "data_exclusao": null,
                        "autor_exclusao": null,
                        "nome_autor_exclusao": null,
                        "motivo_exclusao": null,
                        "excluido": false
                    }
                },
                {
                    "id_fornecedor": 2,
                    "nome_fornecedor": "Fornecedor 2",
                    "ativo": true,
                    "datas": {
                        "data_cadastro": "2021-01-01",
                        "autor_cadastro": 1,
                        "nome_autor_cadastro": "ADMIN",
                        "data_exclusao": null,
                        "autor_exclusao": null,
                        "nome_autor_exclusao": null,
                        "motivo_exclusao": null,
                        "excluido": false
                    }
                }
            ],
            "ativo_em": {
                "estoque": true,
                "venda": true,
                "compra": true,
                "fabricacao": true
            },
            "dimensoes": {
                "altura": 0.5,
                "largura": 0.5,
                "comprimento": 0.5
            },
            "pesos": {
                "peso_bruto": 0.5,
                "peso_liquido": 0.5
            },
            "precos": {
                "preco_venda": 10.00,
                "preco_compra": 5.00,
                "preco_fabricacao": 2.00
            },
            "estoque": {
                "quantidade": 10,
                "minimo": 5,
                "maximo": 20
            },
            "comentario": "",
            "datas": {
                "data_cadastro": "2021-01-01",
                "autor_cadastro": 1,
                "nome_autor_cadastro": "ADMIN",
                "data_alteracao": "2021-01-01",
                "autor_alteracao": 1,
                "nome_autor_alteracao": "ADMIN",
                "data_exclusao": null,
                "autor_exclusao": null,
                "nome_autor_exclusao": null,
                "motivo_exclusao": null,
                "excluido": false
            },
            "anexos": [
                {
                    "id": 1,
                    "id_produto": 1,
                    "nome": "SUPORTE PLACA DE MOTO",
                    "base64": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAABKklEQVR42mNk...",
                    "tipo": "imagem",
                    "datas": {
                        "data_cadastro": "2021-01-01",
                        "autor_cadastro": 1,
                        "nome_autor_cadastro": "ADMIN",
                        "data_exclusao": null,
                        "autor_exclusao": null,
                        "nome_autor_exclusao": null,
                        "motivo_exclusao": null,
                        "excluido": false
                    }
                },
                {
                    "id": 2,
                    "id_produto": 1,
                    "nome": "DESENHO TÉCNICO DO SUPORTE PLACA DE MOTO",
                    "base64": "data:application/pdf;base64,JVBERi0xLjQKJeLjz9MNCjI0IDAgb2JqCjw8L0xpbmVhcml6ZWQg...",
                    "tipo": "documento",
                    "datas": {
                        "data_cadastro": "2021-01-01",
                        "autor_cadastro": 1,
                        "nome_autor_cadastro": "ADMIN",
                        "data_exclusao": null,
                        "autor_exclusao": null,
                        "nome_autor_exclusao": null,
                        "motivo_exclusao": null,
                        "excluido": false
                    }
                }
            ],
            "operacoes": [
                {
                    "id": 1,
                    "operacao": "CORTE",
                    "tempo": 120,
                    "datas": {
                        "data_cadastro": "2021-01-01",
                        "autor_cadastro": 1,
                        "nome_autor_cadastro": "ADMIN",
                        "data_exclusao": null,
                        "autor_exclusao": null,
                        "nome_autor_exclusao": null,
                        "motivo_exclusao": null,
                        "excluido": false
                    }
                },
                {
                    "id": 2,
                    "operacao": "DOBRA",
                    "tempo": 75,
                    "datas": {
                        "data_cadastro": "2021-01-01",
                        "autor_cadastro": 1,
                        "nome_autor_cadastro": "ADMIN",
                        "data_exclusao": null,
                        "autor_exclusao": null,
                        "nome_autor_exclusao": null,
                        "motivo_exclusao": null,
                        "excluido": false
                    }
                },
                {
                    "id": 3,
                    "operacao": "PINTURA",
                    "tempo": 180,
                    "datas": {
                        "data_cadastro": "2021-01-01",
                        "autor_cadastro": 1,
                        "nome_autor_cadastro": "ADMIN",
                        "data_exclusao": null,
                        "autor_exclusao": null,
                        "nome_autor_exclusao": null,
                        "motivo_exclusao": null,
                        "excluido": false
                    }
                }
            ],
            "composicao": [
                {
                    "id": 1,
                    "composicao": "100% AÇO INOXIDÁVEL",
                    "quantidade": 0.5,
                    "datas": {
                        "data_cadastro": "2021-01-01",
                        "autor_cadastro": 1,
                        "nome_autor_cadastro": "ADMIN",
                        "data_exclusao": null,
                        "autor_exclusao": null,
                        "nome_autor_exclusao": null,
                        "motivo_exclusao": null,
                        "excluido": false
                    }
                }
            ]
        }
    ]
}


*/

// produtos.js
export function produtos(app, db) {
    app.get("/api/produto", async (req, res) => {
        try {
            const [produtos] = await db.execute(`
          SELECT 
            p.*, u.unidade AS nome_unidade, g.nome AS nome_categoria
          FROM 
            aion_produto p
          LEFT JOIN aion_unidade u ON u.id = p.id_unidade
          LEFT JOIN aion_produto_grupo g ON g.id = p.id_grupo
          WHERE p.excluido = 0
        `);

            const resultado = await Promise.all(produtos.map(async (produto) => {
                const [anexos] = await db.execute(`
            SELECT id, id_produto, nome, url, data_cadastro 
            FROM aion_produto_anexo 
            WHERE id_produto = ?`, [produto.id]);

                const [composicoes] = await db.execute(`
            SELECT c.id, c.codigo_produto_filho AS composicao, c.quantidade, c.data_cadastro 
            FROM aion_produto_composicao c 
            WHERE c.codigo_produto_pai = ?`, [produto.codigo_produto]);

                const [operacoes] = await db.execute(`
            SELECT po.id, o.nome_operacao AS operacao, po.tempo, po.cadastrado_em AS data_cadastro
            FROM aion_produto_operacao po
            JOIN aion_operacao o ON o.id = po.id_operacao
            WHERE po.id_produto = ?`, [produto.id]);

                return {
                    id: produto.id,
                    codigos: {
                        CODIGO: produto.codigo_produto
                    },
                    descricoes: {
                        nome: produto.nome,
                        descricao: produto.nome,
                        datas: {
                            data_cadastro: produto.data_cadastro,
                            data_alteracao: produto.data_alteracao,
                            excluido: produto.excluido === 1
                        }
                    },
                    nome: produto.nome,
                    descricao: produto.nome,
                    id_unidade: produto.id_unidade,
                    nome_unidade: produto.nome_unidade,
                    id_categoria: produto.id_grupo,
                    nome_categoria: produto.nome_categoria,
                    ativo_em: {
                        estoque: produto.estoque > 0,
                        venda: produto.pode_ser_vendido === 1,
                        compra: produto.pode_ser_comprado === 1,
                        fabricacao: produto.fabricado_aqui === 1
                    },
                    dimensoes: {
                        altura: produto.altura,
                        largura: produto.largura,
                        comprimento: produto.comprimento
                    },
                    pesos: {
                        peso_bruto: produto.peso,
                        peso_liquido: produto.peso
                    },
                    precos: {
                        preco_venda: produto.preco_venda,
                        preco_compra: produto.preco_custo,
                        preco_fabricacao: 0 // ajustar se existir esse dado
                    },
                    estoque: {
                        quantidade: produto.estoque,
                        minimo: 0, // ajustar se existir esse dado
                        maximo: 0
                    },
                    comentario: produto.comentario,
                    datas: {
                        data_cadastro: produto.data_cadastro,
                        data_alteracao: produto.data_alteracao,
                        excluido: produto.excluido === 1
                    },
                    anexos,
                    operacoes,
                    composicao: composicoes
                };
            }));

            res.json({ produtos: resultado });
        } catch (error) {
            console.error("Erro ao buscar produtos:", error);
            res.status(500).json({ erro: "Erro interno do servidor" });
        }
    });
}
