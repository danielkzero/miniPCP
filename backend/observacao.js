import moment from "moment";
import "moment/locale/pt-br.js";
/*
CREATE TABLE `aion_observacao` (
	`id` INT(11) NOT NULL AUTO_INCREMENT,
	`observacao` TEXT NOT NULL COLLATE 'utf8mb4_unicode_ci',
	`parada` INT(1) NOT NULL DEFAULT '0',
	`data_cadastro` TIMESTAMP NOT NULL DEFAULT current_timestamp(),
	`data_alteracao` TIMESTAMP NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
	`excluido` INT(1) NOT NULL DEFAULT '0',
	`ativo` INT(1) NOT NULL DEFAULT '1',
	PRIMARY KEY (`id`) USING BTREE
)
COLLATE='utf8mb4_unicode_ci'
ENGINE=InnoDB
AUTO_INCREMENT=9
;
{
    "observacao": [
        {
            "id": 1,
            "observacao": "INICIO DE LOTE",
            "parada": 0,
            "data_cadastro": "2023-10-01 00:00:00",
        {
            "id": 2,
            "observacao": "FIM DE LOTE",
            "parada": 0,
            "data_cadastro": "2023-10-01 00:00:00",
        },
        {
            "id": 3,
            "observacao": "PARADA PROGRAMADA",
            "parada": 1,
            "data_cadastro": "2023-10-01 00:00:00",
        },
        {
            "id": 4,
            "observacao": "PARADA NÃO PROGRAMADA",
            "parada": 1,
            "data_cadastro": "2023-10-01 00:00:00",
        }
    ]
}
*/

export function observacao(app, db) {
    app.get("/api/observacao", async (req, res) => {
        try {
            const [rows] = await db.execute(`
                SELECT 
                    id,
                    observacao,
                    parada,
                    data_cadastro,
                    data_alteracao,
                    excluido,
                    ativo
                FROM aion_observacao
                WHERE excluido = 0
                ORDER BY id DESC
            `);

            const observacao = rows.map((row) => ({
                id: row.id,
                observacao: row.observacao,
                parada: row.parada,
                data_cadastro: moment(row.data_cadastro).format("DD/MM/YYYY"),
            }));

            res.json({ observacao });
        } catch (error) {
            console.error("Erro ao buscar observação:", error);
            res.status(500).json({ error: "Erro ao buscar observação" });
        }
    });
}