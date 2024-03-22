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

function TabAntecedentsFamiliaux({ NIN }: Props) {
  const [selectedAntecedentFamilial, setSelectedAntecedentFamilial] =
    useState<AntecedentFamilial>({
      id: 0,
      description: "",
      remarques: "",
    });
  const [openModal, setOpenModal] = useState("");
  const antecedents_familiaux = useQuery<AntecedentFamilial[]>({
    queryKey: ["antecedents_familiaux" + NIN],
    queryFn: async () => {
      const data = (
        await axios.get(`${baseURL}/api/patients/${NIN}/antecedents-familiaux`)
      ).data;
      return data;
    },
  });
  const antecedents_familiauxTableDefinition = useMemo(
    () => [
      { header: "#", id: "index", cell: (info) => info.row.index + 1 },
      { header: "Description", accessorKey: "description" },
      { header: "Remarques", accessorKey: "remarques" },
    ],
    []
  ) as ColumnDef<AntecedentFamilial>[];
  async function createAntecedentFamilial() {}
  const action = (
    <Button
      onClick={() => {
        setSelectedAntecedentFamilial({
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
      <h3 className="text-lg mb-0">Antécédents Familiaux</h3>
      <p className="mb-4">
        This is some placeholder content the Profile tab's associated content,
        clicking another tab will toggle the visibility of this one for the
        next.
      </p>
      <Card title="Antécédents Familiaux" action={action} className="w-full">
        <DataTable
          tableDefinition={antecedents_familiauxTableDefinition}
          query={antecedents_familiaux}
          className="mt-2"
        />
        <CreateModal
          open={openModal === "create"}
          action={createAntecedentFamilial}
          close={() => {
            setSelectedAntecedentFamilial({
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
            Ajouter un antécédent familiale
          </h3>
          <p className="text-gray-600">
            Remplissez ce formulaire pour ajouter un antécédent familiale
          </p>
          <div className="grid grid-cols-8 gap-2">
            <div className="col-span-8">
              <label className="text-sm font-semibold">ID</label>
              <input
                type="number"
                className="primary"
                placeholder="id"
                min="0"
                value={selectedAntecedentFamilial.id}
                onChange={(e) =>
                  setSelectedAntecedentFamilial({
                    ...selectedAntecedentFamilial,
                    id: e.target.valueAsNumber,
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
                value={selectedAntecedentFamilial.description}
                onChange={(e) =>
                  setSelectedAntecedentFamilial({
                    ...selectedAntecedentFamilial,
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
                value={selectedAntecedentFamilial.remarques}
                onChange={(e) =>
                  setSelectedAntecedentFamilial({
                    ...selectedAntecedentFamilial,
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

export default TabAntecedentsFamiliaux;
