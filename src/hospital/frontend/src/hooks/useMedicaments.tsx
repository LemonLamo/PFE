import axios from "axios";
import { baseURL } from "../config";
import Badge from "../components/UI/Badge";
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";

export async function updateMedicamentQuantite(
  AddOrSubstract = 1,
  medicament: Medicament
) {
  const code_medicament = medicament.code_medicament;
  const quantite = AddOrSubstract * medicament.quantite!;
  try {
    await axios.put(`${baseURL}/api/medicaments/${code_medicament}`, {
      code_medicament: code_medicament,
      quantite: quantite,
    });
  } catch (error) {
    return error;
  }
}

export async function deleteMedicament(
  code_medicament: Medicament["code_medicament"]
) {
  try {
    await axios.delete(`${baseURL}/api/medicaments/${code_medicament}`);
  } catch (error) {
    return error;
  }
}

export const build_badge = (qte: number) => {
  if (qte >= 10)
    return (
      <Badge bgColor="#dcfce7" textColor="#267142">
        <CheckCircleIcon className="h-4 mr-1" />
        En stock
      </Badge>
    );
  else if (qte > 0)
    return (
      <Badge bgColor="#fdba74" textColor="#9a3412">
        <ExclamationTriangleIcon className="h-4 mr-1" />
        Près de repture
      </Badge>
    );
  else
    return (
      <Badge bgColor="#fee2e2" textColor="#991b1b">
        <ExclamationTriangleIcon className="h-4 mr-1" />
        Repture de stock
      </Badge>
    );
};
