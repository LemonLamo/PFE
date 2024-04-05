import axios from "axios";
import { baseURL } from "../config";

export async function createSoin(soin : Partial<Soin>) {
  console.log(soin)
  try {
    await axios.post(`${baseURL}/api/soins`, soin);
    //window.location.reload();
  } catch (error) {
    console.log(error);
  }
}

export async function executerSoin(soin: Soin["id"], remarque : string){
  console.log(soin, remarque)
  try {
    await axios.post(`${baseURL}/api/soins/${soin}/executer`, {remarque: remarque});
    //window.location.reload();
  } catch (error) {
    console.log(error);
  }
}