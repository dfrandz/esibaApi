import ParametreService from '#services/paramettre-service'
import { createMatiereValidator } from '#validators/role'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class MatieresController {

    constructor(protected service: ParametreService) { }

    async getAll({ response }: HttpContext) {
        const matieres = await this.service.getMatieres()
        return response.status(200).json({
          message: 'Matieres fetched successfully',
          result: matieres,
          success: true,
          status: 200,
        })
    }

    async store({request, response}:HttpContext){
        const payload = await createMatiereValidator.validate(request.body())
        console.log("payload: ", payload)
        try {
            const matiere = await this.service.storeMatiere(payload)
            return response.status(201).json({
                message: 'matiere created successfully',
                result: matiere,
                status: 'success',
            })
        } catch (error) {
            return response.status(404).json({
                message: 'filiere creation failed',
                error: error.message,
                status: 'failed',
            })
        }
    }
}