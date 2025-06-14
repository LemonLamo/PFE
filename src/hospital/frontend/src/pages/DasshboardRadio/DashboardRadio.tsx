import { ColumnDef } from "@tanstack/react-table";
import Card from "../../components/UI/Card";
import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import DataTable from "../../components/UI/Tables/DataTable";
import moment from "moment";
import Button from "../../components/UI/Buttons/Button";
import { baseURL } from "../../config";
import axios from "axios";
import { status_badge } from "../../hooks/useRadios";
import LabelRadio from "./LabelRadio";
import JoindreResultatsRadio from "./JoindreResultatsRadio";
import Avatar from "../../components/Avatar";

function DashboardRadio() {
  const [openModal, setOpenModal] = useState("");
  const [selectedRadio, setSelectedRadio] = useState<Radio>({
    id: "",
    code_radio: "",
    date: new Date(),
    patient: {},
  });
  const query = useQuery<Radio[]>({
    queryKey: ["radios"],
    queryFn: async () => {
      const data = (await axios.get(`${baseURL}/api/radios?fait=0`)).data;
      return data;
    },
  });

  const tableDefinition = useMemo(
    () => [
      { header: "Code", accessorKey: "id" },
      {
        header: "Patient",
        id: "patient",
        cell: (info) => {
          const p = info.row.original;
          return (
            <div className="flex min-w-72">
              <Avatar src={`${baseURL}/api/patients/${p.patient.NIN}/avatar`} alt="profile_picture" className="rounded-full w-12 me-2"/>
              <div>
                <h6 className="mb-0">
                  {p.patient.nom} {p.patient.prenom}
                </h6>
                <p className="mb-0 font-semibold mt-[-0.4rem]">
                  NIN: {p.patient.NIN}
                </p>
              </div>
            </div>
          );
        },
      },
      { header: "Radio", accessorKey: "designation" },
      { header: "Demandé par", id: "medecin", cell: (info) => {
              const p = info.row.original;
              return <div className="flex min-w-72">
                  <Avatar src={`${baseURL}/api/personnel/${p.medecin?.NIN}/avatar`} alt="profile_picture" className="rounded-full w-12 me-2"/>
                  <div>
                      <h6 className="mb-0">{p.medecin?.nom} {p.medecin?.prenom}</h6>
                      <p className="mb-0 font-semibold mt-[-0.4rem]">Service: {p.service}</p>
                  </div>
              </div>
          }
      },
      { header: "Remarques", accessorKey: "remarques" },
      { header: "Date", id: "date", cell: (info) => moment(info.row.original.date).format("DD/MM/YYYY HH:mm") },
      { header: "Status", id: "status", cell: (info) => status_badge(info.row.original.date_fait) },
      { header: "", id: "actions",
        cell: (info) => {
          const radio = info.row.original;
          return <div className="flex justify-end gap-2">
            <Button onClick={() => { setSelectedRadio(radio); setOpenModal("label"); }} theme="success">Label</Button>
            <Button onClick={() => { setSelectedRadio(radio); setOpenModal("joindre"); }} theme="primary">Joindre</Button>
          </div>
        },
      },
    ],
    []
  ) as ColumnDef<Radio>[];

  return (
    <>
      <Card title="Mes radios" subtitle="Liste des radios à faire" className="w-full" >
        <DataTable tableDefinition={tableDefinition} query={query} className="mt-2"/>
        <LabelRadio isOpen={openModal === "label"} close={() => setOpenModal("")} selectedRadio={selectedRadio} />
        <JoindreResultatsRadio isOpen={openModal === "joindre"} close={() => {setOpenModal(""); query.refetch(); }} selectedRadio={selectedRadio} />
      </Card>
    </>
  );
}

export default DashboardRadio;
