import { useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import axios from "axios";
import { useMemo, useState } from "react";
import DataTable from "../UI/Tables/DataTable";
import moment from "moment";
import { baseURL } from "../../hooks";
import Button from "../Buttons/Button";
import Card from "../UI/Card";
import CreateModal from "../Modals/CreateModal";
type Props = {
  NIN: string;
};

function TabVaccinations({ NIN }: Props) {
  const [selectedVaccination, setSelectedVaccination] = useState<Vaccination>({
    code_vaccin: "",
    intitule_vaccin: "",
    date: "",
    remarques: "",
    nombre_de_doses: 0,
    date_de_prochaine_dose: "",
  });
  const [openModal, setOpenModal] = useState("");
  const vaccinations = useQuery<Vaccination[]>({
    queryKey: ["vaccinations" + NIN],
    queryFn: async () => {
      const data = (
        await axios.get(`${baseURL}/api/patients/${NIN}/vaccinations`)
      ).data;
      return data;
    },
  });
  const vaccinationsTableDefinition = useMemo(
    () => [
      { header: "#", id: "index", cell: (info) => info.row.index + 1 },
      { header: "Code", accessorKey: "code_vaccin" },
      { header: "Nom", accessorKey: "nom_vaccin" },
      {
        header: "Date",
        id: "date",
        cell: (info) =>
          moment(info.row.original.date).format("DD/MM/YYYY HH:mm"),
      },
      { header: "Remarques", accessorKey: "remarques" },
      { header: "Nombre de doses", accessorKey: "nombre_de_doses" },
      {
        header: "Prochaine dose",
        id: "date_de_prochaine_dose",
        cell: (info) =>
          moment(info.row.original.date_de_prochaine_dose).format(
            "DD/MM/YYYY HH:mm"
          ),
      },
    ],
    []
  ) as ColumnDef<Vaccination>[];
  async function createVaccination() {}
  const action = (
    <Button
      onClick={() => {
        setSelectedVaccination({
          code_vaccin: "",
          intitule_vaccin: "",
          date: "",
          remarques: "",
          nombre_de_doses: 0,
          date_de_prochaine_dose: "",
        });
        setOpenModal("create");
      }}
      type="primary"
    >
      <i className="fa fa-plus" />
      <span className="ms-2">Ajouter</span>
    </Button>
  );
  return (
    <>
      <h3 className="text-lg mb-0">Vaccinations</h3>
      <p className="mb-4">
        This is some placeholder content the Profile tab's associated content,
        clicking another tab will toggle the visibility of this one for the
        next.
      </p>
      <Card title="Vaccinations" action={action} className="w-full">
        <DataTable
          tableDefinition={vaccinationsTableDefinition}
          query={vaccinations}
          className="mt-2"
        />

        <CreateModal
          open={openModal === "create"}
          action={createVaccination}
          close={() => {
            setSelectedVaccination({
              code_vaccin: "",
              intitule_vaccin: "",
              date: "",
              remarques: "",
              nombre_de_doses: 0,
              date_de_prochaine_dose: "",
            });
            setOpenModal("");
          }}
        >
          <h3
            className="text-lg font-semibold leading-6 text-gray-900 mb-3"
            id="modal-title"
          >
            Ajouter une maladie chronique
          </h3>
          <p className="text-gray-600">
            Remplissez ce formulaire pour ajouter une nouvelle maladie chronique
          </p>
          <div className="grid grid-cols-8 gap-2">
            <div className="col-span-8">
              <label className="text-sm font-semibold">ID</label>
              <input
                type="number"
                className="primary"
                placeholder="id"
                min="0"
                value={selectedVaccination.id}
                onChange={(e) =>
                  setSelectedVaccination({
                    ...selectedVaccination,
                    id: e.target.value,
                  })
                }
              />
            </div>
            <div className="col-span-4">
              <label className="text-sm font-semibold">Code</label>
              <input
                type="text"
                className="primary"
                placeholder="code"
                value={selectedVaccination.code_vaccin}
                onChange={(e) =>
                  setSelectedVaccination({
                    ...selectedVaccination,
                    code_vaccin: e.target.value,
                  })
                }
              />
            </div>
            <div className="col-span-4">
              <label className="text-sm font-semibold">Nombre de doses</label>
              <input
                type="number"
                className="primary"
                placeholder="nombre de dose"
                min="0"
                value={selectedVaccination.nombre_de_doses}
                onChange={(e) =>
                  setSelectedVaccination({
                    ...selectedVaccination,
                    nombre_de_doses: e.target.value,
                  })
                }
              />
            </div>
            <div className="col-span-4">
              <label className="text-sm font-semibold">
                Date de diagnostic
              </label>
              <input
                type="Date"
                className="primary"
                placeholder="date"
                value={selectedVaccination.date}
                onChange={(e) =>
                  setSelectedVaccination({
                    ...selectedVaccination,
                    date: e.target.value,
                  })
                }
              />
            </div>
            <div className="col-span-4">
              <label className="text-sm font-semibold">
                Date de prochaine dose
              </label>
              <input
                type="Date"
                className="primary"
                placeholder="date"
                value={selectedVaccination.date_de_prochaine_dose}
                onChange={(e) =>
                  setSelectedVaccination({
                    ...selectedVaccination,
                    date_de_prochaine_dose: e.target.value,
                  })
                }
              />
            </div>
            <div className="col-span-8">
              <label className="text-sm font-semibold">Remarques</label>
              <input
                type="text"
                className="primary"
                placeholder="remarques"
                value={selectedVaccination.remarques}
                onChange={(e) =>
                  setSelectedVaccination({
                    ...selectedVaccination,
                    remarques: e.target.value,
                  })
                }
              />
            </div>
          </div>
        </CreateModal>
      </Card>
    </>
  );
}

export default TabVaccinations;
