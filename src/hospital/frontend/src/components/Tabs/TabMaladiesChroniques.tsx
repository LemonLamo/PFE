import { useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import axios from "axios";
import { useMemo, useState } from "react";
import DataTable from "../UI/Tables/DataTable";
import moment from "moment";
import { baseURL } from "../../hooks";
import CreateModal from "../Modals/CreateModal";
import Button from "../Buttons/Button";
import Card from "../UI/Card";
type Props = {
  NIN: string;
};

function TabMaladiesChroniques({ NIN }: Props) {
  const [selectedMaladieChro, setSelectedMaladieChro] = useState<MaladieChro>({
    id: 0,
    code: "",
    intitule: "",
    date_diagnostic: "",
    remarque: "",
  });
  const [openModal, setOpenModal] = useState("");
  const maladies_chroniques = useQuery<any>({
    queryKey: ["maladies_chroniques" + NIN],
    queryFn: async () => {
      const data = (
        await axios.get(`${baseURL}/api/patients/${NIN}/maladies-chroniques`)
      ).data;
      return data;
    },
  });
  const maladies_chroniquesTableDefinition = useMemo(
    () => [
      { header: "id", id: "index", cell: (info) => info.row.index + 1 },
      { header: "Code", accessorKey: "code_maladie" },
      { header: "Intitulé", accessorKey: "nom_maladie" },
      {
        header: "Date de diagnostic",
        id: "date_diagonstic",
        cell: (info) =>
          moment(info.row.original.date_diagnostic).format("DD/MM/YYYY"),
      },
      { header: "Remarques", accessorKey: "remarques" },
    ],
    []
  ) as ColumnDef<any>[];
  async function createMaladieChro() {}
  const action = (
    <Button
      onClick={() => {
        setSelectedMaladieChro({
          id: 0,
          code: "",
          intitule: "",
          date_diagnostic: "",
          remarque: "",
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
      <h3 className="text-lg mb-0">Maladies chroniques</h3>
      <p className="mb-4">
        This is some placeholder content the Profile tab's associated content,
        clicking another tab will toggle the visibility of this one for the
        next.
      </p>

      <Card title="Maladie Chronique" action={action} className="w-full">
        <DataTable
          tableDefinition={maladies_chroniquesTableDefinition}
          query={maladies_chroniques}
          className="mt-2"
        />

        <CreateModal
          open={openModal === "create"}
          action={createMaladieChro}
          close={() => {
            setSelectedMaladieChro({
              id: 0,
              code: "",
              intitule: "",
              date_diagnostic: "",
              remarque: "",
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
                value={selectedMaladieChro.id}
                onChange={(e) =>
                  setSelectedMaladieChro({
                    ...selectedMaladieChro,
                    id: e.target.valueAsNumber,
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
                value={selectedMaladieChro.code}
                onChange={(e) =>
                  setSelectedMaladieChro({
                    ...selectedMaladieChro,
                    code: e.target.value,
                  })
                }
              />
            </div>
            <div className="col-span-4">
              <label className="text-sm font-semibold">Intitulé</label>
              <input
                type="text"
                className="primary"
                placeholder="Intitulé"
                value={selectedMaladieChro.intitule}
                onChange={(e) =>
                  setSelectedMaladieChro({
                    ...selectedMaladieChro,
                    intitule: e.target.value,
                  })
                }
              />
            </div>
            <div className="col-span-8">
              <label className="text-sm font-semibold">
                Date de diagnostic
              </label>
              <input
                type="Date"
                className="primary"
                placeholder="date"
                value={selectedMaladieChro.date_diagnostic}
                onChange={(e) =>
                  setSelectedMaladieChro({
                    ...selectedMaladieChro,
                    date_diagnostic: e.target.value,
                  })
                }
              />
            </div>
            <div className="col-span-8">
              <label className="text-sm font-semibold">Remarques</label>
              <input
                type="text"
                className="primary"
                placeholder="remarque"
                value={selectedMaladieChro.remarque}
                onChange={(e) =>
                  setSelectedMaladieChro({
                    ...selectedMaladieChro,
                    remarque: e.target.value,
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

export default TabMaladiesChroniques;
