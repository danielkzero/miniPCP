import moment from 'moment'
import 'moment/locale/pt-br.js'  // Importa o idioma

export function infoCard (app, db) {
    app.get('/api/dashboard/infoCard', async (req, res) => {
        try {
            const [pedidos_de_hoje] = await db.execute(`
                SELECT COUNT(*) AS quantidade FROM aion_pedidos AS a WHERE a.cadastrado_em = DATE_FORMAT(CURRENT_TIMESTAMP(), '%Y-%m-%d');`);
                const [maquinas_em_uso] = await db.execute(`
                    SELECT 
                        COUNT(b.id) AS total 
                    FROM aion_ordem_servico_historico a
                    INNER JOIN 
                        (SELECT id_equipamento, MAX(data) AS ultima_data
                        FROM aion_ordem_servico_historico
                        WHERE excluido = 0
                        GROUP BY id_equipamento) ult ON a.id_equipamento = ult.id_equipamento AND a.data = ult.ultima_data
                    INNER JOIN aion_equipamento b ON a.id_equipamento = b.id
                    INNER JOIN aion_observacao c ON a.id_observacao = c.id
                    WHERE c.parada = 0 AND b.excluido = 0 AND b.ativo = 1
                `);
                const [ordens_de_servico_ativas] = await db.execute(`
                    SELECT 
                        COUNT(a.id_ordem_servico) AS total 
                    FROM aion_ordem_servico_historico a
                    INNER JOIN 
                        (SELECT id_equipamento, MAX(data) AS ultima_data
                        FROM aion_ordem_servico_historico
                        WHERE excluido = 0
                        GROUP BY id_equipamento) ult ON a.id_equipamento = ult.id_equipamento AND a.data = ult.ultima_data
                    INNER JOIN aion_equipamento b ON a.id_equipamento = b.id
                    INNER JOIN aion_observacao c ON a.id_observacao = c.id
                    WHERE c.parada = 0 AND b.excluido = 0 AND b.ativo = 1 
                `);
                const [clientes_ativos] = await db.execute(`
                    SELECT COUNT(DISTINCT a.id_cliente) total FROM aion_pedidos a WHERE a.cadastrado_em >= NOW() - INTERVAL 1 MONTH AND a.excluido=0
                `);
        res.json(
            { 
                infoCard: [
                    {
                        color: "bg-green-600",
                        icon: "bx bx-basket",
                        title: "Pedidos de hoje",
                        value: pedidos_de_hoje[0].quantidade,
                        colorValue: "text-green-600"
                    },
                    {
                        color: "bg-blue-600",
                        icon: "bx bxs-factory",
                        title: "Máquinas em Uso",
                        value: maquinas_em_uso[0].total,
                        colorValue: "text-blue-600"
                    },
                    {
                        color: "bg-orange-600",
                        icon: "bx bx-file",
                        title: "Ordens de serviços ativa",
                        value: ordens_de_servico_ativas[0].total,
                        colorValue: "text-orange-600"
                    },
                    {
                        color: "bg-indigo-600",
                        icon: "bx bx-user",
                        title: "Clientes ativos",
                        value: clientes_ativos[0].total,
                        colorValue: "text-indigo-600"
                    }
                ]
            }
        );
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao listar as máquinas em uso' });
        }
    });
}

