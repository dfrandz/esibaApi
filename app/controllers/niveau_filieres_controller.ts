import NiveauFiliere from '#models/niveau_filiere'
import { NiveauFiliereValidator } from '#validators/filiere'
import type { HttpContext } from '@adonisjs/core/http'

export default class NiveauFilieresController {

    async store({ request, response }: HttpContext) {
        const payload = await NiveauFiliereValidator.validate(request.body())
        try {
            const niveau_filiere = await NiveauFiliere.create(payload)
            return response.status(201).json({
                message: 'filiere created successfully',
                result: niveau_filiere,
                status: 'success',
            })
        } catch (error) {
            return response.status(400).json({
                message: 'filiere creation failed',
                error: error.message,
                status: 'failed',
            })
        }
    }

    async getAll({ response }: HttpContext) {
        const niveauFilieres = await NiveauFiliere.all()
        return response.status(200).json({
          message: 'niveau fetched successfully 2',
          result: niveauFilieres,
          success: true,
          status: 200,
        })
    }
}