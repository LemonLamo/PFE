import axios from "axios";
import { baseURL } from "../config";

export async function getNotifiations (){
    const data = (await axios.get(`${baseURL}/api/notifications`)).data;
    return data
}