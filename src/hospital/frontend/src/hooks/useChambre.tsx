import axios from "axios";
import { hostUrl } from ".";

export const getChambres = async () => {
  try {
    const response = await axios.get(`${hostUrl}/api/chambres`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const postChambres = async (data) => {
  try {
    const response = await axios.post(`${hostUrl}/api/chambres`, data);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
export const putChambres = async (data) => {
  try {
    const response = await axios.put(`${hostUrl}/api/chambres`, data);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
export const deleteChambres = async (num) => {
  try {
    const response = await axios.delete(`${hostUrl}/api/chambres/${num}`);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
export const getOneChambres = async (num) => {
  try {
    const response = await axios.get(`${hostUrl}/api/chambres/${num}`);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
