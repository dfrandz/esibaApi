import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'matieres'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').unique().defaultTo(this.db.rawQuery('(UUID())').knexQuery)
      // table.uuid('id').unique().defaultTo(this.db.raw('gen_random_uuid()'))
      // table.increments('id')
      table.timestamp('created_at')
      table.timestamp('updated_at')
      table.string('libelle').notNullable();
      table.string('description').nullable();
      table.boolean('status').defaultTo(true)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}