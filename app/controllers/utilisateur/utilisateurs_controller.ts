import type { HttpContext } from '@adonisjs/core/http'
import User from '../../models/user.js'
import { userValidator } from '../../validators/utililsateur.js'

export default class UtilisateursController {
  async getAllUsers({ request, response }: HttpContext) {
    const users = await User.query().preload('role')
    return response.ok(users)
  }

  async create({ request, response }: HttpContext) {
    const payload = await userValidator.validate(request.body())
    console.log('payload', payload)
    try {
      const user = await User.create(payload)
      return response.status(201).json({
        message: 'User created successfully',
        data: user,
        status: 'success',
      })
    } catch (error) {
      return response.status(400).json({
        message: 'User creation failed',
        error: error.message,
        status: 'failed',
      })
    }
  }

  async getOne({ params, response }: HttpContext) {
    try {
      const user = await User.findOrFail(params.id)
      return response.status(200).json({
        message: 'User fetched successfully',
        data: user,
        status: 'success',
      })
    } catch (error) {
      return response.status(404).json({
        message: 'User not found',
        error: error.message,
        status: 'failed',
      })
    }
  }

  async update({ params, request, response }: HttpContext) {
    const payload = await userValidator.validate(request.body())
    try {
      const user = await User.findOrFail(params.id)
      user.merge(payload)
      await user.save()
      return response.status(200).json({
        message: 'User updated successfully',
        data: user,
        status: 'success',
      })
    } catch (error) {
      return response.status(400).json({
        message: 'User update failed',
        error: error.message,
        status: 'failed',
      })
    }
  }

  async delete({ params, response }: HttpContext) {
    try {
      const user = await User.findOrFail(params.id)
      await user.delete()
      return response.status(200).json({
        message: 'User deleted successfully',
        status: 'success',
      })
    } catch (error) {
      return response.status(404).json({
        message: 'User not found',
        error: error.message,
        status: 'failed',
      })
    }
  }
}
