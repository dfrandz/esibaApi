import type { HttpContext } from '@adonisjs/core/http'
import Role from '../../models/role.js'
import { createRoleValidator } from '../../validators/role.js'

export default class RolesController {
  async storeRole({ request, response }: HttpContext) {
    const { libelle, description, status } = request.body()
    const payload = await createRoleValidator.validate({ libelle, description, status })
    const role = await Role.create(payload)
    return response.status(201).json({
      message: 'Role created successfully',
      result: role,
      status: 'success',
    })
  }

  async getAllRoles({ response }: HttpContext) {
    const roles = await Role.all()
    return response.status(200).json({
      message: 'Roles fetched successfully',
      result: roles,
      success: true,
      status: 200,
    })
  }

  async updateRole({ request, response, params }: HttpContext) {
    const { id } = params
    const { libelle, description, status } = request.body()
    try {
      const role = await Role.findOrFail(id)
      role.merge({ libelle, description, status })
      await role.save()

      return response.status(200).json({
        message: 'Role updated successfully',
        result: role,
        status: 'success',
      })
    } catch (error) {
      return response.status(404).json({
        message: 'Role not found',
        error: error.message,
        status: 'failed',
      })
    }
  }

  async deleteRole({ params, response }: HttpContext) {
    const { id } = params
    try {
      const role = await Role.findOrFail(id)
      await role.delete()
      return response.status(200).json({
        message: 'Role deleted successfully',
        success: true,
        status: 200,
        result: role,
      })
    } catch (error) {
      return response.status(404).json({
        message: 'Role not found',
        error: error.message,
        status: 'failed',
      })
    }
  }
}
