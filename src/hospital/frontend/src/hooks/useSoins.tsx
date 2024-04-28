import axios from "axios";
import { baseURL } from "../config";

export async function createSoin(soin : Partial<Soin>) {
  try {
    await axios.post(`${baseURL}/api/soins`, soin);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function executerSoin(soin: Soin["id"], remarque : string){
  try {
    await axios.post(`${baseURL}/api/soins/${soin}/executer`, {remarque: remarque});
  } catch (error) {
    console.error(error);
    throw error;
  }
}