import vine from '@vinejs/vine'

/**
 * Validates the role's creation action
 */
export const filiereValidator = vine.compile(
  vine.object({
    libelle: vine.string().trim().minLength(3).maxLength(32).unique(async (db, value) => {
        const filiere = await db.from('filieres').where('libelle', value).first()
        return !filiere
      }),
    description: vine.string().trim().escape().nullable(),
    status: vine.boolean(),
    user_id: vine.number().exists(async (db, value) => {
        const user = await db.from('users').where('id', value).first()
        return !!user
      }),
  })
)