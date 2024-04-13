import { Fragment, useMemo, useState } from "react";
import moment from "moment";
import Card from "../../components/UI/Card";
import { Link } from "react-router-dom";
import { ColumnDef } from "@tanstack/react-table";
import { useQuery } from "@tanstack/react-query";
import DataTable from "../../components/UI/Tables/DataTable";
import axios from "axios";
import { baseURL } from "../../config";
import AjouterSoinsModal from "./AjouterSoinsModal";
import AjouterInterventionModal from "./AjouterInterventionModal";
import AjouterRemarqueModal from "./AjouterRemarqueModal";
import TransfertModal from "./TransfertModal";
import SortieModal from "./SortieModal";
import { createSoin } from "../../hooks/useSoins";
import { ajouterRemarque, ajouterSortie } from "../../hooks/useHospitalisations";
import { ajouterTransfert } from "../../hooks/useTransferts";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import DetailsHospitalisation from "../PatientPage/Modals/DetailsHospitalisation";

function MesPatientsHospitalisesPage() {
  const [selectedHospitalisation, setSelectedHospitalisation] = useState<Hospitalisation>({
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
      const data = (await axios.get(`${baseURL}/api/hospitalisations?active=1`)).data;
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
    { header: "Résumé d'hospitalisation", cell: (info) => <div className="whitespace-pre-wrap" >{info.row.original.resume_hospitalisation}</div>},
    { header: "", id: "actions", cell: (info) => {
        const h = info.row.original
        return (
        <>
           <Menu>
            <Menu.Button className="flex w-34 w-full items-center justify-between rounded-md bg-cyan-400 px-4 py-2 text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 font-semibold">
              Actions
              <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5 text-white" aria-hidden="true"/>
            </Menu.Button>
            <div className="relative">
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95">
                <Menu.Items className="fixed w-full divide-y divide-gray-100 rounded-b-sm bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                  <div className="">
                    <Menu.Item>
                      {({ active }) => (
                        <button onClick={() => {setSelectedHospitalisation(h);setOpenModal("hospitalisation");}} className={`${active ? 'bg-cyan-400 text-white' : 'text-gray-900'} group flex w-full items-center px-2 py-2 text-sm`}>
                          <i className="w-5 text-xl mr-2" >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" ></path>
                            </svg>
                          </i> Détails
                        </button>)}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <Link to={`/patients/${h.patient.NIN}`}className={`${active ? 'bg-cyan-400 text-white' : 'text-gray-900'} group flex w-full items-center px-2 py-2 text-sm`}>
                          <i className="fa fa-folder w-4 mr-2" /> Dossier
                        </Link>)}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button className={`${active ? 'bg-cyan-400 text-white' : 'text-gray-900'} group flex w-full items-center px-2 py-2 text-sm`} onClick={() => {setSelectedHospitalisation(h); setOpenModal('soin')}}>
                          <i className="fa fa-briefcase-medical w-4 mr-2" /> Soin
                        </button>)}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button className={`${active ? 'bg-cyan-400 text-white' : 'text-gray-900'} group flex w-full items-center px-2 py-2 text-sm`} onClick={() => {setSelectedHospitalisation(h); setOpenModal('remarques')}}>
                          <i className="fa fa-edit w-4 mr-2" /> Remarques
                        </button>)}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button className={`${active ? 'bg-cyan-400 text-white' : 'text-gray-900'} group flex w-full items-center px-2 py-2 text-sm`} onClick={() => {setSelectedHospitalisation(h); setOpenModal('transfert')}}>
                          <i className="fa fa-truck-medical w-4 mr-2" /> Transfert
                        </button>)}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button className={`${active ? 'bg-cyan-400 text-white' : 'text-gray-900'} group flex w-full items-center px-2 py-2 text-sm`} onClick={() => {setSelectedHospitalisation(h); setOpenModal('sortie')}}>
                          <i className="fa fa-person-running w-4 mr-2" /> Sortie
                        </button>)}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </div>
          </Menu>
        </>)
      }
    },
  ], []) as ColumnDef<Hospitalisation>[];
  

  const action = (
    <Link className="flex items-center justify-center py-2 h-10 px-4 bg-transparent text-sky-600 font-semibold border border-sky-600 rounded hover:bg-sky-400 hover:text-white hover:border-transparent transition ease-in duration-50 transform hover:-translate-y-1 active:translate-y-0" to="/hospitalisations/new">
      <i className="fa fa-plus" />
      <span className="ms-2">Nouvelle hospitalisation</span>
    </Link>
  );
  return (
    <Card title="Liste des  admis" subtitle="Une liste de tous les  admis" className="w-full" action={action}>
      <DataTable tableDefinition={tableDefinition} query={query} className="mt-2"/>
      
      {selectedHospitalisation ? <DetailsHospitalisation isOpen={openModal === "hospitalisation"} close={() => setOpenModal("")} selectedHospitalisation={selectedHospitalisation!} /> : null}
      <AjouterSoinsModal isOpen={openModal === "soin"} close={() => setOpenModal("")} selectedHospitalisation={selectedHospitalisation} action={createSoin} />
      <AjouterInterventionModal isOpen={openModal === "intervention"} close={() => setOpenModal("")} selectedHospitalisation={selectedHospitalisation}/>
      <AjouterRemarqueModal isOpen={openModal === "remarques"} close={() => setOpenModal("")} selectedHospitalisation={selectedHospitalisation} action={ajouterRemarque}/>
      <TransfertModal isOpen={openModal === "transfert"} close={() => setOpenModal("")} selectedHospitalisation={selectedHospitalisation} action={ajouterTransfert}/>
      <SortieModal isOpen={openModal === "sortie"} close={() => setOpenModal("")} selectedHospitalisation={selectedHospitalisation} action={ajouterSortie}/>
    </Card>
  );
}

export default MesPatientsHospitalisesPage;
