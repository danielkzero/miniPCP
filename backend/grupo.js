import moment from "moment";
import "moment/locale/pt-br.js"; 
/*
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
*/
export function grupo(app, db) {
    app.get("/api/grupo", async (req, res) => {
        try {
            const [rows] = await db.execute(`
                SELECT 
                    a.id, 
                    a.nome,
                    a.sufixo_identificacao,
                    a.materia_prima,
                    a.data_cadastro,
                    a.data_alteracao,
                    a.ativo
                FROM aion_produto_grupo a 
                WHERE a.excluido = 0
            `);
            res.json({
                grupos: rows.map((row) => ({
                    id: row.id,
                    nome: row.nome,
                    sufixo_identificacao: row.sufixo_identificacao,
                    materia_prima: row.materia_prima,
                    ativo: row.ativo,
                    data_cadastro: moment(row.data_cadastro)
                        .locale("pt-br")
                        .format("DD/MM/YYYY HH:mm:ss"),
                    data_alteracao: moment(row.data_alteracao)
                        .locale("pt-br")
                        .format("DD/MM/YYYY HH:mm:ss"),
                })),
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Erro ao listar o grupo" });
        }
    });
}