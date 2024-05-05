import { useContext } from "react";
import Modal, { ModalThemes } from "../../../components/UI/Modal";
import Select from "../../../components/Selects/Select";
import { createPortal } from "react-dom";
import AlertsContext from "../../../hooks/AlertsContext";
import { SubmitHandler, useForm } from "react-hook-form";

type Props = {
  isOpen: boolean,
  close: () => void
  action: (arg0: Maladie) => Promise<void>
}

const theme = "primary"

export default function AjouterMaladieChronique({isOpen, close, action}: Props) {
    const { showAlert } = useContext(AlertsContext);

    const { register, handleSubmit, reset, setValue, formState:{errors} } = useForm<any>();
    register('code_maladie', {required: true});

    function select_maladie(maladie: MaladieCode) {
        setValue("code_maladie", maladie?.code_maladie ?? null)
        setValue("designation", maladie?.designation ?? null)
    }
    const onSubmit: SubmitHandler<any> = async (data : any) => {
        try{
            if(!confirm("Êtes-vous sûr de vouloir continuer? Cette action est irréversible et ces données ne pourront plus être modifiées par la suite."))
                return;
            
            await action(data);
            reset();
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
        <Modal isOpen={isOpen} icon="fa fa-virus" theme={theme} size="sm:max-w-2xl">
            <h3 className="text-lg font-semibold leading-6 text-gray-900 mb-3"> Ajouter une maladie chronique </h3>
            <p className="text-gray-600"> Remplissez ce formulaire pour ajouter une maladie chronique.</p>
            <form onReset={reset}>
                <div className="grid grid-cols-6 gap-2">
                    <label className="font-semibold text-slate-700 text-sm col-span-2"> Maladie<span className="text-red-500">*</span> </label>
                    <Select<MaladieCode> url="maladies-chroniques" code="code_maladie" designation="designation" placeholder="Maladie chronique" onChange={select_maladie} className={`col-span-4 primary ${errors.code_maladie && 'has-error'}`}/>

                    <label className="font-semibold text-slate-700 text-sm col-span-2"> Date<span className="text-red-500">*</span> </label>
                    <input type="datetime-local" placeholder="Date de diagnostic" className={`col-span-4 primary ${errors.date && 'has-error'}`} {...register("date", {required: true})} />

                    <label className="font-semibold text-slate-700 text-sm col-span-2 self-start"> Remarques </label>
                    <textarea rows={5} placeholder="Remarques" className={`col-span-4 primary ${errors.remarques && 'has-error'}`} {...register("remarques", {required: false})} />
                </div>

                <div className="flex justify-end gap-3 mt-4">
                    <button type="button" className={`${ModalThemes[theme].color} rounded-md px-4 py-2 font-semibold text-white`} onClick={handleSubmit(onSubmit)}>Ajouter</button>
                    <button type="button" className="bg-white px-3 font-semibold text-gray-900 ring-gray-300 hover:bg-gray-50" onClick={close}>Annuler</button>
                </div>
            </form>
        </Modal>, document.body)
    );
}
