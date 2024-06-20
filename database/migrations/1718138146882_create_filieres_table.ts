import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'filieres'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      // table.increments('id')
      table.uuid('id').unique().defaultTo(this.db.rawQuery('(UUID())').knexQuery)
      table.string('libelle').notNullable();
      table.string('description').nullable();
      table.boolean('status').defaultTo(true)
      table.timestamp('created_at')
      table.timestamp('updated_at')
      table.uuid('user_id').references('users.id').onDelete('CASCADE')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}