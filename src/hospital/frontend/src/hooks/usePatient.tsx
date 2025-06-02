import axios from "axios";
import { baseURL } from "../config";


export async function ajouter_maladie_chronique(NIN : string, maladie_chronique : Maladie) {
    const request = {
        code_maladie: maladie_chronique.code_maladie,
        date: maladie_chronique.date,
        remarques: maladie_chronique.remarques
    }
    try {
        await axios.post(`${baseURL}/api/patients/${NIN}/maladies-chroniques`, request);
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function ajouter_allergie(NIN : string, allergie : Allergie) {
    const request = {
        code_allergene: allergie.code_allergene,
        date: allergie.date,
        remarques: allergie.remarques
    }
    try {
        await axios.post(`${baseURL}/api/patients/${NIN}/allergies`, request);
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function ajouter_antecedent(NIN : string, antecedent : Antecedent, type: 'familial' | 'medical') {
    const request = {
        designation: antecedent.designation,
        date: antecedent.date,
        remarques: antecedent.remarques,
    }
    try {
        if(type=="medical")
            await axios.post(`${baseURL}/api/patients/${NIN}/antecedents-medicals`, request);
        else
            await axios.post(`${baseURL}/api/patients/${NIN}/antecedents-familiaux`, request);
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function ajouter_vaccination(NIN : string, vaccination : Vaccination) {
    const request = {
        code_vaccin: vaccination.code_vaccin,
        date: vaccination.date,
        remarques: vaccination.remarques,
        date_de_prochaine_dose: vaccination.date_de_prochaine_dose,
    }
    try {
        await axios.post(`${baseURL}/api/patients/${NIN}/vaccinations`, request);
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function ajouter_handicap(NIN: string, handicap: any) {
    const request = {
        code_handicap: handicap.code_handicap,
        date: handicap.date,
        remarques: handicap.remarques
    }
    try {
        await axios.post(`${baseURL}/api/patients/${NIN}/handicaps`, request);
    } catch (error) {
        console.error(error);
        throw error;
    }
} 