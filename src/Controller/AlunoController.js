const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
    async criarAluno(req, res) {
        const { nome, curso, professorId } = req.body;

        const alunoExistente = await prisma.aluno.findFirst({
            where: {
                nome: nome,
                curso: curso
            }
        });
        
        if(alunoExistente) {
            return res.json("Esse aluno já foi criado.");
        }

        try {
            const aluno = await prisma.aluno.create({
                data: {
                    nome,
                    curso,
                    professorId
                }
            });
            res.json(aluno);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Error ao criar novo aluno." });
        }
    },

    async buscarAluno(req, res) {
        const { professorId } = req.params;

        try {
            const alunos = await prisma.aluno.findMany({
                where: {
                    professorId: parseInt(professorId)
                }
            });
            res.json(alunos);
        } catch (error) {
            res.status(500).json({error: "Erro de busca de alunos."})
        }
    }
}