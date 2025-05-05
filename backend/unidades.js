import moment from "moment";
import "moment/locale/pt-br.js"; // Importa o locale para português do Brasil

/*
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
*/
export function unidades(app, db) {
    app.get("/api/unidade", async (req, res) => {
        try {
            const [rows] = await db.execute(`
                SELECT 
                    a.id, 
                    a.unidade,
                    a.descricao,
                    a.data_cadastro,
                    a.data_alteracao,
                    a.ativo
                FROM aion_unidade a 
                WHERE a.excluido = 0
            `);
            res.json({
                unidades: rows.map((row) => ({
                    id: row.id,
                    unidade: row.unidade,
                    descricao: row.descricao,
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