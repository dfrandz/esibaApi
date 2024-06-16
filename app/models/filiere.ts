import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import User from './user.js'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import NiveauFiliere from './niveau_filiere.js'

export default class Filiere extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare libelle: string

  @column()
  declare description: string

  @column()
  declare status: boolean

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @column()
  declare user_id: number

  @belongsTo(() => User, {foreignKey: 'user_id'})
  declare User: BelongsTo<typeof User>

  @hasMany(() => NiveauFiliere, { foreignKey: 'filiere_id' })
  declare NiveauFiliere: HasMany<typeof NiveauFiliere>
}