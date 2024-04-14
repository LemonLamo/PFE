import axios from "axios";
import { baseURL } from "../config";
import Badge from "../components/UI/Badge";
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";

export const lits_types = ["Broncal", "Type A", "Type B"];

export async function createChambre(chambre: Chambre) {
  try {
    const response = await axios.post(`${baseURL}/api/chambres`, chambre);
    return response.data;
  } catch (error: any) {
    return error;
  }
}

export async function editChambre(chambre: Chambre) {
  try {
    const response = await axios.put(`${baseURL}/api/chambres`, chambre);
    return response.data;
  } catch (error: any) {
    console.error(error);
  }
}

export async function deleteChambre(numChambre: Chambre["num"]) {
  try {
    const response = await axios.delete(
      `${baseURL}/api/chambres/${numChambre}`
    );
    return response.data;
  } catch (error: any) {
    console.error(error);
  }
}

export function getEtageName(etage: number) {
  if (etage == 0) return "RDC";
  if (etage == 1) return "1er";
  return etage + "éme";
}

export function taux_occupation_badge(
  nombre_lits_occupe: number,
  nombre_lits: number
) {
  const taux = (Number(nombre_lits_occupe!) * 100) / Number(nombre_lits);
  if (taux < 50) {
    return (
      <Badge bgColor={"#dcfce7"} textColor={"#267142"} className="ms-2">
        <CheckCircleIcon className="h-[1.7vh] mr-1" />
        {taux.toFixed(2)}%
      </Badge>
    );
  } else if (taux >= 50 && taux < 75) {
    return (
      <Badge bgColor={"#fdba74"} textColor={"#9a3412"} className="ms-2">
        <ExclamationTriangleIcon className="h-[1.7vh] mr-1" />
        {taux.toFixed(2)}%
      </Badge>
    );
  } else {
    return (
      <Badge bgColor={"#fee2e2"} textColor={"#991b1b"} className="ms-2">
        <ExclamationTriangleIcon className="h-[1.7vh] mr-1" />
        {taux.toFixed(2)}%
      </Badge>
    );
  }
}
