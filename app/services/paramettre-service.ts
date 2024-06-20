import Matiere from "#models/matiere";

export default class ParametreService{

    // matiere
    async getMatieres():Promise<Matiere[]> {
        return await Matiere.all();
    }

    async storeMatiere(matiereDto:any):Promise<Matiere>{
        return await Matiere.create(matiereDto);
    }

}