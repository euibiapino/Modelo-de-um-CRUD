const { Router } = require("express");
const ProfessorController = require("./Controller/ProfessorController");
const AlunoController = require("./Controller/AlunoController");

const router = Router();

router.post("/criarProfessor", ProfessorController.criarProfessor);
router.get("/professor/:id", ProfessorController.buscarProfessor);

router.post("/criarAluno", AlunoController.criarAluno);
router.get("/:professorId/alunos", AlunoController.buscarAluno);

module.exports = { router };