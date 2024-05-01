import { useContext, useState } from "react";
import Modal, { ModalThemes } from "../../components/UI/Modal";
import AlertsContext from "../../hooks/AlertsContext";
import { createPersonnel } from "../../hooks/usePersonnel";
import { SubmitHandler, useForm } from "react-hook-form";

type Props = {
  isOpen: boolean;
  close: () => void;
};

const theme = "primary";

export default function CreatePersonnelModal({ isOpen, close }: Props) {
  const { showAlert } = useContext(AlertsContext);
  
  const { register, handleSubmit, reset, formState:{errors} } = useForm<Personnel>();
  const [avatar, setAvatar] = useState<File>();
  const handleFileChange = (event : any) => setAvatar(event.target.files[0])
  
  const onSubmit: SubmitHandler<Personnel> = async (data) => {
    try{
      await createPersonnel(data, avatar!);
      showAlert("success", "Personnel ajouté correctement");
      reset();
      close();
    }catch(error : any){
      if (error.response)
        if(error.response?.data?.errorCode != "form-validation")
          showAlert("error", error.response.data.errorCode + ": " + error.response.data.errorMessage);
      else
        showAlert("error", error.code + ": " + error.message);
    }
  };
  const onReset = () => {
    reset();
    close();
  };
  return (
    <Modal isOpen={isOpen} icon="fa fa-user" theme={theme} size="sm:max-w-5xl">
      <h3 className="text-lg font-semibold leading-6 text-gray-900 mb-3">Créer un Personnel</h3>
      <p className="text-gray-600">Remplissez ce formulaire pour ajouter un nouveau Personnel</p>
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
                {...register("NIN", {required: true})}
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
          <div className="mb-2">
            <label className="text-sm font-semibold">Service<span className="text-red-500">*</span></label>
            <input
              type="text"
              placeholder="Service"
              className={`primary ${errors.service && 'has-error'}`}
              {...register("service", {required: true})}
            />
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div className="mb-2">
              <label className="text-sm font-semibold">Fonction<span className="text-red-500">*</span></label>
              <input
                type="text"
                placeholder="Fonction"
                className={`primary ${errors.fonction && 'has-error'}`}
                {...register("fonction", {required: true})}
              />
            </div>
            <div className="mb-2">
              <label className="text-sm font-semibold">Specialité<span className="text-red-500">*</span></label>
              <input
                type="text"
                placeholder="Spécialité"
                className={`primary ${errors.specialite && 'has-error'}`}
                {...register("specialite", {required: true})}
              />
            </div>
            <div className="mb-2">
              <label className="text-sm font-semibold">Grade<span className="text-red-500">*</span></label>
              <input
                type="text"
                placeholder="Grade"
                className={`primary ${errors.grade && 'has-error'}`}
                {...register("grade", {required: true})}
              />
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
                <option>01 - Adrar</option>
                <option>02 - Chlef</option>
                <option>03 - Laghouat</option>
                <option>04 - Oum El Bouaghi</option>
                <option>05 - Batna</option>
                <option>06 - Béjaïa</option>
                <option>07 - Biskra</option>
                <option>08 - Béchar</option>
                <option>09 - Blida</option>
                <option>10 - Bouira</option>
                <option>11 - Tamanrasset</option>
                <option>12 - Tébessa</option>
                <option>13 - Tlemcen</option>
                <option>14 - Tiaret</option>
                <option>15 - Tizi Ouzou</option>
                <option>16 - Alger</option>
                <option>17 - Djelfa</option>
                <option>18 - Jijel</option>
                <option>19 - Sétif</option>
                <option>20 - Saïda</option>
                <option>21 - Skikda</option>
                <option>22 - Sidi Bel Abbès</option>
                <option>23 - Annaba</option>
                <option>24 - Guelma</option>
                <option>25 - Constantine</option>
                <option>26 - Médéa</option>
                <option>27 - Mostaganem</option>
                <option>28 - M'Sila</option>
                <option>29 - Mascara</option>
                <option>30 - Ouargla</option>
                <option>31 - Oran</option>
                <option>32 - El Bayadh</option>
                <option>33 - Illizi</option>
                <option>34 - Bordj Bou Arréridj</option>
                <option>35 - Boumerdès</option>
                <option>36 - El Tarf</option>
                <option>37 - Tindouf</option>
                <option>38 - Tissemsilt</option>
                <option>39 - El Oued</option>
                <option>40 - Khenchela</option>
                <option>41 - Souk Ahras</option>
                <option>42 - Tipaza</option>
                <option>43 - Mila</option>
                <option>44 - Aïn Defla</option>
                <option>45 - Naâma</option>
                <option>46 - Aïn Témouchent</option>
                <option>47 - Ghardaïa</option>
                <option>48 - Relizane</option>
                <option>49 - Timimoun</option>
                <option>50 - Bordj Badji Mokhtar</option>
                <option>51 - Béni Abbès</option>
                <option>52 - Ouled Djellal</option>
                <option>53 - In Salah</option>
                <option>54 - In Guezzam</option>
                <option>55 - Touggourt</option>
                <option>56 - Djanet</option>
                <option>57 - El M'Ghair</option>
                <option>58 - El Meniaa</option>
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
