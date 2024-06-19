import { CheckCircleIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import Badge from "../components/UI/Badge";

export const validation_badge = (valid?: number) => {
    return (
        valid == 1 ?
            <Badge bgColor="#dcfce7" textColor="#267142" title="Technologie Blockchain assure l'intégrité de cet enregistrement">
                <CheckCircleIcon className="h-4 mr-1" />
                Intégrité garantie
            </Badge> :
            valid == -1 ?
                <Badge bgColor="#fee2e2" textColor="#991b1b" title="Cet enregistrement n'est pas intègre">
                    <ExclamationTriangleIcon className="h-4 mr-1" />
                    Altération détectée
                </Badge> :
                <Badge bgColor="#fdba74" textColor="#9a3412" title="Cet enregistrement n'a pas été validé">
                    <ExclamationTriangleIcon className="h-4 mr-1" />
                    Intégrité indéterminée
                </Badge>

    );
};