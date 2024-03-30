import axios from "axios";
import { baseURL } from "../config";

export async function createPersonnel(personnel : Personnel) {
  console.log(personnel)
    try {
      await axios.post(`${baseURL}/api/personnel`, personnel);
      //window.location.reload();
    } catch (error) {
      console.log(error);
    }
  }

export async function editPersonnel(personnel : Personnel) {
  console.log(personnel)
  try {
    await axios.put(`${baseURL}/api/personnel`, personnel);
    window.location.reload();
  } catch (error) {
    console.log(error);
  }
}

export async function deletePersonnel(NIN : Personnel["NIN"]) {
    try {
      await axios.delete(`${baseURL}/api/personnel/${NIN}`);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
}