import Filiere from "#models/filiere";

export default class FiliereService {
    
    addFiliere = (data:any) =>{ 
        const filiere =  Filiere.create(data);
        return filiere
    }

    getAll=()=>{
        return Filiere.query().preload('User')
    }

    delete = (data:Filiere)=>{
        data.delete()
    }
}