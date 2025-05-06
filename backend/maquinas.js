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
}
