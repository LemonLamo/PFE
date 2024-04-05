import axios from "axios";
import { baseURL } from "../config";

export async function ajouterRemarque(hospitalisation: Hospitalisation["id"], remarque: string) {
  console.log(hospitalisation, remarque)
  try {
    await axios.post(`${baseURL}/api/hospitalisations/${hospitalisation}/remarques`, {remarque: remarque});
    //window.location.reload();
  } catch (error) {
    console.log(error);
  }
}

export async function ajouterSortie(hospitalisation: Hospitalisation["id"], sortie: Sortie ){
  console.log(hospitalisation, sortie)
  try {
    await axios.post(`${baseURL}/api/hospitalisations/${hospitalisation}/sortie`, sortie);
    //window.location.reload();
  } catch (error) {
    console.log(error);
  }
}