export function grafico15dias (app, db) {
    app.get('/api/dashboard/grafico15dias', async (req, res) => {
        try {

            moment.locale('pt-br');

            const [rows] = await db.execute(`
                SELECT 
                    DATE_FORMAT(a.cadastrado_em, '%Y-%m-%d') AS data,
                    COUNT(a.id) AS total_pedidos
                FROM aion_pedidos a
                WHERE a.cadastrado_em >= NOW() - INTERVAL 15 DAY AND a.excluido=0
                GROUP BY data
                ORDER BY a.cadastrado_em DESC
            `);
            res.json(
                {
                    grafico15Dias: {
                        options: {
                            chart: {
                                id: 'grafico15Dias',
                                toolbar: { show: false },
                                zoom: { enabled: false },
                            },
                            colors: ['var(--color-indigo-500)'],
                            plotOptions: {
                                bar: {
                                    borderRadius: 5,
                                    columnWidth: 10,
                                }
                            },
                            yaxis: {
                                labels: { show: false },
                                axisTicks: { show: false },
                                axisBorder: { show: false }
                            },
                            dataLabels: { enabled: false },
                            xaxis: {
                                labels: { show: false }, axisTicks: { show: false }, axisBorder: { show: false },
                                categories: rows.map(row => moment(row.data).locale('pt-br').format('ddd')), /// dia da semana
                            },
                            grid: {
                                show: true,
                                borderColor: '#ddd',
                                strokeDashArray: 4,
                                xaxis: {
                                    lines: { show: false }
                                },
                                yaxis: {
                                    lines: { show: true }
                                }
                            },
                        },
                        series: [{
                            name: 'Pedidos',
                            data: rows.map(row => row.total_pedidos),
                        }]
                    }
                }
            );
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao listar os pedidos' });
        }
    });

}

export function historicaFabricacao(app, db) {
    app.get('/api/dashboard/historicoFabricacao', async (req, res) => {
        try {
            const [rows] = await db.execute(`
                SELECT 
                    a.id_ordem_servico, 
                    e.cadastrado_em data, 
                    (SELECT f.nome FROM aion_produto f WHERE f.codigo_produto=c.codigo_produto) descricao, 
                    SUM(a.quantidade) / e.quantidade progresso 
                FROM aion_ordem_servico_historico a, 
                    (SELECT 
                    *
                    FROM (
                        SELECT *, 
                            ROW_NUMBER() OVER (PARTITION BY id_ordem_servico ORDER BY id DESC) AS rn
                        FROM aion_ordem_servico_historico
                        WHERE excluido = 0
                    ) AS t 
                    WHERE t.rn = 1
                    ORDER BY t.id DESC
                    LIMIT 10) b, 
                    aion_ordem_servico c, 
                    aion_ordem_producao d, 
                    aion_pedidos_itens e

                    WHERE 

                    a.id_ordem_servico=b.id_ordem_servico AND 
                    c.id = replace(a.id_ordem_servico,'OS-','') * 1 AND 
                    d.id=c.id_ordem_producao AND e.id=d.id_pedido_item 

                    GROUP BY a.id_ordem_servico DESC
            `);
            res.json(
                {
                    historicoFabricacao: 
                        rows.map(row => (
                            {
                            ordem_de_servico: row.id_ordem_servico,
                            data: moment(row.data).locale('pt-br').format('DD/MM/YYYY'),
                            descricao: row.descricao,
                            progresso: (row.progresso * 100) >= 100 ? 100 : row.progresso * 100,
                        }
                    ))
                }
            );
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao listar os pedidos' });
        }
    });
}

export function ultimos10registroentrega(app, db) {
    app.get('/api/dashboard/ultimos10registroentrega', async (req, res) => {
        try {
            const [rows] = await db.execute(`
                SELECT 
                    a.id,
                    fncCodigo(a.id_ordem_entrega, '8001') numero_serie, 
                    a.data_cadastro data, 
                    (SELECT b.nome FROM aion_clientes b WHERE b.id=a.id_cliente) AS cliente 
                FROM aion_ordem_entrega_itens a GROUP BY a.id_ordem_entrega ORDER BY a.id DESC LIMIT 10
            `);
            res.json(
                {
                    ultimos10registroentrega: 
                        rows.map(row => (
                            {
                            numero_de_serie: row.numero_de_serie,
                            cliente: row.cliente,
                            data_de_entrega: moment(row.data_de_entrega).locale('pt-br').format('DD/MM/YYYY'),
                            }
                    ))
                }
            );
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao listar os pedidos' });
        }
    });
}