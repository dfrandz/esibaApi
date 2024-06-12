import type { HttpContext } from '@adonisjs/core/http'
import User from '../../models/user.js'
import { loginValidator, userValidator } from '../../validators/utililsateur.js'
import hash from '@adonisjs/core/services/hash'
export default class UtilisateursController {

  async getAllUsers({ response }: HttpContext) {
    const users = await User.query().preload('role')
    return response.status(200).json({
      message: 'Users fetched successfully',
      data: users,
      status: 'success',
    })
  }

  async create({ request, response }: HttpContext) {
    const payload = await userValidator.validate(request.body())
    // console.log('payload', payload)
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

  async login({ request, response }: HttpContext) {
    const payload = await loginValidator.validate(request.body())
    try {
      const user = await User.query().where('email', payload.email).first()
      try {
        if (user) {
          await hash.verify(user.password, payload.password)
          console.log('user', user)
          const token = await User.accessTokens.create(
            user,
            ['*'], // with all abilities
            {
              expiresIn: '24hours', // expires in 30 days
            }
          )
          if (token) {
            console.log('user: ', user)
            return response.status(200).json({
              access_token: token,
              user: user,
              success: true,
              message: 'utilisateur connecté avec succes!',
              errors: null,
            })
          }
        }
      } catch (error) {
        return response.status(error.status).json({
          result: null,
          success: true,
          message: 'email ou password incorrect!',
          errors: error,
        })
      }
    } catch (error) {
      return response.status(503).json({
        result: null,
        success: false,
        message: 'erreur de connexion a la base de donnée',
        errors: error,
      })
    }
  }

  async logout({ auth, response }: HttpContext) {
    const user = await auth.authenticate()
    console.log('logout')
    if (user) {
      await User.accessTokens.delete(user, user.currentAccessToken.identifier)
    }
    return response.status(200).json({
      result: null,
      success: true,
      message: 'deconnexion',
      errors: null,
    })
  }
}
