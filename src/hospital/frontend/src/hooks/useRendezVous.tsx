import axios from "axios";
import { baseURL } from "../config";

export async function createRendezVous(rdv : Partial<RendezVous & InterventionCode>) {
    const data : any = rdv;
    data.patient = rdv.patient?.NIN
    console.log(data)
    try {
        await axios.post(`${baseURL}/api/rendez-vous`, data);
        //window.location.reload();
    } catch (error) {
        console.log(error);
    }
}