import axios from "axios";
import { baseURL } from "../config";

export async function ajouterTransfert(id: Hospitalisation["id"], transfert: any) {
  transfert.hospitalisation = id;
  console.log(id)
  try {
    await axios.post(`${baseURL}/api/transferts`, transfert);
  } catch (error) {
    console.error(error);
    throw error;
  }
}