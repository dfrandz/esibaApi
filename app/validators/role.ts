import vine from '@vinejs/vine'

/**
 * Validates the role's creation action
 */
export const createRoleValidator = vine.compile(
  vine.object({
    libelle: vine.string().trim().minLength(3).maxLength(32),
    // status: vine.boolean(),
    description: vine.string().trim().escape(),
  })
)

// const messages = {
//   'role.libelle.required': 'Le libelle est requis.',
//   'role.status.required': 'Le status est requis.',
//   'role.description.minLength': 'La description doit contenir au moins 4 caractères.',
//   'role.description.maxLength': 'La description doit contenir au plus 32 caractères.',
// }
