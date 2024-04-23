import { CheckCircleIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import Badge from "../components/UI/Badge";
import axios from "axios";
import { baseURL } from "../config";

export function status_badge (date_fait: Date | undefined){
    if (date_fait)
        return (
        <Badge bgColor={"#dcfce7"} textColor={"#267142"} className="ms-2">
            <CheckCircleIcon className="h-[1.7vh] mr-1" />
            Fait
        </Badge>);
    else
        return (
        <Badge bgColor={"#fee2e2"} textColor={"#991b1b"} className="ms-2">
            <ExclamationTriangleIcon className="h-[1.7vh] mr-1" />
            Pas encore
        </Badge>);
}

export async function joindre_resultat_radio(id: Radio["id"], files: File[], observations: Radio["observations"]){
    const formData = new FormData();
    files.forEach((radio) => formData.append(`radios`, radio))
    
    if(observations)
        formData.append(`observations`, observations);

    try{
        await axios.post(`${baseURL}/api/radios/${id}`, formData, { headers: {'content-type': 'multipart/form-data'} });
    }catch(error: any){
        console.error(error)
        throw error;
    }
}