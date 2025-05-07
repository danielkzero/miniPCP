import moment from "moment";
import "moment/locale/pt-br.js";

/*
CREATE TABLE `aion_pedidos` (
	`id` INT(11) NOT NULL AUTO_INCREMENT,
	`id_cliente` INT(11) NOT NULL DEFAULT '0',
	`codigo_cliente` CHAR(20) NOT NULL DEFAULT '' COLLATE 'utf8mb4_unicode_ci',
	`data_entrega` DATETIME NULL DEFAULT NULL,
	`status` INT(1) NOT NULL DEFAULT '1',
	`cadastrado_em` DATETIME NOT NULL DEFAULT current_timestamp(),
	`alterado_em` DATETIME NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
	`excluido` INT(1) NOT NULL DEFAULT '0',
	PRIMARY KEY (`id`) USING BTREE
)
COLLATE='utf8mb4_unicode_ci'
ENGINE=InnoDB
AUTO_INCREMENT=506
;

CREATE TABLE `aion_pedidos_itens` (
	`id` INT(11) NOT NULL AUTO_INCREMENT,
	`id_pedido` INT(11) NOT NULL DEFAULT '0',
	`id_produto` INT(11) NOT NULL DEFAULT '0',
	`codigo_produto` CHAR(20) NULL DEFAULT NULL COLLATE 'utf8mb4_unicode_ci',
	`quantidade` INT(11) NOT NULL,
	`cadastrado_em` DATETIME NOT NULL DEFAULT current_timestamp(),
	`alterado_em` DATETIME NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
	`excluido` INT(1) NOT NULL DEFAULT '0',
	PRIMARY KEY (`id`) USING BTREE
)
COLLATE='utf8mb4_unicode_ci'
ENGINE=InnoDB
ROW_FORMAT=DYNAMIC
AUTO_INCREMENT=1141
;
{
    "pedidos": [
        {
            "id": 1,
            "id_cliente": 1,
            "nome_cliente": "CONSMETAL",
            "datas": {
                "data_cadastro": "2021-01-01",
                "autor_cadastro": 1,
                "nome_autor_cadastro": "ADMIN",
                "data_alteracao": "2021-01-01",
                "autor_alteracao": 1,
                "nome_autor_alteracao": "ADMIN",
                "data_previsao_entrega": "2021-02-01",
                "autor_previsao_entrega": 1,
                "nome_autor_previsao_entrega": "ADMIN",
                "data_entrega": "2021-01-15",
                "autor_entrega": 1,
                "nome_autor_entrega": "ADMIN",
                "status": "Em produção",
                "data_status": "2021-01-15",
                "autor_status": 1,
                "nome_autor_status": "ADMIN",
                "data_exclusao": null,
                "autor_exclusao": null,
                "nome_autor_exclusao": null,
                "motivo_exclusao": null,
                "excluido": false
            },
            "itens": [
                {
                    "id": 1,
                    "id_produto": 1,
                    "codigo_produto": "100100102",
                    "nome_produto": "BARRA AMORTECEDORA 30mm",
                    "quantidade": 10,
                    "entregue": 0,
                    "preco": 10.00,
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
                    }
                },
*/

export function pedidos(app, db) {
    app.get("/api/pedidos", async (req, res) => {
        try {
            const [rows] = await db.execute(`
                SELECT 
                    a.id, 
                    a.id_cliente, 
                    c.nome nome_cliente, 
                    c.codigo codigo_cliente, 
                    a.data_entrega, 
                    a.status, 
                    a.cadastrado_em, 
                    a.alterado_em,
                    a.excluido 
                FROM aion_pedidos a 
                INNER JOIN aion_clientes c ON a.id_cliente=c.id 
                WHERE a.excluido = 0
            `);
            const resultado = await Promise.all(
                rows.map(async (row) => {
                    const [itens] = await db.execute(`
                        SELECT 
                            i.id, 
                            i.id_produto, 
                            i.codigo_produto, 
                            p.nome nome_produto,
                            i.quantidade, 
                            i.cadastrado_em, 
                            i.alterado_em, 
                            i.excluido 
                        FROM aion_pedidos_itens i
                        INNER JOIN aion_produto p ON i.id_produto = p.id
                        WHERE i.id_pedido = ? AND i.excluido = 0
                    `, [row.id]);

                    return {
                        id: `MP-${String(row.id).padStart(6, "0")}`,
                        id_cliente: row.id_cliente,
                        nome_cliente: row.nome_cliente,
                        codigo_cliente: row.codigo_cliente,
                        data_entrega: moment(row.data_entrega).format("DD/MM/YYYY"),
                        status: row.status,
                        cadastrado_em: moment(row.cadastrado_em).format("DD/MM/YYYY"),
                        alterado_em: moment(row.alterado_em).format("DD/MM/YYYY"),
                        excluido: row.excluido,
                        itens: itens.map((item) => ({
                            id: item.id,
                            id_produto: item.id_produto,
                            codigo_produto: item.codigo_produto,
                            nome_produto: item.nome_produto,
                            quantidade: item.quantidade,
                            data_cadastro: moment(item.cadastrado_em).format("DD/MM/YYYY"),
                            data_alteracao: moment(item.alterado_em).format("DD/MM/YYYY"),
                            excluido: item.excluido,
                        })),
                    };
                })
            );

            res.json({ pedidos: resultado });
        } catch (error) {
            console.error("Erro ao buscar pedidos:", error);
            res.status(500).json({ error: "Erro ao buscar pedidos" });
        }
    });
}