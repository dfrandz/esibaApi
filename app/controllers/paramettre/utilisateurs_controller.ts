import type { HttpContext } from '@adonisjs/core/http'
import User from '../../models/user.js'
import {userValidator } from '../../validators/utililsateur.js'
export default class UtilisateursController {

  async getAllUsers({ response }: HttpContext) {
    const users = await User.query().preload('role')
    return response.status(200).json({
      message: 'Users fetched successfully',
      data: users,
      status: 'success',
    })
  }


  async getOne({ params, response }: HttpContext) {
    try {
      //   const user = await User.findOrFail(params.id)
      const user2 = await User.query().where('id', params.id).preload('role').first()
      return response.status(200).json({
        message: 'User fetched successfully',
        data: user2,
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
