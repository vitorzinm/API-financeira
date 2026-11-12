const express = require("express");
const app = express();

app.use(express.json());

const movimentacoesRoutes = require("./modules/movimentacoes/movimentacoes.routes");

app.use("/movimentacoes", movimentacoesRoutes);

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});
