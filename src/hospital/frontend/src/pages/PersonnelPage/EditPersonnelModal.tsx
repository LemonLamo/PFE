import Modal, { ModalThemes } from "../../components/UI/Modal";
import { editPersonnel } from "../../hooks/usePersonnel";
import { SubmitHandler, useForm } from "react-hook-form";
import { useContext, useEffect } from "react";
import moment from "moment";
import AlertsContext from "../../hooks/AlertsContext";

type Props = {
  isOpen: boolean,
  close: () => void
  selectedPersonnel: Personnel
}


const theme = "primary"

export default function EditPersonnelModal({isOpen, close, selectedPersonnel}: Props) {
  const { showAlert } = useContext(AlertsContext);
  const { register, handleSubmit, reset } = useForm<any>()
  const onSubmit: SubmitHandler<any> = async (data) => {
    try{
      await editPersonnel(data);
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
      reset({...selectedPersonnel, date_de_naissance: moment(selectedPersonnel.date_de_naissance).format('YYYY-MM-DD')});
  }, [selectedPersonnel]);

  const onReset = () => {reset(); close()}

  return (
      <Modal isOpen={isOpen} icon="fa fa-bed" theme={theme} size="sm:max-w-5xl">
        <h3 className="text-lg font-semibold leading-6 text-gray-900 mb-3"> Modifier une chambre </h3>
        <p className="text-gray-600"> Remplissez ce formulaire pour modifier une nouvelle chambre </p>
        <form className="grid grid-cols-2 gap-2" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div className="mb-2">
            <label className="text-sm font-semibold">NIN<span className="text-red-500">*</span></label>
            <input type="text" className="primary" placeholder="NIN" {...register('NIN')}/>
          </div>
          <div className="mb-2">
            <label className="text-sm font-semibold">Nom<span className="text-red-500">*</span> </label>
            <input type="text" className="primary" placeholder="Nom" {...register('nom')}/>
          </div>
          <div className="mb-2">
            <label className="text-sm font-semibold">Prénom<span className="text-red-500">*</span> </label>
            <input type="text" className="primary" placeholder="Prénom" {...register('prenom')}/>
          </div>
          <div className="mb-2">
            <label className="text-sm font-semibold">Sexe<span className="text-red-500">*</span> </label>
            <input type="text" className="primary" placeholder="Sexe" {...register('sexe')}/>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-sm font-semibold">Date de naissance<span className="text-red-500">*</span> </label>
              <input type="date" className="primary" placeholder="Date de naissance" {...register('date_de_naissance', {valueAsDate: true})}/>
            </div>
            <div>
              <label className="text-sm font-semibold">Lieu de naissance<span className="text-red-500">*</span> </label>
              <input type="text" className="primary" placeholder="Lieu de naissance" {...register('lieu_de_naissance')}/>
            </div>
          </div>
          <div className="mb-2">
            <label className="text-sm font-semibold">Service<span className="text-red-500">*</span> </label>
            <input type="text" className="primary" placeholder="Service" {...register('service')}/>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div className="mb-2">
              <label className="text-sm font-semibold">Fonction<span className="text-red-500">*</span> </label>
              <input type="text" className="primary" placeholder="Fonction" {...register('fonction')}/>
            </div>
            <div className="mb-2">
              <label className="text-sm font-semibold">Specialité</label>
              <input type="text" className="primary" placeholder="Spécialité" {...register('specialite')}/>
            </div>
            <div className="mb-2">
              <label className="text-sm font-semibold">Grade</label>
              <input type="text" className="primary" placeholder="Grade" {...register('grade')}/>
            </div>
          </div>
        </div>

        <div>
          <div className="mb-2">
            <label className="text-sm font-semibold">Email<span className="text-red-500">*</span> </label>
            <input type="email" className="primary" placeholder="Email" {...register('email')}/>
          </div>
          <div className="mb-2">
            <label className="text-sm font-semibold"> Numero de téléphone<span className="text-red-500">*</span> </label>
            <input type="tel" className="primary" placeholder="Numero de telephone" {...register('telephone')}/>
          </div>
          <div className="mb-2">
            <label className="text-sm font-semibold">Adresse<span className="text-red-500">*</span> </label>
            <input type="text" className="primary" placeholder="Adresse" {...register('adresse')}/>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="text-sm font-semibold">Commune<span className="text-red-500">*</span> </label>
              <input type="text" className="primary" placeholder="Commune" {...register('commune')}/>
            </div>
            <div>
              <label className="text-sm font-semibold">Wilaya<span className="text-red-500">*</span> </label>
              <input type="text" className="primary" placeholder="Wilaya" {...register('wilaya')}/>
            </div>
            <div>
              <label className="text-sm font-semibold">Code postale<span className="text-red-500">*</span> </label>
              <input type="text" className="primary" placeholder="Code Postale" {...register('code_postale')}/>
            </div>
          </div>
        </div>
      <div className="flex justify-end gap-3 col-span-2">
          <button type="submit" className={`${ModalThemes[theme].color} rounded-md px-4 py-2 font-semibold text-white`} onClick={handleSubmit(onSubmit)}>Modifier</button>
          <button type="button" className="bg-white px-3 font-semibold text-gray-900 ring-gray-300 hover:bg-gray-50" onClick={onReset}>Annuler</button>
      </div>
        </form>
      </Modal>
    );
}
  