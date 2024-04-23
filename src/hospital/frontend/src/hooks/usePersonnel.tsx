import axios from "axios";
import { baseURL } from "../config";

export async function createPersonnel(personnel: Personnel) {
  try {
    await axios.post(`${baseURL}/api/personnel`, personnel);
  } catch (error) {
    console.error(error)
    throw error;
  }
}

export async function editPersonnel(personnel: Personnel) {
  try {
    await axios.put(`${baseURL}/api/personnel`, personnel);
  } catch (error) {
    console.error(error)
    throw error;
  }
}

export async function deletePersonnel(NIN: Personnel["NIN"]) {
  try {
    await axios.delete(`${baseURL}/api/personnel/${NIN}`);
  } catch (error) {
    console.error(error)
    throw error;
  }
}
