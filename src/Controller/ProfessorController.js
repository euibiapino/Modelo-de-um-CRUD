const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const prisma = new PrismaClient();

module.exports = {
    async criarProfessor(req, res) {
        try {
            const {nome, email, senha } = req.body;
            let professor = await prisma.professor.findUnique({
                where: { email }
            });

            if(professor) {
                return res.json({error: "Esse email já está em uso."})
            }
            await bcrypt.hash(senha, 10).then((hash => {
                prisma.professor.create({
                    data: {
                        nome,
                        email,
                        senha: hash
                    }
                }).then(() => {
                    res.json("Usuário criado.");
                }).catch((error) => {
                    res.json({error: "Algo deu errado."})
                })
            }))
        } catch (error) {
            res.json({error: erro});
        }
    },

    async buscarProfessor (req, res) {
        const { id } = req.params;
        
        try {
            const professor = await prisma.professor.findUnique({
                where: { id: parseInt(id, 10) }
            })
            res.json(professor);

        } catch (err) {
            res.json({error: err});
        }
    },

    async buscarTodosAlunos(req, res) {
        try {
            const alunos = await prisma.aluno.findMany()
            return res.json(alunos);
        } catch (error) {
            return res.json({ error });
        }
    }
}