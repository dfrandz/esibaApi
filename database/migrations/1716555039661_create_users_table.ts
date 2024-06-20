import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      // table.increments('id').notNullable()
      table.uuid('id').unique().defaultTo(this.db.rawQuery('(UUID())').knexQuery)
      table.string('nom').nullable()
      table.string('prenom').nullable()
      table.string('email', 254).notNullable().unique()
      table.string('password').notNullable()
      table.string('nationalite').notNullable()
      table.string('domaine').nullable()
      table.string('photo_profile').nullable()
      table.boolean('status').notNullable()
      table.uuid('role_id').references('roles.id').onDelete('CASCADE')
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
