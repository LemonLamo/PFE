import { SubmitHandler, useForm } from "react-hook-form";
import Modal, { ModalThemes } from "../../components/UI/Modal";
import Table from "../../components/UI/Tables/Table";
import TableCell from "../../components/UI/Tables/TableCell";
import TableRow from "../../components/UI/Tables/TableRow";
import { editChambre } from "../../hooks/useChambres";
import { useContext, useEffect } from "react";
import AlertsContext from "../../hooks/AlertsContext";

type Props = {
  isOpen: boolean,
  close: () => void,
  selectedChambre: Chambre
}

const theme = "primary"

export default function EditChambreModal({ isOpen, close, selectedChambre } : Props) {
    const { showAlert } = useContext(AlertsContext);

    const { register, handleSubmit, reset } = useForm<Chambre>()
    const onSubmit: SubmitHandler<Chambre> = async (data) => {
        try{
            await editChambre(data);
            reset();
            close();
        }catch(error : any){
            if (error.response)
                if(error.response?.data?.errorCode != "form-validation")
          showAlert("error", error.response.data.errorCode + ": " + error.response.data.errorMessage);
            else
                showAlert("error", error.code + ": " + error.message);
        }
    }

    useEffect(() => {
        reset(selectedChambre);
    }, [selectedChambre]);

    const onReset = () => {reset(); close()}

    return (
    <Modal isOpen={isOpen} icon="fa fa-bed" theme={theme} size="sm:max-w-2xl">
        <h3 className="text-lg font-semibold leading-6 text-gray-900 mb-3"> Modifier une chambre </h3>
        <p className="text-gray-600"> Remplissez ce formulaire pour modifier une nouvelle chambre </p>
        <form className="grid grid-cols-12 gap-2" onSubmit={handleSubmit(onSubmit)}>
            <div className="col-span-4">
                <label className="text-sm font-semibold">Numéro de chambre<span className="text-red-500">*</span></label>
                <input type="text" className="primary" placeholder="Num"  {...register('num')} />
            </div>

            <div className="col-span-4">
                <label className="text-sm font-semibold">Etage<span className="text-red-500">*</span> </label>
                <select className="primary" {...register('etage')} >
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
            <label className="text-sm font-semibold">Nombre de lits<span className="text-red-500">*</span> </label>
            <input type="number" min="0" className="primary" placeholder="Nombre"  {...register('nombre_lits')} />
            </div>
            
            <div className="col-span-12">
            <label className="text-sm font-semibold">Description </label>
            <textarea className="primary" placeholder="Description" {...register('description')} />
            </div>

            <div className="col-span-12">
                <label className="text-sm font-semibold">Lits </label>
                <Table fields={["#", "Type", "Description"]} className="mb-4 col-span-12 max-h-72">
                <TableRow>
                    <TableCell className="font-bold">1</TableCell>
                    <TableCell>
                    <select className="primary">
                        <option> Type A </option>
                        <option> Type B </option>
                    </select>
                    </TableCell>
                    <TableCell>
                    <input className="primary" placeholder="Description..."/>
                    </TableCell>
                </TableRow>
                </Table>
            </div>

            <div className="flex justify-end gap-3 col-span-12">
                <button type="submit" className={`${ModalThemes[theme].color} rounded-md px-4 py-2 font-semibold text-white`}>Modifier</button>
                <button type="button" className="bg-white px-3 font-semibold text-gray-900 ring-gray-300 hover:bg-gray-50" onClick={onReset}>Annuler</button>
            </div>
        </form>
    </Modal>
    );
}
  