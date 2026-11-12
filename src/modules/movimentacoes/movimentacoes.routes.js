const express = require("express");
const router = express.Router();

const controller = require("./movimentacoes.controller");

router.get("/", (req, res) => {
    return controller.getAllMovimentacoes(req, res);
});

router.post("/", (req, res) => {
    return controller.cadastroMovimentacao(req, res);
});

router.get("/:id", (req, res) => {
    return controller.getIdMovimentacoes(req, res);
});

router.delete("/:id", (req, res) => {
    return controller.deleteIdMovimentacoes(req, res);
});

router.put("/:id", (req, res) => {
    return controller.atualizarIdMovimentacoes(req, res);
});

module.exports = router;
