import Modal, { ModalThemes } from "../../components/UI/Modal";
import { createPersonnel } from "../../hooks/usePersonnel";
import { SubmitHandler, useForm } from "react-hook-form";

type Props = {
  isOpen: boolean;
  close: () => void;
};

const theme = "primary";

export default function CreatePersonnelModal({ isOpen, close }: Props) {
  const { register, handleSubmit, reset } = useForm<Personnel>();
  const onSubmit: SubmitHandler<Personnel> = async (data) => {
    createPersonnel(data)
      .then((response: any) => {
        reset();
        close();
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const onReset = () => {
    reset();
    close();
  };
  return (
    <Modal isOpen={isOpen} icon="fa fa-user" theme={theme} size="sm:max-w-5xl">
      <h3 className="text-lg font-semibold leading-6 text-gray-900 mb-3">
        {" "}
        Créer un Personnel{" "}
      </h3>
      <p className="text-gray-600">
        {" "}
        Remplissez ce formulaire pour ajouter un nouveau Personnel{" "}
      </p>
      <form
        className="grid grid-cols-2 gap-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <div className="mb-2">
            <label className="text-sm font-semibold">NIN</label>
            <input
              type="text"
              className="primary"
              placeholder="NIN"
              {...register("NIN")}
            />
          </div>
          <div className="mb-2">
            <label className="text-sm font-semibold">Nom </label>
            <input
              type="text"
              className="primary"
              placeholder="Nom"
              {...register("nom")}
            />
          </div>
          <div className="mb-2">
            <label className="text-sm font-semibold">Prénom </label>
            <input
              type="text"
              className="primary"
              placeholder="Prénom"
              {...register("prenom")}
            />
          </div>
          <div className="mb-2">
            <label className="text-sm font-semibold">Sexe </label>
            <select {...register("sexe")}>
              <option value="Homme">Male</option>
              <option value="Femme">Female</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-sm font-semibold">Date de naissance</label>
              <input
                type="date"
                className="primary"
                placeholder="Date de naissance"
                {...register("date_de_naissance")}
              />
            </div>
            <div>
              <label className="text-sm font-semibold">Lieu de naissance</label>
              <input
                type="text"
                className="primary"
                placeholder="Lieu de naissance"
                {...register("lieu_de_naissance")}
              />
            </div>
          </div>
          <div className="mb-2">
            <label className="text-sm font-semibold">Service</label>
            <input
              type="text"
              className="primary"
              placeholder="Service"
              {...register("service")}
            />
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div className="mb-2">
              <label className="text-sm font-semibold">Fonction</label>
              <input
                type="text"
                className="primary"
                placeholder="Fonction"
                {...register("fonction")}
              />
            </div>
            <div className="mb-2">
              <label className="text-sm font-semibold">Specialité</label>
              <input
                type="text"
                className="primary"
                placeholder="Spécialité"
                {...register("specialite")}
              />
            </div>
            <div className="mb-2">
              <label className="text-sm font-semibold">Grade</label>
              <input
                type="text"
                className="primary"
                placeholder="Grade"
                {...register("grade")}
              />
            </div>
          </div>
        </div>

        <div>
          <div className="mb-2">
            <label className="text-sm font-semibold">Email </label>
            <input
              type="email"
              className="primary"
              placeholder="Email"
              {...register("email")}
            />
          </div>
          <div className="mb-2">
            <label className="text-sm font-semibold">Numero de téléphone</label>
            <input
              type="tel"
              className="primary"
              placeholder="Numero de telephone"
              {...register("telephone")}
            />
          </div>
          <div className="mb-2">
            <label className="text-sm font-semibold">Adresse</label>
            <input
              type="text"
              className="primary"
              placeholder="Adresse"
              {...register("adresse")}
            />
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="text-sm font-semibold">Commune</label>
              <input
                type="text"
                className="primary"
                placeholder="Commune"
                {...register("commune")}
              />
            </div>
            <div>
              <label className="text-sm font-semibold">Wilaya</label>
              <select {...register("wilaya")}>
                <option>01- Adrar</option>
                <option>02- Chlef</option>
                <option>03- Laghouat</option>
                <option>04- Oum El Bouaghi</option>
                <option>05- Batna</option>
                <option>06- Béjaïa</option>
                <option>07- Biskra</option>
                <option>08- Béchar</option>
                <option>09- Blida</option>
                <option>10- Bouira</option>
                <option>11- Tamanrasset</option>
                <option>12- Tébessa</option>
                <option>13- Tlemcen</option>
                <option>14- Tiaret</option>
                <option>15- Tizi Ouzou</option>
                <option>16- Alger</option>
                <option>17- Djelfa</option>
                <option>18- Jijel</option>
                <option>19- Sétif</option>
                <option>20- Saïda</option>
                <option>21- Skikda</option>
                <option>22- Sidi Bel Abbès</option>
                <option>23- Annaba</option>
                <option>24- Guelma</option>
                <option>25- Constantine</option>
                <option>26- Médéa</option>
                <option>27- Mostaganem</option>
                <option>28- M'Sila</option>
                <option>29- Mascara</option>
                <option>30- Ouargla</option>
                <option>31- Oran</option>
                <option>32- El Bayadh</option>
                <option>33- Illizi</option>
                <option>34- Bordj Bou Arréridj</option>
                <option>35- Boumerdès</option>
                <option>36- El Tarf</option>
                <option>37- Tindouf</option>
                <option>38- Tissemsilt</option>
                <option>39- El Oued</option>
                <option>40- Khenchela</option>
                <option>41- Souk Ahras</option>
                <option>42- Tipaza</option>
                <option>43- Mila</option>
                <option>44- Aïn Defla</option>
                <option>45- Naâma</option>
                <option>46- Aïn Témouchent</option>
                <option>47- Ghardaïa</option>
                <option>48- Relizane</option>
                <option>49- Timimoun</option>
                <option>50- Bordj Badji Mokhtar</option>
                <option>51- Béni Abbès</option>
                <option>52- Ouled Djellal</option>
                <option>53- In Salah</option>
                <option>54- In Guezzam</option>
                <option>55- Touggourt</option>
                <option>56- Djanet</option>
                <option>57- El M'Ghair</option>
                <option>58- El Meniaa</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-semibold">Code postale</label>
              <input
                type="text"
                className="primary"
                placeholder="Code Postale"
                {...register("code_postale")}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-3 col-span-2">
          <button
            type="submit"
            className={`${ModalThemes[theme].color} rounded-md px-4 py-2 font-semibold text-white`}
            onClick={handleSubmit(onSubmit)}
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
