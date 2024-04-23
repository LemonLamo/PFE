import axios from "axios";
import { baseURL } from "../config";

export async function getNotifiations (){
    const data = (await axios.get(`${baseURL}/api/notifications`)).data;
    return data
}

export async function mark_as_read(id: Notif["id"]){
    try{
        await axios.post(`${baseURL}/api/notifications/${id}/mark-as-read`);
    } catch (error: any) {
      console.error(error)
      throw error;
    }
}