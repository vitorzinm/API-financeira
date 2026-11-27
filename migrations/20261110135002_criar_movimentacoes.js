export function up(knex) {
  return knex.schema.createTable('movimentacoes', table => {
    table.increments('id').primary()
    table.string('descricao', 255).notNullable()
    table.decimal('valor', 12, 2).notNullable()
    table.date('data').notNullable()
    table.boolean('receita').notNullable()
    table.boolean('efetivado').notNullable()

    table
      .integer('usuario_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('usuarios')
      .onUpdate('CASCADE')
      .onDelete('RESTRICT')
  })
}

export function down(knex) {
  return knex.schema.dropTableIfExists('movimentacoes')
}
