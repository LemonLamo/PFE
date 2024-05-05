import axios from "axios";
import { baseURL } from "../config";
import { CheckCircleIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import Badge from "../components/UI/Badge";

export const build_badge = (done: boolean) => {
  return (
      done?
        <Badge bgColor="#dcfce7" textColor="#267142">
            <CheckCircleIcon className="h-4 mr-1" />
            Fait
        </Badge> :

        <Badge bgColor="#fee2e2" textColor="#991b1b">
            <ExclamationTriangleIcon className="h-4 mr-1" />
            Pas encore
        </Badge>
    );
};

export async function createSoin(soin : Partial<Soin>) {
  try {
    await axios.post(`${baseURL}/api/soins`, soin);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function executerSoin(soin: Soin["id"], remarque : string){
  try {
    await axios.post(`${baseURL}/api/soins/${soin}/executer`, {remarque: remarque});
  } catch (error) {
    console.error(error);
    throw error;
  }
}