import axios from "axios";
import { baseURL } from "../config";

export async function createSoin(soin : Soin) {
  console.log(soin)
    try {
      await axios.post(`${baseURL}/api/soin`, soin);
      //window.location.reload();
    } catch (error) {
      console.log(error);
    }
  }

export async function editSoin(soin : Soin) {
  console.log(soin)
  try {
    await axios.put(`${baseURL}/api/soins`, soin);
    //window.location.reload();
  } catch (error) {
    console.log(error);
  }
}

export async function deleteSoin(code_soin : Soin["code_soin"]) {
    try {
      await axios.delete(`${baseURL}/api/soins/${code_soin}`);
      //window.location.reload();
    } catch (error) {
      console.log(error);
    }
}