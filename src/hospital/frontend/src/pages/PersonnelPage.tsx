import { useMemo, useState } from "react";
import moment from "moment";
import Card from "../components/UI/Card";
import CreateModal from "../components/Modals/CreateModal";
import ViewModal from "../components/Modals/ViewModal";
import EditModal from "../components/Modals/EditModal";
import DeleteModal from "../components/Modals/DeleteModal";
import { ColumnDef } from "@tanstack/react-table";
import ViewButton from "../components/Buttons/ViewButton";
import DeleteButton from "../components/Buttons/DeleteButton";
import EditButton from "../components/Buttons/EditButton";
import DataTable from "../components/UI/Tables/DataTable";
import { useQuery } from "@tanstack/react-query";
import Button from "../components/Buttons/Button";

function PersonnelPage() {
  const [selectedAgent, setSelectedAgent] = useState<Agent>({
    NIN: "",
    nom: "",
    prenom: "",
    date_naissance: null,
    lieu_naissance: "",
    sexe: "",
    email: "",
    telephone: "",
    fonction: "",
    grade: "",
    specialite: "",
    adresse: "",
    commune: "",
    code_postale: '',
    wilaya: "",
  });
  const [openModal, setOpenModal] = useState('');
  const query = useQuery({
    queryKey: ['agents'], 
    queryFn: () =>{
      let data = [
        {
          NIN: "100010364027390000",
          nom: "BRAHIM",
          prenom: "Abderrazak",
          date_naissance: new Date("2002-05-12"),
          lieu_naissance: "Tebessa",
          sexe: "Female",
          fonction: "Medécin",
          specialite: "Cardiologie",
          grade: "Chef de service",
          adresse: "39 HAI MOUHOUS",
          commune: "Bordj el kiffane",
          code_postale: 16001,
          wilaya: "Alger",
          email: "brahim.abderrazak1307@gmail.com",
          telephone: "0799771062",
          username: "abderrazak1307"
        },
        {
          NIN: "111111111111111111",
          nom: "NADIL",
          prenom: "Marwa",
          date_naissance: new Date("2001-07-13"),
          lieu_naissance: "Blida",
          sexe: "Male",
          fonction: "Medécin",
          specialite: "Cardiologie",
          grade: "Chef de service",
          adresse: "39 HAI MOUHOUS",
          commune: "Bordj el kiffane",
          code_postale: 16001,
          wilaya: "Alger",
          email: "nadilmarwa02@gmail.com",
          telephone: "0799771062",
          username: "marwa02"
        },
      ];
      return data;
    }
  })

  const tableDefinition = useMemo(() => [
    { header: "Profile", id: "profile", cell: (info) => {
        const p = info.row.original;
        return <div className="flex w-68">
          <img className="rounded-full w-12 me-2" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"></img>
          <div>
            <h6 className="mb-0">{p.nom} {p.prenom}</h6>
            <p className="mb-0 font-semibold mt-[-0.4rem]">NIN: {p.NIN}</p>
          </div>
        </div>
      }
    },
    { header: "Nom d'utilisateur", accessorKey: "username" },
    { header: "Fonction", accessorKey: "fonction" },
    { header: "Spécialité", accessorKey: "specialite" },
    { header: "Grade", accessorKey: "grade" },
    { header: "Email", accessorKey: "email" },
    { header: "Telephone", accessorKey: "telephone" },
    { header: "", id: "actions", cell: (info) => {
        const a = info.row.original
        return (
          <div className="flex justify-end gap-2">
            <ViewButton onClick={() => { setSelectedAgent(a); setOpenModal('view'); }} />
            <EditButton onClick={() => { setSelectedAgent(a); setOpenModal('edit'); }} />
            <DeleteButton onClick={() => { setSelectedAgent(a); setOpenModal('delete'); }} />
          </div>
        )
      }
    },
  ], []) as ColumnDef<Agent>[];

  async function createAgent() {
    console.log("Created " + selectedAgent);
  }

  async function editAgent() {
    console.log("Edited " + selectedAgent);
  }

  async function deleteAgent() {
    console.log("Deleted " + selectedAgent);
  }

  const action = (
    <Button onClick={()=>setOpenModal('create')} type="primary">
      <i className="fa fa-plus" />
      <span className="ms-2">Ajouter</span>
    </Button>
  );

  return (
    <>
      <Card title="Personnel" action={action} className="w-full">
        <DataTable tableDefinition={tableDefinition} query={query} className="mt-2" />

        <CreateModal open={openModal === "create"} action={createAgent} close={() => setOpenModal('')}>
          <h3 className="text-lg font-semibold leading-6 text-gray-900 mb-3" id="modal-title" >
            Créer agent
          </h3>
          <p className="text-gray-600">
            Veuillez remplir les informations nécessaires
          </p>
          <div className="grid grid-cols-12 gap-2">
            <div className="col-span-12">
              <label className="text-sm font-semibold">NIN</label>
              <input type="text" className="primary" placeholder="NIN" value={selectedAgent.NIN} onChange={(e) => setSelectedAgent({ ...selectedAgent, NIN: e.target.value })} />
            </div>
            <div className="col-span-6">
              <label className="text-sm font-semibold">Nom </label>
              <input type="text" className="primary" placeholder="Nom" value={selectedAgent.nom} onChange={(e) => setSelectedAgent({ ...selectedAgent, nom: e.target.value })} />
            </div>
            <div className="col-span-6">
              <label className="text-sm font-semibold">Prénom </label>
              <input type="text" className="primary" placeholder="Prenom" value={selectedAgent.prenom} onChange={(e) => setSelectedAgent({ ...selectedAgent, prenom: e.target.value })} />
            </div>
            <div className="col-span-6">
              <label className="text-sm font-semibold">Date de naissance </label>
              <input type="date" className="primary" placeholder="Date de naissance" value={moment(selectedAgent.date_naissance).format("YYYY-MM-DD")} onChange={(e) => setSelectedAgent({ ...selectedAgent, date_naissance: e.target.valueAsDate! })} />
            </div>
            <div className="col-span-6">
              <label className="text-sm font-semibold">Lieu de naissance </label>
              <input type="text" className="primary" placeholder="Lieu de naissance" value={selectedAgent.lieu_naissance} onChange={(e) => setSelectedAgent({ ...selectedAgent, lieu_naissance: e.target.value })} />
            </div>
            <div className="col-span-6">
              <label className="text-sm font-semibold">Sexe </label>
              <select onChange={(e) => setSelectedAgent({ ...selectedAgent, sexe: e.target.value })} >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div className="col-span-12">
              <label className="text-sm font-semibold">Email </label>
              <input type="email" className="primary" placeholder="Email" value={selectedAgent.email} onChange={(e) => setSelectedAgent({ ...selectedAgent, email: e.target.value, })} />
            </div>
            <div className="col-span-12">
              <label className="text-sm font-semibold">Numero de téléphone </label>
              <input type="tel" className="primary" placeholder="Numero de telephone" value={selectedAgent.telephone} onChange={(e) => setSelectedAgent({ ...selectedAgent, telephone: e.target.value, })} />
            </div>
          </div>
        </CreateModal>

        <ViewModal open={openModal === "view"} close={() => setOpenModal('')}>
          <h3 className="text-lg font-semibold leading-6 text-gray-900 mb-3" id="modal-title" >
            View agent
          </h3>
          <div className="grid grid-cols-12 gap-2">
            <div className="col-span-12">
              <label className="text-sm font-semibold">NIN</label>
              <input type="text" className="primary" placeholder="NIN" value={selectedAgent.NIN} onChange={(e) => setSelectedAgent({ ...selectedAgent, NIN: e.target.value })} />
            </div>
            <div className="col-span-6">
              <label className="text-sm font-semibold">Nom </label>
              <input type="text" className="primary" placeholder="Nom" value={selectedAgent.nom} onChange={(e) => setSelectedAgent({ ...selectedAgent, nom: e.target.value })} />
            </div>
            <div className="col-span-6">
              <label className="text-sm font-semibold">Prénom </label>
              <input type="text" className="primary" placeholder="Prenom" value={selectedAgent.prenom} onChange={(e) => setSelectedAgent({ ...selectedAgent, prenom: e.target.value })} />
            </div>
            <div className="col-span-6">
              <label className="text-sm font-semibold">Date de naissance </label>
              <input type="date" className="primary" placeholder="Date de naissance" value={moment(selectedAgent.date_naissance).format('YYYY-MM-DD')} onChange={(e) => setSelectedAgent({ ...selectedAgent, date_naissance: e.target.valueAsDate! })} />
            </div>
            <div className="col-span-6">
              <label className="text-sm font-semibold">Lieu de naissance </label>
              <input type="text" className="primary" placeholder="Lieu de naissance" value={selectedAgent.lieu_naissance} onChange={(e) => setSelectedAgent({ ...selectedAgent, lieu_naissance: e.target.value })} />
            </div>
            <div className="col-span-6">
              <label className="text-sm font-semibold">Sexe </label>
              <select onChange={(e) => setSelectedAgent({ ...selectedAgent, sexe: e.target.value })} >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div className="col-span-12">
              <label className="text-sm font-semibold">Email </label>
              <input type="email" className="primary" placeholder="Email" value={selectedAgent.email} onChange={(e) => setSelectedAgent({ ...selectedAgent, email: e.target.value, })} />
            </div>
            <div className="col-span-12">
              <label className="text-sm font-semibold">Numero de téléphone </label>
              <input type="tel" className="primary" placeholder="Numero de telephone" value={selectedAgent.telephone} onChange={(e) => setSelectedAgent({ ...selectedAgent, telephone: e.target.value, })} />
            </div>
          </div>
        </ViewModal>

        <EditModal open={openModal === "edit"} action={editAgent} close={() => setOpenModal('')}>
          <h3 className="text-lg font-semibold leading-6 text-gray-900 mb-3" id="modal-title" >
            Modifier agent
          </h3>
          <p className="text-gray-600">
            Veuillez changer les informations que vous désirez
          </p>
          <div className="grid grid-cols-12 gap-2">
            <div className="col-span-12">
              <label className="text-sm font-semibold">NIN</label>
              <input type="text" className="primary" placeholder="NIN" value={selectedAgent.NIN} onChange={(e) => setSelectedAgent({ ...selectedAgent, NIN: e.target.value })} />
            </div>
            <div className="col-span-6">
              <label className="text-sm font-semibold">Nom </label>
              <input type="text" className="primary" placeholder="Nom" value={selectedAgent.nom} onChange={(e) => setSelectedAgent({ ...selectedAgent, nom: e.target.value })} />
            </div>
            <div className="col-span-6">
              <label className="text-sm font-semibold">Prénom </label>
              <input type="text" className="primary" placeholder="Prenom" value={selectedAgent.prenom} onChange={(e) => setSelectedAgent({ ...selectedAgent, prenom: e.target.value })} />
            </div>
            <div className="col-span-6">
              <label className="text-sm font-semibold">Date de naissance </label>
              <input type="date" className="primary" placeholder="Date de naissance" value={moment(selectedAgent.date_naissance).format('YYYY-MM-DD')} onChange={(e) => setSelectedAgent({ ...selectedAgent, date_naissance: e.target.valueAsDate! })} />
            </div>
            <div className="col-span-6">
              <label className="text-sm font-semibold">Lieu de naissance </label>
              <input type="text" className="primary" placeholder="Lieu de naissance" value={selectedAgent.lieu_naissance} onChange={(e) => setSelectedAgent({ ...selectedAgent, lieu_naissance: e.target.value })} />
            </div>
            <div className="col-span-6">
              <label className="text-sm font-semibold">Sexe </label>
              <select onChange={(e) => setSelectedAgent({ ...selectedAgent, sexe: e.target.value })} >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div className="col-span-12">
              <label className="text-sm font-semibold">Email </label>
              <input type="email" className="primary" placeholder="Email" value={selectedAgent.email} onChange={(e) => setSelectedAgent({ ...selectedAgent, email: e.target.value, })} />
            </div>
            <div className="col-span-12">
              <label className="text-sm font-semibold">Numero de téléphone </label>
              <input type="tel" className="primary" placeholder="Numero de telephone" value={selectedAgent.telephone} onChange={(e) => setSelectedAgent({ ...selectedAgent, telephone: e.target.value, })} />
            </div>
          </div>
        </EditModal>

        <DeleteModal open={openModal === "delete"} action={deleteAgent} close={() => setOpenModal('')}>
          <h3 className="text-lg font-semibold leading-6 text-gray-900 mb-3" id="modal-title" >
            Supprimer l'agent "{selectedAgent.nom} {selectedAgent.prenom}"
          </h3>
          <p className="text-gray-600">Êtes-vous sûr de vouloir supprimer cet enregistrement? Toutes vos données seront définitivement supprimées. Cette action ne peut pas être annulée.</p>
        </DeleteModal>
      </Card>
    </>
  );
}

export default PersonnelPage;
