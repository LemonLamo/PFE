import axios from "axios";
import { baseURL } from "../config";

export async function ajouterRemarque(hospitalisation: Hospitalisation["id"], remarque: string) {
  try {
    await axios.post(`${baseURL}/api/hospitalisations/${hospitalisation}/remarques`, {remarque: remarque});
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function ajouterSortie(hospitalisation: Hospitalisation["id"], sortie: Sortie ){
  try {
    await axios.post(`${baseURL}/api/hospitalisations/${hospitalisation}/sortie`, sortie);
  } catch (error) {
    console.log(error);
    throw error;
  }
}