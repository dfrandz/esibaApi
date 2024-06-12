import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import User from './user.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

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
}