import { useMemo, useState } from "react";
import Card from "../../components/UI/Card";
import { ColumnDef } from "@tanstack/react-table";
import ViewButton from "../../components/UI/Buttons/ViewButton";
import DeleteButton from "../../components/UI/Buttons/DeleteButton";
import EditButton from "../../components/UI/Buttons/EditButton";
import DataTable from "../../components/UI/Tables/DataTable";
import { useQuery } from "@tanstack/react-query";
import Button from "../../components/UI/Buttons/Button";
import axios from "axios";
import { baseURL } from "../../config";
import CreatePersonnelModal from "./CreatePersonnelModal";
import ViewPersonnelModal from "./ViewPersonnelModal";
import EditPersonnelModal from "./EditPersonnelModal";
import DeletePersonnelModal from "./DeletePersonnelModal";

function PersonnelPage() {
  const [selectedPersonnel, setSelectedPersonnel] = useState<Personnel>({NIN: "", nom: "", prenom: "", date_de_naissance: new Date(), lieu_de_naissance: "", sexe: "", email: "", telephone: "", fonction: "", specialite: "", grade: "", adresse: "", code_postale: 0, commune: "", wilaya: "", hopital: "", service: "", });
  const [openModal, setOpenModal] = useState("");
  const query = useQuery({
    queryKey: ["personnel"],
    queryFn: async () => {
      let data = (await axios.get(`${baseURL}/api/personnel`)).data;
      return data;
    },
  });

  const tableDefinition = useMemo(
    () => [
      { header: "Profile", id: "profile", cell: (info) => {
          const p = info.row.original;
          return (
            <div className="flex w-68">
              <img
                className="rounded-full w-12 me-2"
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              />
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
      { header: "Service", accessorKey: "service" },
      { header: "Fonction", accessorKey: "fonction" },
      { header: "Spécialité", accessorKey: "specialite" },
      { header: "Grade", accessorKey: "grade" },
      { header: "Email", accessorKey: "email" },
      { header: "Telephone", accessorKey: "telephone" },
      { header: "", id: "actions", cell: (info) => {
          const a = info.row.original;
          return (
            <div className="flex justify-end gap-2">
              <ViewButton onClick={() => { setSelectedPersonnel(a); setOpenModal("view"); }} />
              <EditButton onClick={() => { setSelectedPersonnel(a); setOpenModal("edit"); }} />
              <DeleteButton onClick={() => { setSelectedPersonnel(a); setOpenModal("delete"); }}/>
            </div>
          );
        },
      },
    ],
    []
  ) as ColumnDef<Personnel>[];

  const action = (
    <Button onClick={() => setOpenModal("create")} theme="primary">
      <i className="fa fa-plus" />
      <span className="ms-2">Ajouter</span>
    </Button>
  );

  return (
    <>
      <Card title="Personnel" action={action} className="w-full">
        <DataTable tableDefinition={tableDefinition} query={query} className="mt-2" />
        <CreatePersonnelModal isOpen={openModal==="create"} close={() => setOpenModal("")} />
        <ViewPersonnelModal isOpen={openModal==="view"} close={() => setOpenModal("")} selectedPersonnel={selectedPersonnel}/>
        <EditPersonnelModal isOpen={openModal==="edit"} close={() => setOpenModal("")} selectedPersonnel={selectedPersonnel}/>
        <DeletePersonnelModal isOpen={openModal==="delete"} close={() => setOpenModal("")} selectedPersonnel={selectedPersonnel}/>
      </Card>
    </>
  );
}

export default PersonnelPage;
