import User from '#models/user'
import { loginValidator, userValidator } from '#validators/utililsateur'
import type { HttpContext } from '@adonisjs/core/http'

export default class AuthController {

    async register({ request, response }: HttpContext) {
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

    async login({ request, response }: HttpContext) {
        const payload = await loginValidator.validate(request.body())
        try {
          const user = await User.verifyCredentials(payload.email, payload.password)
          const token = await User.accessTokens.create(
            user,
            ['*'], // with all abilities
            {
              expiresIn: '24hours', // expires in 30 days
            }
          )
          if (token) {
            return response.status(200).json({
              access_token: token,
              user: user,
              success: true,
              message: 'utilisateur connecté avec succes!',
              errors: null,
            })
          }
        } catch (error) {
          return response.status(error.status).json({
            result: null,
            success: true,
            message: 'email ou password incorrect!',
            errors: error,
          })
        }
    }

    async logout({ auth, response }: HttpContext) {
        const user = await auth.authenticate()
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