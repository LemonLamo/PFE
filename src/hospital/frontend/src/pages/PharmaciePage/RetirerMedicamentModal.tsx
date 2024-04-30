import { SubmitHandler, useForm } from "react-hook-form";
import Select from "../../components/Selects/Select";
import Modal, { ModalThemes } from "../../components/UI/Modal";
import AlertsContext from "../../hooks/AlertsContext";
import { updateMedicamentQuantite } from "../../hooks/useMedicaments";
import { useContext } from "react";
import { createPortal } from "react-dom";

type Props = {
  isOpen: boolean;
  close: () => void;
};

const theme = "danger";

export default function AjouterMedicamentModal({ isOpen, close }: Props) {
  const { showAlert } = useContext(AlertsContext);

  const { register, handleSubmit, reset, setValue, formState:{errors} } = useForm<any>();
  register('code_medicament', {required: true});

  function select_medicament(medicament: MedicamentCode) {
      setValue("code_medicament", medicament?.code_medicament ?? null)
      setValue("DCI", medicament?.DCI ?? null)
  }

  const onSubmit: SubmitHandler<any> = async (data : any) => {
    try{
        await updateMedicamentQuantite(-1, data);
        reset();
        close();
    } catch (error: any) {
      if (error.response)
        if(error.response?.data?.errorCode != "form-validation")
          showAlert("error", error.response.data.errorCode + ": " + error.response.data.errorMessage);
      else
          showAlert("error", error.code + ": " + error.message);
    }
  }

  return (
    createPortal(
    <Modal isOpen={isOpen} icon="fa fa-pills" theme={theme} size="sm:max-w-2xl">
      <h3 className="text-lg font-semibold leading-6 text-gray-900 mb-3">Ajouter un médicament</h3>
      <p className="text-gray-600">Remplissez ce formulaire pour retirer un médicament.</p>
      <div className="mb-2">
        <label className="text-sm font-semibold">Code<span className="text-red-500">*</span></label>
        <Select<MedicamentCode> url="medicaments" code="code_medicament" designation="DCI" placeholder="Médicament" onChange={select_medicament} className={`col-span-6 primary ${errors.code_medicament && 'has-error'}`} />
      </div>
      <div className="col-span-4 mb-2">
        <label className="text-sm font-semibold">Quantité à ajouter<span className="text-red-500">*</span></label>
        <input type="number" placeholder="Qte" {...register("quantite", {required: true})} className={`primary ${errors.quantite && 'has-error'}`} />
      </div>

      <div className="flex justify-end gap-3 mt-4">
        <button type="button" className={`${ModalThemes[theme].color} rounded-md px-4 py-2 font-semibold text-white`} onClick={handleSubmit(onSubmit)}>Retirer</button>
        <button type="button" className="bg-white px-3 font-semibold text-gray-900 ring-gray-300 hover:bg-gray-50" onClick={close}>Annuler</button>
      </div>
    </Modal>, document.body)
    );
}
