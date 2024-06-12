import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'filieres'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('libelle').notNullable();
      table.string('description').nullable();
      table.boolean('status').defaultTo(true)
      table.integer('user_id').unsigned().references('users.id').onDelete('CASCADE')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}