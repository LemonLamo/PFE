import { SubmitHandler, useForm } from "react-hook-form";
import Modal, { ModalThemes } from "../../components/UI/Modal";
import Table from "../../components/UI/Tables/Table";
import TableCell from "../../components/UI/Tables/TableCell";
import TableRow from "../../components/UI/Tables/TableRow";
import { lits_types, createChambre } from "../../hooks/useChambres";
import { useEffect, useState } from "react";

type Props = {
  isOpen: boolean;
  close: () => void;
};
const theme = "primary";

function capArray<T>(data: T[], size: number): T[] {
  if (data.length <= size)
    return [
      ...data,
      ...Array(size - data.length).fill({ type: "", description: "" }),
    ];
  else return data.slice(0, size);
}

export default function CreateChambreModal({ isOpen, close }: Props) {
  const { register, handleSubmit, reset, watch } = useForm<Chambre>();
  const [lits, setLits] = useState<Lit[]>([]);
  const onSubmit: SubmitHandler<Chambre> = async (data) => {
    const chambre = { ...data, lits: lits };
    // const response = await createChambre(chambre);
    createChambre(chambre)
      .then((response) => {
        reset();
        close();
      })
      .catch((error) => {
        console.log(error);
      });
    // console.log(response);
  };
  const watched_nombre_lits = watch("nombre_lits");
  useEffect(() => {
    setLits(capArray<Lit>(lits, watched_nombre_lits!));
  }, [watched_nombre_lits]);
  const onReset = () => {
    reset();
    close();
  };

  const updateLit = (i: number, name: keyof Lit, value: Lit[typeof name]) => {
    lits[i] = { ...lits[i], [name]: value };
    setLits(lits);
  };

  return (
    <Modal isOpen={isOpen} icon="fa fa-bed" theme={theme} size="sm:max-w-2xl">
      <h3 className="text-lg font-semibold leading-6 text-gray-900 mb-3">
        {" "}
        Créer une chambre{" "}
      </h3>
      <p className="text-gray-600">
        {" "}
        Remplissez ce formulaire pour ajouter une nouvelle chambre{" "}
      </p>
      <form
        className="grid grid-cols-12 gap-2"
        onSubmit={handleSubmit(onSubmit)}
        onReset={onReset}
      >
        <div className="col-span-4">
          <label className="text-sm font-semibold">
            Numéro de chambre<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className="primary"
            placeholder="Num"
            {...register("num")}
          />
        </div>

        <div className="col-span-4">
          <label className="text-sm font-semibold">
            Etage<span className="text-red-500">*</span>{" "}
          </label>
          <select className="primary" {...register("etage")}>
            <option value={0}>RDC</option>
            <option value={1}>1er</option>
            <option value={2}>2éme</option>
            <option value={3}>3éme</option>
            <option value={4}>4éme</option>
            <option value={5}>5éme</option>
            <option value={6}>6éme</option>
          </select>
        </div>

        <div className="col-span-4">
          <label className="text-sm font-semibold">
            Nombre de lits<span className="text-red-500">*</span>{" "}
          </label>
          <input
            type="number"
            min="0"
            className="primary"
            placeholder="Nombre"
            {...register("nombre_lits")}
          />
        </div>

        <div className="col-span-12">
          <label className="text-sm font-semibold">Description </label>
          <textarea
            className="primary"
            placeholder="Description"
            {...register("description")}
          />
        </div>

        <div className="col-span-12">
          <label className="text-sm font-semibold">Lits </label>
          <Table
            fields={["#", "Type", "Description"]}
            className="mb-4 col-span-12 max-h-72"
          >
            {lits.map((_, i) => (
              <TableRow key={i}>
                <TableCell className="font-bold">{i + 1}</TableCell>
                <TableCell>
                  <select
                    className="primary"
                    value={lits[i].type}
                    onChange={(e) => updateLit(i, "type", e.target.value)}
                  >
                    {lits_types.map((type, j) => (
                      <option key={j}> {type} </option>
                    ))}
                  </select>
                </TableCell>
                <TableCell>
                  <input
                    className="primary"
                    placeholder="Description..."
                    value={lits[i].description}
                    onChange={(e) =>
                      updateLit(i, "description", e.target.value)
                    }
                  />
                </TableCell>
              </TableRow>
            ))}
          </Table>
        </div>

        <div className="flex justify-end gap-3 col-span-12">
          <button
            type="submit"
            className={`${ModalThemes[theme].color} rounded-md px-4 py-2 font-semibold text-white`}
          >
            Ajouter
          </button>
          <button
            type="button"
            className="bg-white px-3 font-semibold text-gray-900 ring-gray-300 hover:bg-gray-50"
            onClick={onReset}
          >
            Annuler
          </button>
        </div>
      </form>
    </Modal>
  );
}
