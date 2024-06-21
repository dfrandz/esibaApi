import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import Filiere from './filiere.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class NiveauFiliere extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @column()
  declare libelle: string

  @column()
  declare description: string

  @column()
  declare status: boolean

  @column()
  declare filiere_id: string

  @belongsTo(() => Filiere, {foreignKey: 'filiere_id'})
  declare Filiere: BelongsTo<typeof Filiere>
}