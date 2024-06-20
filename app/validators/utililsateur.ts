import vine from '@vinejs/vine'

export const userValidator = vine.compile(
  vine.object({
    nom: vine.string().trim().minLength(3).maxLength(32),
    prenom: vine.string().trim().minLength(3).maxLength(32),
    email: vine
      .string()
      .trim()
      .minLength(3)
      .maxLength(32)
      .email()
      .unique(async (db, value) => {
        const user = await db.from('users').where('email', value).first()
        return !user
      }),
    password: vine.string().trim().minLength(3).maxLength(32),
    status: vine.boolean(),
    role_id: vine.string().exists(async (db, value) => {
      const role = await db.from('roles').where('id', value).first()
      return !!role
    }),
    nationalite: vine.string().trim().minLength(3).maxLength(32),
    domaine: vine.string().trim().minLength(3).maxLength(32),
    photo_profile: vine.string().trim().minLength(3).maxLength(32).nullable(),
  })
)

export const loginValidator = vine.compile(
  vine.object({
    email: vine.string().trim().minLength(3).maxLength(32).email(),
    password: vine.string().trim().minLength(3).maxLength(32),
  })
)
