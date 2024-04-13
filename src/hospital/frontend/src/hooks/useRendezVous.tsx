import axios from "axios";
import { baseURL } from "../config";

export async function createRendezVous(NIN: Patient["NIN"], rdv : Partial<RendezVous & InterventionCode>) {
    const data : any = rdv;
    data.patient = NIN
    console.log(data)
    try {
        await axios.post(`${baseURL}/api/rendez-vous`, data);
        //window.location.reload();
    } catch (error) {
        console.log(error);
    }
}