import axios from "axios";
import { baseURL } from "../config";
type Transfert = {
    
}

export async function ajouterTransfert(transfert: Transfert) {
  try {
    await axios.post(`${baseURL}/api/transferts`, transfert);
  } catch (error) {
    console.error(error);
    throw error;
  }
}