export function up(knex) {
  return knex.schema.createTable('usuarios', table => {
    table.increments('id').primary()
    table.string('nome', 255).notNullable()
    table.string('cpf', 11).unique().notNullable()
    table.string('email', 255).unique().notNullable()
  })
}

export function down(knex) {
  return knex.schema.dropTableIfExists('usuarios')
}
