import { DateTime } from 'luxon'
import { BaseModel, beforeSave, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import { AccessToken, DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Role from './role.js'
import hash from '@adonisjs/core/services/hash'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { compose } from '@adonisjs/core/helpers'
import Filiere from './filiere.js'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
  currentAccessToken?: AccessToken

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nom: string

  @column()
  declare prenom: string

  @column()
  declare email: string

  @column({ serializeAs: null })
  declare password: string

  @column()
  declare nationalite: string

  @column()
  declare domaine: string

  @column()
  declare photo_profile: string | null

  @column()
  declare status: boolean

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @column()
  declare role_id: number

  @belongsTo(() => Role, { foreignKey: 'role_id' })
  declare role: BelongsTo<typeof Role>

  @hasMany(() => Filiere, { foreignKey: 'user_id' })
  declare filieres: HasMany<typeof Filiere>

  static accessTokens = DbAccessTokensProvider.forModel(User, {
    expiresIn: '30 days',
    prefix: 'oat_',
    table: 'auth_access_tokens',
    type: 'auth_token',
    tokenSecretLength: 40,
  })

  @beforeSave()
  static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await hash.make(user.password)
    }
  }
}
