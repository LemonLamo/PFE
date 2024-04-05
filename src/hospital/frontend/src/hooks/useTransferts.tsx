import axios from "axios";
import { baseURL } from "../config";
type Transfert = {
    
}

export async function ajouterTransfert(transfert: Transfert) {
  console.log(transfert)
  try {
    await axios.post(`${baseURL}/api/transferts`, transfert);
    //window.location.reload();
  } catch (error) {
    console.log(error);
  }
}