import Modal, { ModalThemes } from "../../components/UI/Modal";
import { editPersonnel } from "../../hooks/usePersonnel";
import { SubmitHandler, useForm } from "react-hook-form";
import { useContext, useEffect, useState } from "react";
import moment from "moment";
import AlertsContext from "../../hooks/AlertsContext";
import AuthContext from "../../hooks/AuthContext";
import { baseURL } from "../../config";
import axios from "axios";

type Props = {
  isOpen: boolean,
  close: () => void
  selectedPersonnel: Personnel
}


const theme = "primary"

export default function EditPersonnelModal({isOpen, close, selectedPersonnel}: Props) {
  const auth = useContext(AuthContext);
  const { showAlert } = useContext(AlertsContext);

  const { register, handleSubmit, reset, formState:{errors} } = useForm<any>()
  const [, setAvatar] = useState<File>();
  const handleFileChange = (event : any) => setAvatar(event.target.files[0])
  const [services, setServices] = useState<any[]>([]);
  const [specialites, setSpecialites] = useState<any[]>([]);

  useEffect(() => {
    axios.get(`${baseURL}/api/codifications/specialites?search=`).then((response) => {
      setSpecialites(response.data)
    })

    if (!auth!.hopital)
      setServices([])
    else
      axios.get(`${baseURL}/api/hopitaux/${auth!.hopital}/services`).then((response) => {
        setServices(response.data)
      })
  }, [])

  const onSubmit: SubmitHandler<Personnel> = async (data) => {
    try{
      await editPersonnel(data);
      showAlert("success", "Personnel modifié correctement");
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
      <Modal isOpen={isOpen} icon="fa fa-user" theme={theme} size="sm:max-w-5xl">
        <h3 className="text-lg font-semibold leading-6 text-gray-900 mb-3"> Modifier un personnel</h3>
        <p className="text-gray-600"> Remplissez ce formulaire pour modifier un personnel.</p>
        <form className="grid grid-cols-2 gap-2" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div className="mb-1">
            <label className="text-sm font-semibold">Avatar</label>
            <input className="primary" type="file" onChange={handleFileChange} accept="image/*" />
          </div>
          <div className="mb-2">
            <label className="text-sm font-semibold">NIN<span className="text-red-500">*</span></label>
            <input
              type="text"
              placeholder="NIN"
              className={`primary ${errors.NIN && 'has-error'}`}
              {...register("NIN", {required: true, disabled: true})}
            />
          </div>
          <div className="grid grid-cols-2 gap-2 mb-2">
            <div>
              <label className="text-sm font-semibold">Nom<span className="text-red-500">*</span></label>
              <input
                type="text"
                placeholder="Nom"
                className={`primary ${errors.nom && 'has-error'}`}
                {...register("nom", {required: true})}
              />
            </div>
            <div>
              <label className="text-sm font-semibold">Prénom<span className="text-red-500">*</span></label>
              <input
                type="text"
                placeholder="Prénom"
                className={`primary ${errors.prenom && 'has-error'}`}
                {...register("prenom", {required: true})}
              />
            </div>
          </div>
          <div className="mb-2">
            <label className="text-sm font-semibold">Sexe<span className="text-red-500">*</span></label>
            <select {...register("sexe", {required: true})} className={`primary ${errors.sexe && 'has-error'}`}>
              <option value="Homme">Homme</option>
              <option value="Femme">Femme</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-2 mb-2">
            <div>
              <label className="text-sm font-semibold">Date de naissance<span className="text-red-500">*</span></label>
              <input
                type="date"
                placeholder="Date de naissance"
                className={`primary ${errors.date_de_naissance && 'has-error'}`}
                {...register("date_de_naissance", {required: true})}
              />
            </div>
            <div>
              <label className="text-sm font-semibold">Lieu de naissance<span className="text-red-500">*</span></label>
              <input
                type="text"
                placeholder="Lieu de naissance"
                className={`primary ${errors.lieu_de_naissance && 'has-error'}`}
                {...register("lieu_de_naissance", {required: true})}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="mb-2">
              <label className="text-sm font-semibold">Fonction<span className="text-red-500">*</span></label>
              <select
                className={`primary ${errors.fonction && 'has-error'}`}
                {...register("fonction", {required: true})}>
                <option value="medecin">Médecin</option>
                <option value="infirmier">Infirmier(e)</option>
                <option value="admin">Administrateur</option>
                <option value="radio">Radiologue</option>
                <option value="lab">Laborantin</option>
                <option value="pharmacien">Pharmacien</option>
              </select>
            </div>
            <div className="mb-2">
              <label className="text-sm font-semibold">Specialité<span className="text-red-500">*</span></label>
              <select
                className={`primary ${errors.specialite && 'has-error'}`}
                {...register("specialite", {required: true})}>
                {specialites.map((x, i) => <option key={i}>{x.specialite}</option>)}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="mb-2">
              <label className="text-sm font-semibold">Service<span className="text-red-500">*</span></label>
              <select
                className={`primary ${errors.service && 'has-error'}`}
                {...register("service", { required: true })}>
                {services.map((x, i) => <option key={i}>{x.service}</option>)}
              </select>
            </div>
            <div className="mb-2">
              <label className="text-sm font-semibold">Grade<span className="text-red-500">*</span></label>
              <select
                className={`primary ${errors.grade && 'has-error'}`}
                {...register("grade", { required: true })}>
                <option>Interne</option>
                <option>Résident</option>
                <option>Assistant</option>
                <option>Maître Assistant</option>
                <option>Professeur</option>
                <option>Chef de service</option>
              </select>
            </div>
          </div>
        </div>

        <div>
          <div className="mb-2">
            <label className="text-sm font-semibold">Email<span className="text-red-500">*</span></label>
            <input
              type="email"
              placeholder="Email"
              className={`primary ${errors.email && 'has-error'}`}
              {...register("email", {required: true})}
            />
          </div>
          <div className="mb-2">
            <label className="text-sm font-semibold">Numero de téléphone<span className="text-red-500">*</span></label>
            <input
              type="tel"
              placeholder="Numero de telephone"
              className={`primary ${errors.telephone && 'has-error'}`}
              {...register("telephone", {required: true})}
            />
          </div>
          <div className="mb-2">
            <label className="text-sm font-semibold">Adresse<span className="text-red-500">*</span></label>
            <input
              type="text"
              placeholder="Adresse"
              className={`primary ${errors.adresse && 'has-error'}`}
              {...register("adresse", {required: true})}
            />
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="text-sm font-semibold">Commune<span className="text-red-500">*</span></label>
              <input
                type="text"
                placeholder="Commune"
                className={`primary ${errors.commune && 'has-error'}`}
                {...register("commune", {required: true})}
              />
            </div>
            <div>
              <label className="text-sm font-semibold">Wilaya<span className="text-red-500">*</span></label>
              <select {...register("wilaya", {required: true})} className={`primary ${errors.wilaya && 'has-error'}`}>
                <option value="Adrar">01 - Adrar</option>
                <option value="Chlef">02 - Chlef</option>
                <option value="Laghouat">03 - Laghouat</option>
                <option value="Oum El Bouaghi">04 - Oum El Bouaghi</option>
                <option value="Batna">05 - Batna</option>
                <option value="Béjaïa">06 - Béjaïa</option>
                <option value="Biskra">07 - Biskra</option>
                <option value="Béchar">08 - Béchar</option>
                <option value="Blida">09 - Blida</option>
                <option value="Bouira">10 - Bouira</option>
                <option value="Tamanrasset">11 - Tamanrasset</option>
                <option value="Tébessa">12 - Tébessa</option>
                <option value="Tlemcen">13 - Tlemcen</option>
                <option value="Tiaret">14 - Tiaret</option>
                <option value="Tizi Ouzou">15 - Tizi Ouzou</option>
                <option value="Alger">16 - Alger</option>
                <option value="Djelfa">17 - Djelfa</option>
                <option value="Jijel">18 - Jijel</option>
                <option value="Sétif">19 - Sétif</option>
                <option value="Saïda">20 - Saïda</option>
                <option value="Skikda">21 - Skikda</option>
                <option value="Sidi Bel Abbès">22 - Sidi Bel Abbès</option>
                <option value="Annaba">23 - Annaba</option>
                <option value="Guelma">24 - Guelma</option>
                <option value="Constantine">25 - Constantine</option>
                <option value="Médéa">26 - Médéa</option>
                <option value="Mostaganem">27 - Mostaganem</option>
                <option value="M'Sila">28 - M'Sila</option>
                <option value="Mascara">29 - Mascara</option>
                <option value="Ouargla">30 - Ouargla</option>
                <option value="Oran">31 - Oran</option>
                <option value="El Bayadh">32 - El Bayadh</option>
                <option value="Illizi">33 - Illizi</option>
                <option value="Bordj Bou Arréridj">34 - Bordj Bou Arréridj</option>
                <option value="Boumerdès">35 - Boumerdès</option>
                <option value="El Tarf">36 - El Tarf</option>
                <option value="Tindouf">37 - Tindouf</option>
                <option value="Tissemsilt">38 - Tissemsilt</option>
                <option value="El Oued">39 - El Oued</option>
                <option value="Khenchela">40 - Khenchela</option>
                <option value="Souk Ahras">41 - Souk Ahras</option>
                <option value="Tipaza">42 - Tipaza</option>
                <option value="Mila">43 - Mila</option>
                <option value="Aïn Defla">44 - Aïn Defla</option>
                <option value="Naâma">45 - Naâma</option>
                <option value="Aïn Témouchent">46 - Aïn Témouchent</option>
                <option value="Ghardaïa">47 - Ghardaïa</option>
                <option value="Relizane">48 - Relizane</option>
                <option value="Timimoun">49 - Timimoun</option>
                <option value="Bordj Badji Mokhtar">50 - Bordj Badji Mokhtar</option>
                <option value="Béni Abbès">51 - Béni Abbès</option>
                <option value="Ouled Djellal">52 - Ouled Djellal</option>
                <option value="In Salah">53 - In Salah</option>
                <option value="In Guezzam">54 - In Guezzam</option>
                <option value="Touggourt">55 - Touggourt</option>
                <option value="Djanet">56 - Djanet</option>
                <option value="El M'Ghair">57 - El M'Ghair</option>
                <option value="El Meniaa">58 - El Meniaa</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-semibold">Code postale<span className="text-red-500">*</span></label>
              <input
                type="text"
                placeholder="Code Postale"
                className={`primary ${errors.code_postale && 'has-error'}`}
                {...register("code_postale", {required: true})}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-3 col-span-2">
          <button
            type="submit"
            className={`${ModalThemes[theme].color} rounded-md px-4 py-2 font-semibold text-white`}
            onClick={handleSubmit(onSubmit)}>
            Ajouter
          </button>
          <button
            type="button"
            className="bg-white px-3 font-semibold text-gray-900 ring-gray-300 hover:bg-gray-50"
            onClick={onReset}>
            Annuler
          </button>
        </div>
      </form>
      </Modal>
    );
}
  