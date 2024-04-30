import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import Modal, { ModalThemes } from "../../components/UI/Modal";
import Table from "../../components/UI/Tables/Table";
import TableCell from "../../components/UI/Tables/TableCell";
import TableRow from "../../components/UI/Tables/TableRow";
import { lits_types, createChambre } from "../../hooks/useChambres";
import { useContext, useEffect } from "react";
import AlertsContext from "../../hooks/AlertsContext";

type Props = {
  isOpen: boolean;
  close: () => void;
};
const theme = "primary";

export default function CreateChambreModal({ isOpen, close }: Props) {
  const { showAlert } = useContext(AlertsContext);
  const { control, register, handleSubmit, reset, formState:{errors}, watch } = useForm<any>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "lits",
  });

  const onSubmit: SubmitHandler<any> = async (data) => {
    const chambre = { ...data };
    try{
      await createChambre(chambre);
      reset();
      showAlert("success", "Chambre ajouté correctement");
      close();
    }catch(error : any){
      if (error.response)
        if(error.response?.data?.errorCode != "form-validation")
          showAlert("error", error.response.data.errorCode + ": " + error.response.data.errorMessage);
      else
        showAlert("error", error.code + ": " + error.message);
    }
  };
  const watched_nombre_lits = Number(watch("nombre_lits"));
  useEffect(() => {
    console.log(fields.length, watched_nombre_lits)
    if(fields.length < watched_nombre_lits)
      for(let i=fields.length; i<watched_nombre_lits; i++)
        append(i+1);
    else
      for(let i=watched_nombre_lits; i<fields.length; i++)
        remove(watched_nombre_lits);
  }, [watched_nombre_lits]);
  const onReset = () => {
    reset();
    close();
  };

  return (
    <Modal isOpen={isOpen} icon="fa fa-bed" theme={theme} size="sm:max-w-2xl">
      <h3 className="text-lg font-semibold leading-6 text-gray-900 mb-3">Créer une chambre</h3>
      <p className="text-gray-600">Remplissez ce formulaire pour ajouter une nouvelle chambre</p>
      <form className="grid grid-cols-12 gap-2" onSubmit={handleSubmit(onSubmit)} onReset={onReset}>
        <div className="col-span-4">
          <label className="text-sm font-semibold">
            Numéro de chambre<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Num"
            className={`primary ${errors.num && 'has-error'}`}
            {...register("num", {required: true})}
          />
        </div>

        <div className="col-span-4">
          <label className="text-sm font-semibold">
            Etage<span className="text-red-500">*</span>{" "}
          </label>
          <select {...register("etage", {required: true})} className={`primary ${errors.etage && 'has-error'}`}>
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
            placeholder="Nombre"
            className={`primary ${errors.nombre_lits && 'has-error'}`}
            {...register("nombre_lits", {required: true})}
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
          <Table fields={["#", "Type", "Description"]} className="mb-4 col-span-12 max-h-72">
            {fields.map((field: any, index: number) => (
              <TableRow key={field.id}>
                <TableCell className="font-bold">{index + 1}</TableCell>
                <TableCell>
                  <select className="primary" {...register(`lits.${index}.type`, {required: true})}>
                    {lits_types.map((type, j) => (
                      <option key={j}> {type} </option>
                    ))}
                  </select>
                </TableCell>
                <TableCell>
                  <input className="primary"placeholder="Description..." {...register(`lits.${index}.remarques`)}/>
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
