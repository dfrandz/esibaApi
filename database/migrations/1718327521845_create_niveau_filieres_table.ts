import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'niveau_filieres'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.timestamp('created_at')
      table.timestamp('updated_at')
      table.string('libelle').notNullable();
      table.string('description').nullable();
      table.boolean('status').defaultTo(true)
      table.integer('filiere_id').unsigned().references('filieres.id').onDelete('CASCADE')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}