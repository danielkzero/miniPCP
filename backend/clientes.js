export function clientes(app, db) {
    app.get('/api/clientes', async (req, res) => {
        try {
            const [rows] = await db.execute(`
                SELECT *
                FROM aion_clientes
            `);
            res.json(rows);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao listar os clientes' });
        }
    });
}