exports.up = function (knex) {
    return knex.schema.createTable("movimentacoes", (table) => {
        table.increments("id").primary();
        table.string("descricao", 255).notNullable();
        table.decimal("valor", 12, 2).notNullable();
        table.date("data").notNullable();
        table.boolean("receita").notNullable();
        table.boolean("efetivado").notNullable();
    });
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists("movimentacoes");
};
