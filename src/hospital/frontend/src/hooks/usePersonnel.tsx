import axios from "axios";
import { baseURL } from "../config";

export async function createPersonnel(personnel: Personnel, avatar: File) {
  try {
    const formData = new FormData();
    Object.keys(personnel).forEach((key) => formData.append(key, personnel[key as keyof Personnel] as string));
    formData.append('avatar', avatar!);
  
    const config = { headers: {'content-type': 'multipart/form-data'} }
    await axios.post(`${baseURL}/api/personnel`, formData, config);
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
