import Select from "../../../components/Selects/Select";
import Modal, { ModalThemes } from "../../../components/UI/Modal";
import { useContext } from "react";
import AlertsContext from "../../../hooks/AlertsContext";
import { SubmitHandler, useForm } from "react-hook-form";
import { createPortal } from "react-dom";

type Props = {
  isOpen: boolean,
  close: () => void,
  action: (arg0: Prescription) => Promise<void>,
}

const theme = "primary"

export default function AjouterPrescription({isOpen, close, action}: Props) {
    const { showAlert } = useContext(AlertsContext);

    const { register, handleSubmit, reset, setValue, formState:{errors} } = useForm<any>();
    register('code_medicament', {required: true});

    function select_medicament(medicament: MedicamentCode) {
        setValue("code_medicament", medicament?.code_medicament ?? null)
        setValue("DCI", medicament?.DCI ?? null)
    }
    const onSubmit: SubmitHandler<any> = async (data : any) => {
        try{
            const prescription : Prescription = {
                code_medicament: data.code_medicament,
                DCI: data.DCI,
                posologie: data.posologie + data.posologie_unit,
                frequence: data.frequence + " " + data.frequence_unit,
                duree: data.duree + data.duree_unit,
                remarques: data.remarques,
                date_debut: new Date()
            }
            await action(prescription);
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
            <h3 className="text-lg font-semibold leading-6 text-gray-900 mb-3"> Ajouter une prescription</h3>
            <p className="text-gray-600"> Remplissez ce formulaire pour ajouter une prescription.</p>
            <form onReset={reset}>
                <div className="grid grid-cols-8 gap-2">
                    <label className="font-semibold text-slate-700 text-sm col-span-2">Médicament<span className="text-red-500">*</span></label>
                    <Select<MedicamentCode> url="medicaments" code="code_medicament" designation="DCI" placeholder="Médicament" onChange={select_medicament} className={`col-span-6 primary ${errors.code_medicament && 'has-error'}`} />

                    <label className="font-semibold text-slate-700 text-sm col-span-2">Posologie<span className="text-red-500">*</span></label>
                    <input type="number" placeholder="Posologie" className={`col-span-4 primary ${errors.posologie && 'has-error'}`} {...register("posologie", {required: true})} />
                    <select className="col-span-2 primary" {...register("posologie_unit", {required: true})}>
                        <option>ml</option>
                        <option>mg</option>
                        <option>g</option>
                    </select>

                    <label className="font-semibold text-slate-700 text-sm col-span-2">Fréquence<span className="text-red-500">*</span></label>
                    <input type="number" placeholder="Fréquence" className={`col-span-4 primary ${errors.frequence && 'has-error'}`} {...register("frequence", {required: true})} />
                    <select className="col-span-2 primary" {...register("frequence_unit", {required: true})}>
                        <option> fois / jr</option>
                    </select>

                    <label className="font-semibold text-slate-700 text-sm col-span-2">Durée<span className="text-red-500">*</span></label>
                    <input type="number" placeholder="Duree" className={`col-span-4 primary ${errors.duree && 'has-error'}`} {...register("duree", {required: true})} />
                    <select className="col-span-2 primary" {...register("duree_unit", {required: true})}>
                        <option>Jours</option>
                        <option>Semaines</option>
                        <option>Mois</option>
                    </select>

                    <label className="font-semibold text-slate-700 text-sm col-span-2">Remarques</label>
                    <textarea rows={5}  placeholder="Remarques" className={`col-span-6 primary ${errors.remarques && 'has-error'}`} {...register("remarques", {required: false})} />
                </div>

                <div className="flex justify-end gap-3 mt-4">
                    <button type="button" className={`${ModalThemes[theme].color} rounded-md px-4 py-2 font-semibold text-white`} onClick={handleSubmit(onSubmit)}>Ajouter</button>
                    <button type="button" className="bg-white px-3 font-semibold text-gray-900 ring-gray-300 hover:bg-gray-50" onClick={close}>Annuler</button>
                </div>
            </form>
        </Modal>, document.body)
    );
}
