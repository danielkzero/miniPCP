import moment from 'moment'
import 'moment/locale/pt-br.js' 

/**
 CREATE TABLE `aion_usuarios` (
	`id` BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
	`codigo` VARCHAR(30) NULL DEFAULT NULL COLLATE 'utf8mb4_unicode_ci',
	`nome` VARCHAR(50) NULL DEFAULT NULL COLLATE 'utf8mb4_unicode_ci',
	`sobrenome` VARCHAR(100) NULL DEFAULT NULL COLLATE 'utf8mb4_unicode_ci',
	`login` VARCHAR(50) NOT NULL COLLATE 'utf8mb4_unicode_ci',
	`senha` VARCHAR(100) NOT NULL COLLATE 'utf8mb4_unicode_ci',
	`id_nivel` INT(11) NOT NULL DEFAULT '2',
	`data_cadastro` DATETIME NOT NULL DEFAULT current_timestamp(),
	`data_alteracao` DATETIME NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
	`excluido` TINYINT(1) NOT NULL DEFAULT '0',
	`ativo` TINYINT(1) NOT NULL DEFAULT '1',
	PRIMARY KEY (`id`) USING BTREE,
	UNIQUE INDEX `login` (`login`) USING BTREE,
	UNIQUE INDEX `codigo` (`codigo`) USING BTREE
)
COLLATE='utf8mb4_unicode_ci'
ENGINE=InnoDB
AUTO_INCREMENT=29




CREATE TABLE `aion_usuario_nivel` (
	`id` BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
	`nome` VARCHAR(50) NULL DEFAULT NULL COLLATE 'utf8mb4_unicode_ci',
	`liberado` TEXT NULL DEFAULT NULL COLLATE 'utf8mb4_unicode_ci',
	`data_cadastro` DATETIME NOT NULL DEFAULT current_timestamp(),
	`data_alteracao` DATETIME NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
	`excluido` TINYINT(1) NOT NULL DEFAULT '0',
	`ativo` TINYINT(1) NOT NULL DEFAULT '1',
	PRIMARY KEY (`id`) USING BTREE,
	UNIQUE INDEX `nome` (`nome`) USING BTREE
)
COLLATE='utf8mb4_unicode_ci'
ENGINE=InnoDB
ROW_FORMAT=DYNAMIC
AUTO_INCREMENT=8
;



liberado = [{"id":"1","pagina":"pedido_de_venda","visualizar":true,"criar":false,"editar":false,"excluir":false,"submenus":[{"id":"2","pagina":"pedidos","visualizar":true,"criar":true,"editar":true,"excluir":true}]},{"id":"3","pagina":"producao","visualizar":true,"criar":false,"editar":false,"excluir":false,"submenus":[{"id":"4","pagina":"ordem_producao","visualizar":true,"criar":true,"editar":true,"excluir":true},{"id":"5","pagina":"registro_entrega","visualizar":true,"criar":true,"editar":true,"excluir":true},{"id":"6","pagina":"cadastro_equipamento","visualizar":true,"criar":true,"editar":true,"excluir":true},{"id":"7","pagina":"cadastro_observacao","visualizar":true,"criar":true,"editar":true,"excluir":true}]},{"id":"8","pagina":"centro_trabalho","visualizar":true,"criar":false,"editar":false,"excluir":false,"submenus":[{"id":"9","pagina":"equipamentos_em_uso","visualizar":true,"criar":true,"editar":true,"excluir":true}]},{"id":"10","pagina":"produtos","visualizar":true,"criar":false,"editar":false,"excluir":false,"submenus":[{"id":"11","pagina":"lista_produtos","visualizar":true,"criar":true,"editar":true,"excluir":true},{"id":"12","pagina":"unidades","visualizar":true,"criar":true,"editar":true,"excluir":true},{"id":"13","pagina":"grupos","visualizar":true,"criar":true,"editar":true,"excluir":true},{"id":"14","pagina":"setores","visualizar":true,"criar":true,"editar":true,"excluir":true},{"id":"15","pagina":"operacoes","visualizar":true,"criar":true,"editar":true,"excluir":true}]},{"id":"16","pagina":"estoque","visualizar":true,"criar":false,"editar":false,"excluir":false,"submenus":[{"id":"17","pagina":"meu_estoque","visualizar":true,"criar":true,"editar":true,"excluir":true},{"id":"18","pagina":"historico_estoque","visualizar":true,"criar":true,"editar":true,"excluir":true}]},{"id":"19","pagina":"painel_clientes","visualizar":true,"criar":false,"editar":false,"excluir":false,"submenus":[{"id":"20","pagina":"lista_clientes","visualizar":true,"criar":true,"editar":true,"excluir":true}]},{"id":"21","pagina":"painel_usuario","visualizar":true,"criar":false,"editar":false,"excluir":false,"submenus":[{"id":"22","pagina":"usuarios","visualizar":true,"criar":true,"editar":true,"excluir":true},{"id":"23","pagina":"usuario_nivel","visualizar":true,"criar":true,"editar":true,"excluir":true}]},{"id":"25","pagina":"menus","visualizar":true,"criar":false,"editar":false,"excluir":false,"submenus":[{"id":"26","pagina":"gerenciar_menus","visualizar":true,"criar":true,"editar":true,"excluir":true}]}]
;*/
export function usuarios(app, db) {
    app.get('/api/usuarios', async (req, res) => {
        try {
            const [rows] = await db.execute(`
                SELECT 
                    a.id, 
                    a.codigo, 
                    a.avatar,
                    a.nome, 
                    a.sobrenome, 
                    a.login, 
                    a.senha, 
                    a.id_nivel, 
                    a.data_cadastro data_cadastro, 
                    a.data_alteracao data_alteracao, 
                    a.excluido, 
                    a.ativo,
                    b.nome nome_nivel
                FROM aion_usuarios a, aion_usuario_nivel b
                WHERE a.excluido = 0 AND b.id = a.id_nivel
                ORDER BY id DESC
            `);
            res.json(
                {
                    usuarios: rows.map(row => ({
                        id: row.id,
                        codigo: row.codigo,
                        avatar: row.avatar,
                        nome: row.nome,
                        sobrenome: row.sobrenome,
                        login: row.login,
                        senha: row.senha,
                        id_nivel: row.id_nivel,
                        data_cadastro: moment(row.data_cadastro).locale('pt-br').format('DD/MM/YYYY HH:mm:ss'),
                        data_alteracao: moment(row.data_alteracao).locale('pt-br').format('DD/MM/YYYY HH:mm:ss'),
                        excluido: row.excluido,
                        ativo: row.ativo,
                        nome_nivel: row.nome_nivel
                    }))
                }
            );
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao listar os usuarios' });
        }
    });

    app.post('/api/usuarios', async (req, res) => {
        try {
            const { codigo, avatar, nome, sobrenome, login, senha, id_nivel } = req.body;
            const [rows] = await db.execute(`
                INSERT INTO aion_usuarios (codigo, avatar, nome, sobrenome, login, senha, id_nivel) 
                VALUES (?, ?, ?, ?, ?, ?, ?)
            `, [codigo, avatar, nome, sobrenome, login, senha, id_nivel]);
            res.json({ id: rows.insertId });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao cadastrar o usuario' });
        }
    });

    app.put('/api/usuarios/:id', async (req, res) => {
        try {
            const { id } = req.params;
            const { codigo, avatar, nome, sobrenome, login, senha, id_nivel } = req.body;
            const [rows] = await db.execute(`
                UPDATE aion_usuarios 
                SET codigo = ?, avatar = ?, nome = ?, sobrenome = ?, login = ?, senha = ?, id_nivel = ? 
                WHERE id = ?
            `, [codigo, avatar, nome, sobrenome, login, senha, id_nivel, id]);
            res.json({ affectedRows: rows.affectedRows });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao atualizar o usuario' });
        }
    });

    app.delete('/api/usuarios/:id', async (req, res) => {
        try {
            const { id } = req.params;
            const [rows] = await db.execute(`
                UPDATE aion_usuarios 
                SET excluido = 1 
                WHERE id = ?
            `, [id]);
            res.json({ affectedRows: rows.affectedRows });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao excluir o usuario' });
        }
    });

    app.get('/api/usuarios/:id', async (req, res) => {
        try {
            const { id } = req.params;
            const [rows] = await db.execute(`
                SELECT 
                    a.id, 
                    a.codigo, 
                    a.avatar,
                    a.nome, 
                    a.sobrenome, 
                    a.login, 
                    a.senha, 
                    a.id_nivel, 
                    a.data_cadastro data_cadastro, 
                    a.data_alteracao data_alteracao, 
                    a.excluido, 
                    a.ativo,
                    b.nome nome_nivel
                FROM aion_usuarios a, aion_usuario_nivel b
                WHERE a.excluido = 0 AND b.id = a.id_nivel AND a.id = ?
                ORDER BY id DESC
            `, [id]);
            res.json(
                {
                    usuarios: rows.map(row => ({
                        id: row.id,
                        codigo: row.codigo,
                        avatar: row.avatar,
                        nome: row.nome,
                        sobrenome: row.sobrenome,
                        login: row.login,
                        senha: row.senha,
                        id_nivel: row.id_nivel,
                        data_cadastro: moment(row.data_cadastro).locale('pt-br').format('DD/MM/YYYY HH:mm:ss'),
                        data_alteracao: moment(row.data_alteracao).locale('pt-br').format('DD/MM/YYYY HH:mm:ss'),
                        excluido: row.excluido,
                        ativo: row.ativo,
                        nome_nivel: row.nome_nivel
                    }))
                }
            );
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao listar o usuario' });
        }
    });
}


