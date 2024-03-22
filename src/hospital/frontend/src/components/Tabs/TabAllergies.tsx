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

function TabAllergies({ NIN }: Props) {
  const [selectedAllergie, setSelectedAllergie] = useState<Allergie>({
    id: 0,
    code_allergene: "",
    date: "",
    remarques: "",
  });
  const [openModal, setOpenModal] = useState("");
  const allergies = useQuery<Allergie[]>({
    queryKey: ["allergies" + NIN],
    queryFn: async () => {
      const data = (await axios.get(`${baseURL}/api/patients/${NIN}/allergies`))
        .data;
      return data;
    },
  });

  const allergiesTableDefinition = useMemo(
    () => [
      { header: "#", id: "index", cell: (info) => info.row.index + 1 },
      { header: "Code", accessorKey: "code_allergene" },
      {
        header: "Date",
        id: "date",
        cell: (info) =>
          moment(info.row.original.date).format("DD/MM/YYYY HH:mm"),
      },
      { header: "Remarques", accessorKey: "remarques" },
    ],
    []
  ) as ColumnDef<Allergie>[];
  async function createAllergie() {}
  const action = (
    <Button
      onClick={() => {
        setSelectedAllergie({
          id: 0,
          code_allergene: "",
          date: "",
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
      <h3 className="text-lg mb-0">Allergies</h3>
      <p className="mb-4">
        This is some placeholder content the Profile tab's associated content,
        clicking another tab will toggle the visibility of this one for the
        next.
      </p>
      <Card title="Allergies" action={action} className="w-full">
        <DataTable
          tableDefinition={allergiesTableDefinition}
          query={allergies}
          className="mt-2"
        />
        <CreateModal
          open={openModal === "create"}
          action={createAllergie}
          close={() => {
            setSelectedAllergie({
              id: 0,
              code_allergene: "",
              date: "",
              remarques: "",
            });
            setOpenModal("");
          }}
        >
          <h3
            className="text-lg font-semibold leading-6 text-gray-900 mb-3"
            id="modal-title"
          >
            Ajouter une allergie
          </h3>
          <p className="text-gray-600">
            Remplissez ce formulaire pour ajouter une nouvelle allergie
          </p>
          <div className="grid grid-cols-8 gap-2">
            <div className="col-span-8">
              <label className="text-sm font-semibold">Code </label>
              <input
                type="text"
                className="primary"
                placeholder="code allergene"
                min="0"
                value={selectedAllergie.code_allergene}
                onChange={(e) =>
                  setSelectedAllergie({
                    ...selectedAllergie,
                    code_allergene: e.target.value,
                  })
                }
              />
            </div>

            <div className="col-span-8">
              <label className="text-sm font-semibold">Date</label>
              <input
                type="Date"
                className="primary"
                placeholder="date"
                value={selectedAllergie.date}
                onChange={(e) =>
                  setSelectedAllergie({
                    ...selectedAllergie,
                    date: e.target.value,
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
                value={selectedAllergie.remarques}
                onChange={(e) =>
                  setSelectedAllergie({
                    ...selectedAllergie,
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

export default TabAllergies;
