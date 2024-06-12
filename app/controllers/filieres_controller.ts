import type { HttpContext } from '@adonisjs/core/http'

import FiliereService from "#services/filiere_service";
import { inject } from "@adonisjs/core";
import { filiereValidator } from '#validators/filiere';
import Filiere from '#models/filiere';

@inject()
export default class FilieresController {

    constructor(protected filiereService: FiliereService) { }

    async store({ request, response }: HttpContext) {
        const payload = await filiereValidator.validate(request.body())
        try {
            const filiere = await this.filiereService.addFiliere(payload)
            return response.status(201).json({
                message: 'filiere created successfully',
                result: filiere,
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
        try {
            const filieres = await this.filiereService.getAll()
            return response.status(200).json({
                message: 'filiere fetch successfully',
                result: filieres,
                status: 'success',
            })
        } catch (error) {

        }
    }

    async delete({ params, response }: HttpContext) {
        const { id } = params
        try {
            const filiere = await Filiere.findOrFail(id)
            await this.filiereService.delete(filiere)
            return response.status(200).json({
                message: 'filiere deleted successfully',
                success: true,
                status: 200,
                result: filiere,
            })
        } catch (error) {
            return response.status(404).json({
                message: 'Filiere not found',
                error: error.message,
                status: 'failed',
            })
        }
    }
}