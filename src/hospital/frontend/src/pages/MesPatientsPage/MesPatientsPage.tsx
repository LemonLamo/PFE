import { Fragment, useContext, useMemo, useState } from "react";
import moment from "moment";
import Card from "../../components/UI/Card";
import { Link } from "react-router-dom";
import { ColumnDef } from "@tanstack/react-table";
import { useQuery } from "@tanstack/react-query";
import DataTable from "../../components/UI/Tables/DataTable";
import axios from "axios";
import { baseURL } from "../../config";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import AjouterRendezVous from "./AjouterRendezVous";
import Avatar from "../../components/Avatar";
import AuthContext from "../../hooks/AuthContext";

const createModal = (
  <>
    <Link className="flex items-center justify-center py-2 h-10 px-4 bg-transparent text-sky-600 font-semibold border border-sky-600 rounded hover:bg-sky-400 hover:text-white hover:border-transparent transition ease-in duration-50 transform hover:-translate-y-1 active:translate-y-0" to="/consultations/new">
      <i className="fa fa-plus" />
      <span className="ms-2">Nouvelle consultation</span>
    </Link>
  </>
);

function MesPatientsPage() {
  const auth = useContext(AuthContext);
  const [selectedPatient, setSelectedPatient] = useState<Partial<Patient>>({
    NIN: "",
    nom: "",
    prenom: ""
  });
  const [openModal, setOpenModal] = useState("");
  const query = useQuery({
    queryKey: ["patients"],
    queryFn: async () => {
      const reception = (await axios.get(`${baseURL}/api/reception?service=${auth?.service}&medecin=${auth?.NIN}`)).data;
      const NINs = reception.map((x : any) => x.patient);

      if(NINs.length > 0){
        const data = (await axios.post(`${baseURL}/api/patients/bulk-select`, {NINs: NINs})).data;
        return data;
      }else
        return [];
    },
  });

  const tableDefinition = useMemo(
    () => [
      { header: "Patient", id: "patient", cell: (info) => {
          const p = info.row.original;
          return (
            <div className="flex min-w-72">
              <Avatar src={`${baseURL}/api/patients/${p.NIN}/avatar`} alt="profile_picture" className="rounded-full w-12 me-2"/>
              <div>
                <h6 className="mb-0">
                  {p.nom} {p.prenom}
                </h6>
                <p className="mb-0 font-semibold mt-[-0.4rem]">NIN: {p.NIN}</p>
              </div>
            </div>
          );
        },
      },
      { header: "Sexe", accessorKey: "sexe" },
      { header: "Date et lieu de naissance", id: "date_lieu_naissance",cell: (info) => (<> {moment(info.row.original.date_de_naissance).format("DD/MM/YYYY")}, {info.row.original.lieu_de_naissance}</>) },
      { header: "Email", accessorKey: "email" },
      { header: "Telephone", accessorKey: "telephone" },
      { header: "", id: "actions", cell: (info) => {
          const a = info.row.original;
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
                          <Link to={`/patients/${a.NIN}`}className={`${active ? 'bg-cyan-400 text-white' : 'text-gray-900'} group flex w-full items-center px-2 py-2 text-sm`}>
                            <i className="fa fa-folder w-4 mr-2" /> Dossier
                          </Link>)}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link to="/consultations/new" className={`${active ? 'bg-cyan-400 text-white' : 'text-gray-900'} group flex w-full items-center px-2 py-2 text-sm`} state={info.row.original.NIN}>
                            <i className="fa fa-folder-plus w-4 mr-2" /> Consultation
                          </Link>)}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link to="/hospitalisations/new" className={`${active ? 'bg-cyan-400 text-white' : 'text-gray-900'} group flex w-full items-center px-2 py-2 text-sm`} state={info.row.original.NIN}>
                            <i className="fa fa-bed-pulse w-4 mr-2" /> Hospitalisation
                          </Link>)}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link to="/interventions/new" className={`${active ? 'bg-cyan-400 text-white' : 'text-gray-900'} group flex w-full items-center px-2 py-2 text-sm`} state={info.row.original.NIN}>
                            <i className="fa fa-syringe w-4 mr-2" /> Intervention
                          </Link>)}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button className={`${active ? 'bg-cyan-400 text-white' : 'text-gray-900'} group flex w-full items-center px-2 py-2 text-sm`} onClick={() => {setSelectedPatient(a); setOpenModal('rendez-vous')}}>
                            <i className="fa fa-calendar w-4 mr-2" /> Rendez vous
                          </button>)}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </div>
            </Menu>
          </>);
        },
      },
    ],
    []
  ) as ColumnDef<Partial<Patient>>[];

  return (
    <Card title="Liste des patients en attente" subtitle="Une liste des patients présents pour la consultation d'aujourd'hui" className="w-full" action={createModal}>
      <DataTable tableDefinition={tableDefinition} query={query} className="mt-2" />
      <AjouterRendezVous isOpen={openModal==="rendez-vous"} close={()=>setOpenModal("")} selectedPatient={selectedPatient} />
    </Card>
  );
}

export default MesPatientsPage;