export function niveis(app, db) {
    app.get('/api/niveis', async (req, res) => {
        try {
            const [rows] = await db.execute(`
                SELECT 
                    a.id, 
                    a.nome, 
                    a.liberado, 
                    a.data_cadastro data_cadastro, 
                    a.data_alteracao data_alteracao, 
                    a.excluido, 
                    a.ativo,
                    a.imortal
                FROM aion_usuario_nivel a
                WHERE a.excluido = 0
                ORDER BY id DESC
            `);
            res.json(
                {
                    niveis: rows.map(row => ({
                        id: row.id,
                        nome: row.nome,
                        liberado: JSON.parse(row.liberado),
                        data_cadastro: moment(row.data_cadastro).locale('pt-br').format('DD/MM/YYYY HH:mm:ss'),
                        data_alteracao: moment(row.data_alteracao).locale('pt-br').format('DD/MM/YYYY HH:mm:ss'),
                        excluido: row.excluido,
                        ativo: row.ativo,
                        imortal: row.imortal
                    }))
                }
            );
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao listar os niveis' });
        }
    });

    app.post('/api/niveis', async (req, res) => {
        try {
            const { nome, liberado } = req.body;
            const [rows] = await db.execute(`
                INSERT INTO aion_usuario_nivel (nome, liberado) 
                VALUES (?, ?)
            `, [nome, JSON.stringify(liberado)]);
            res.json({ id: rows.insertId });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao cadastrar o nivel' });
        }
    });

    app.put('/api/niveis/:id', async (req, res) => {
        try {
            const { id } = req.params;
            const { nome, liberado } = req.body;
            const [rows] = await db.execute(`
                UPDATE aion_usuario_nivel 
                SET nome = ?, liberado = ? 
                WHERE id = ?
            `, [nome, JSON.stringify(liberado), id]);
            res.json({ affectedRows: rows.affectedRows });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao atualizar o nivel' });
        }
    });

    app.delete('/api/niveis/:id', async (req, res) => {
        try {
            const { id } = req.params;
            const [rows] = await db.execute(`
                UPDATE aion_usuario_nivel 
                SET excluido = 1 
                WHERE id = ?
            `, [id]);
            res.json({ affectedRows: rows.affectedRows });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao excluir o nivel' });
        }
    });

    app.get('/api/niveis/:id', async (req, res) => {
        try {
            const { id } = req.params;
            const [rows] = await db.execute(`
                SELECT 
                    a.id, 
                    a.nome, 
                    a.liberado, 
                    a.data_cadastro data_cadastro, 
                    a.data_alteracao data_alteracao, 
                    a.excluido, 
                    a.ativo
                FROM aion_usuario_nivel a
                WHERE a.excluido = 0 AND a.id = ?
                ORDER BY id DESC
            `, [id]);
            res.json(
                {
                    niveis: rows.map(row => ({
                        id: row.id,
                        nome: row.nome,
                        liberado: JSON.parse(row.liberado),
                        data_cadastro: moment(row.data_cadastro).locale('pt-br').format('DD/MM/YYYY HH:mm:ss'),
                        data_alteracao: moment(row.data_alteracao).locale('pt-br').format('DD/MM/YYYY HH:mm:ss'),
                        excluido: row.excluido,
                        ativo: row.ativo
                    }))
                }
            );
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao listar o nivel' });
        }
    });
}
