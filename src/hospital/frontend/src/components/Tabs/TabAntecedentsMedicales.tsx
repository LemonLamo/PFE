import { useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import axios from "axios";
import { useMemo, useState } from "react";
import DataTable from "../UI/Tables/DataTable";
import { baseURL } from "../../hooks";
import Button from "../Buttons/Button";
import Card from "../UI/Card";
import CreateModal from "../Modals/CreateModal";
type Props = {
  NIN: string;
};

function TabAntecedentsMedicales({ NIN }: Props) {
  const [selectedAntecedentMedicale, setSelectedAntecedentMedicale] =
    useState<AntecedentMedicale>({
      id: 0,
      description: "",
      remarques: "",
    });
  const [openModal, setOpenModal] = useState("");
  const antecedents_medicales = useQuery<AntecedentMedicale[]>({
    queryKey: ["antecedents_medicales" + NIN],
    queryFn: async () => {
      const data = (
        await axios.get(`${baseURL}/api/patients/${NIN}/antecedents-medicals`)
      ).data;
      return data;
    },
  });
  const antecedents_medicalesTableDefinition = useMemo(
    () => [
      { header: "#", id: "index", cell: (info) => info.row.index + 1 },
      { header: "Description", accessorKey: "description" },
      { header: "Remarques", accessorKey: "remarques" },
    ],
    []
  ) as ColumnDef<AntecedentMedicale>[];
  async function createAntecedentMedicale() {}
  const action = (
    <Button
      onClick={() => {
        setSelectedAntecedentMedicale({
          id: 0,
          description: "",
          remarques: "",
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
      <h3 className="text-lg mb-0">Antécédents Médicales</h3>
      <p className="mb-4">
        This is some placeholder content the Profile tab's associated content,
        clicking another tab will toggle the visibility of this one for the
        next.
      </p>
      <Card title="Antécédents Médicales" action={action} className="w-full">
        <DataTable
          tableDefinition={antecedents_medicalesTableDefinition}
          query={antecedents_medicales}
          className="mt-2"
        />
        <CreateModal
          open={openModal === "create"}
          action={createAntecedentMedicale}
          close={() => {
            setSelectedAntecedentMedicale({
              id: 0,
              description: "",
              remarques: "",
            });
            setOpenModal("");
          }}
        >
          <h3
            className="text-lg font-semibold leading-6 text-gray-900 mb-3"
            id="modal-title"
          >
            Ajouter un antécédent médicale
          </h3>
          <p className="text-gray-600">
            Remplissez ce formulaire pour ajouter un antécédent médicale
          </p>
          <div className="grid grid-cols-8 gap-2">
            <div className="col-span-8">
              <label className="text-sm font-semibold">ID</label>
              <input
                type="number"
                className="primary"
                placeholder="id"
                min="0"
                value={selectedAntecedentMedicale.id}
                onChange={(e) =>
                  setSelectedAntecedentMedicale({
                    ...selectedAntecedentMedicale,
                    id: e.target.value,
                  })
                }
              />
            </div>
            <div className="col-span-8">
              <label className="text-sm font-semibold">Description</label>
              <input
                type="text"
                className="primary"
                placeholder="description"
                value={selectedAntecedentMedicale.description}
                onChange={(e) =>
                  setSelectedAntecedentMedicale({
                    ...selectedAntecedentMedicale,
                    description: e.target.value,
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
                value={selectedAntecedentMedicale.remarques}
                onChange={(e) =>
                  setSelectedAntecedentMedicale({
                    ...selectedAntecedentMedicale,
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

export default TabAntecedentsMedicales;
