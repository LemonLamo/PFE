import axios from "axios";
import { baseURL } from "../config";

export async function executerIntervention(intervention: Intervention["id"], protocole_operatoire : string){
  try {
    await axios.post(`${baseURL}/api/interventions/${intervention}/executer`, {protocole_operatoire: protocole_operatoire});
  } catch (error) {
    console.log(error);
    throw error;
  }
}