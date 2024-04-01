import { useMemo, useState } from "react";
import moment from "moment";
import Card from "../../components/UI/Card";
import { Link } from "react-router-dom";
import { ColumnDef } from "@tanstack/react-table";
import ViewButton from "../../components/UI/Buttons/ViewButton";
import { useQuery } from "@tanstack/react-query";
import DataTable from "../../components/UI/Tables/DataTable";
import axios from "axios";
import { baseURL } from "../../config";
import IconButton from "../../components/UI/Buttons/IconButton";
import AjouterSoinsModal from "./AjouterSoinsModal";
import AjouterInterventionModal from "./AjouterInterventionModal";
import AjouterRemarqueModal from "./AjouterRemarqueModal";
import TransfertModal from "./TransfertModal";
import SortieModal from "./SortieModal";

function MesPatientsHospitalisesPage() {
  const [selectedHospitalisation] = useState<Hospitalisation>({
    id: "",
    hopital: "",
    medecin: { NIN: "", nom: "", prenom: "" },
    patient: { NIN: "", nom: "", prenom: "" },
    date_entree: new Date(),
    mode_entree: "",
    motif_hospitalisation: "",
  });
  const [openModal, setOpenModal] = useState("");
  const query = useQuery({
    queryKey: ["patients_admis"],
    queryFn: async () => {
      const data = (await axios.get(`${baseURL}/api/ehr/medecin/hospitalisations`))
        .data;
      return data;
    },
  });

  const tableDefinition = useMemo(() => [
    { header: "Patient", id: "patient", cell: (info) => {
        const p = info.row.original;
        return <div className="flex w-68">
          <img className="rounded-full w-12 me-2" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"></img>
          <div>
            <h6 className="mb-0">{p.patient?.nom} {p.patient?.prenom}</h6>
            <p className="mb-0 font-semibold mt-[-0.4rem]">NIN: {p.patient?.NIN}</p>
          </div>
        </div>
      }
    },
    { header: "Date d'entrée", id: "date_entree", cell: (info) => moment(info.row.original.date_entree).format('DD/MM/YYYY') },
    { header: "Mode entrée", accessorKey: "mode_entree" },
    { header: "Chambre et lit", id: "chambre_lit", cell: (info) => <>Chambre {info.row.original.chambre}, Lit N°{info.row.original.lit} </> },
    { header: "Motif d'hospitalisation", accessorKey: "motif_hospitalisation" },
    { header: "Résumé d'hospitalisation", accessorKey: "resume_hospitalisation" },
    { header: "", id: "actions", cell: (info) => {
        const a = info.row.original
        return (
          <div className="flex justify-end gap-2">
            <Link to={`/patients/${a.patient.NIN}`} className="w-4 transform text-green-500 hover:text-green-700 hover:scale-110"> <ViewButton onClick={() => null} /> </Link>
            <IconButton icon="fa fa-briefcase-medical" className="text-red-500 hover:text-red-700" onClick={() => setOpenModal('soin')} />
            <IconButton icon="fa fa-person-running" className="text-green-500 hover:text-green-700" onClick={() => setOpenModal('intervention')} />
            <IconButton icon="fa fa-edit" className="text-yellow-500 hover:text-yellow-700" onClick={() => setOpenModal('remarques')} />
            <IconButton icon="fa fa-truck-medical" className="text-orange-500 hover:text-orange-700" onClick={() => setOpenModal('transfert')} />
            <IconButton icon="fa fa-person-running" className="text-red-500 hover:text-red-700" onClick={() => setOpenModal('sortie')} />
          </div>
        )
      }
    },
  ], []) as ColumnDef<Hospitalisation>[];
  

  const action = (
    <Link className="flex items-center justify-center py-2 h-10 px-4 bg-transparent text-sky-600 font-semibold border border-sky-600 rounded hover:bg-sky-400 hover:text-white hover:border-transparent transition ease-in duration-50 transform hover:-translate-y-1 active:translate-y-0" to="/nouvelle_hospitalisation">
      <i className="fa fa-plus" />
      <span className="ms-2">Nouvelle hospitalisation</span>
    </Link>
  );
  return (
    <Card title="Liste des  admis" subtitle="Une liste de tous les  admis" className="w-full" action={action}>
      <DataTable tableDefinition={tableDefinition} query={query} className="mt-2"/>
      
      <AjouterSoinsModal isOpen={openModal === "soin"} close={() => setOpenModal("")} selectedHospitalisation={selectedHospitalisation}/>
      <AjouterInterventionModal isOpen={openModal === "intervention"} close={() => setOpenModal("")} selectedHospitalisation={selectedHospitalisation}/>
      <AjouterRemarqueModal isOpen={openModal === "remarques"} close={() => setOpenModal("")} selectedHospitalisation={selectedHospitalisation} />
      <TransfertModal isOpen={openModal === "transfert"} close={() => setOpenModal("")} selectedHospitalisation={selectedHospitalisation} />
      <SortieModal isOpen={openModal === "sortie"} close={() => setOpenModal("")} selectedHospitalisation={selectedHospitalisation} />
    </Card>
  );
}

export default MesPatientsHospitalisesPage;
