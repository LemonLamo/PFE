import axios from "axios";
import { baseURL } from "../config";

export async function executerIntervention(intervention: Intervention["id"], protocole_operatoire : string){
  console.log(intervention, protocole_operatoire)
  try {
    await axios.post(`${baseURL}/api/interventions/${intervention}/executer`, {protocole_operatoire: protocole_operatoire});
    //window.location.reload();
  } catch (error) {
    console.log(error);
  }
}