import Card from "../../components/UI/Card";
import Table from "../../components/UI/Tables/Table";
import TableRow from "../../components/UI/Tables/TableRow";
import TableCell from "../../components/UI/Tables/TableCell";
import DeleteButton from "../../components/UI/Buttons/DeleteButton";
import Button from "../../components/UI/Buttons/Button";
import { useContext, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { baseURL } from "../../config";
import AjouterAllergie from "../PatientPage/Modals/AjouterAllergie";
import AjouterMaladieChronique from "../PatientPage/Modals/AjouterMaladieChronique";
import DeleteMaladieChroique from "../PatientPage/Modals/DeleteMaladieChroique";
import DeleteAllergie from "../PatientPage/Modals/DeleteAllergie";
import AjouterAntecedentMedical from "../PatientPage/Modals/AjouterAntecedentMedical";
import DeleteAntecedentMedical from "../PatientPage/Modals/DeleteAntecedentMedical";
import AjouterAntecedentFamilial from "../PatientPage/Modals/AjouterAntecedentFamilial";
import DeleteAntecedentFamilial from "../PatientPage/Modals/DeleteAntecedentFamilial";
import moment from "moment";
import AlertsContext from "../../hooks/AlertsContext";

function NewPatientPage() {
  const { showAlert } = useContext(AlertsContext);
  const [openModal, setOpenModal] = useState("");
  const [selected, setSelected] = useState(0);
  
  const { register, handleSubmit, reset, formState: {errors} } = useForm<Patient>();
  const [avatar, setAvatar] = useState<File>();
  const [maladies_chroniques, setMaladiesChroniques] = useState<Maladie[]>([]);
  const [allergies, setAllergies] = useState<Allergie[]>([]);
  const [antecedents_medicaux, setAntecedentsMedicaux] = useState<Antecedent[]>([]);
  const [antecedents_familiaux, setAntecedentsFamiliaux] = useState<Antecedent[]>([]);
  
  const onSubmit: SubmitHandler<Patient> = async (patient) => {
    const data : Record<string, any> = {
      ...patient,
    };

    try {
      if(!confirm("Êtes-vous sûr de vouloir continuer? Cette action est irréversible et ces données ne pourront plus être modifiées par la suite."))
        return;

      const formData = new FormData();
      Object.keys(data).forEach((key) => formData.append(key, data[key]));
      maladies_chroniques.forEach((val) => formData.append('maladies_chroniques[]', JSON.stringify(val)))
      allergies.forEach((val) => formData.append('allergies[]', JSON.stringify(val)))
      antecedents_medicaux.forEach((val) => formData.append('antecedents_medicaux[]', JSON.stringify(val)))
      antecedents_familiaux.forEach((val) => formData.append('antecedents_familiaux[]', JSON.stringify(val)))
      formData.append('avatar', avatar!);

      console.log(formData)

      const config = { headers: {'content-type': 'multipart/form-data'} }
      await axios.post(`${baseURL}/api/patients`, formData, config);
      reset();
      showAlert("success", "Patient ajouté correctement");
    } catch (error: any) {
      if (error.response)
        if (error.response?.data?.errorCode != "form-validation")
          showAlert("error", error.response.data.errorCode + ": " + error.response.data.errorMessage);
        else showAlert("error", error.code + ": " + error.message);
    }
  };
  const handleFileChange = (event : any) => setAvatar(event.target.files[0])

  async function ajouter_maladie_chronique(maladie_chronique: Maladie) {
    setMaladiesChroniques((maladies_chroniques) => [
      ...maladies_chroniques!,
      maladie_chronique,
    ]);
    setOpenModal("");
  }
  function delete_maladie_chronique(index: number) {
    maladies_chroniques!.splice(index, 1);
    setMaladiesChroniques(maladies_chroniques);
    setOpenModal("");
  }

  async function ajouter_allergie(allergie: Allergie) {
    setAllergies((allergies) => [...allergies!, allergie]);
    setOpenModal("");
  }
  function delete_allergie(index: number) {
    allergies!.splice(index, 1);
    setAllergies(allergies);
    setOpenModal("");
  }

  async function ajouter_antecedants_medicales(antecedent_medical: Antecedent) {
    setAntecedentsMedicaux((antecedents_medicaux) => [
      ...antecedents_medicaux!,
      antecedent_medical,
    ]);
    setOpenModal("");
  }
  function delete_antecedants_medicales(index: number) {
    antecedents_medicaux!.splice(index, 1);
    setAntecedentsMedicaux(antecedents_medicaux);
    setOpenModal("");
  }

  async function ajouter_antecedants_familiales(antecedent_familial: Antecedent) {
    setAntecedentsFamiliaux((antecedent_familiaux) => [
      ...antecedent_familiaux!,
      antecedent_familial,
    ]);
    setOpenModal("");
  }
  function delete_antecedants_familiales(index: number) {
    antecedents_familiaux!.splice(index, 1);
    setAntecedentsFamiliaux(antecedents_familiaux);
    setOpenModal("");
  }
  return (
    <Card title="Nouveau patient" subtitle="Création d'un nouveau dossier médical" className="w-full">
      <form className="grid grid-cols-12 gap-x-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="col-span-12 md:col-span-4">
          <h6 className="mb-1"> Informations civiles</h6>
          <div className="grid grid-cols-12 gap-x-2">
            <div className="col-span-12 mb-1">
              <label className="text-sm font-semibold">Avatar</label>
              <input className="primary" type="file" onChange={handleFileChange} accept="image/*" />
            </div>
            <div className="col-span-12 mb-2">
              <label className="text-sm font-semibold"> NIN<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className={`primary ${errors.NIN && 'has-error'}`}
                {...register("NIN", {required: true})}
                placeholder="Numéro d'identification national"
              />
            </div>
            <div className="col-span-12 mb-2">
              <label className="text-sm font-semibold">NSS</label>
              <input
                type="text"
                className="primary"
                placeholder="Numéro de sécurité sociale"
              />
            </div>
            <div className="col-span-6 mb-2">
              <label className="text-sm font-semibold">
                Nom<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className={`primary ${errors.nom && 'has-error'}`}
                {...register("nom", {required: true})}
                placeholder="Nom de famille"
              />
            </div>
            <div className="col-span-6 mb-2">
              <label className="text-sm font-semibold">
                Prénom<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className={`primary ${errors.prenom && 'has-error'}`}
                {...register("prenom", {required: true})}
                placeholder="Prénom"
              />
            </div>
            <div className="col-span-6 mb-2">
              <label className="text-sm font-semibold">
                Date de naissance<span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                className={`primary ${errors.date_de_naissance && 'has-error'}`}
                {...register("date_de_naissance", {required: true})}
                placeholder="Date"
              />
            </div>
            <div className="col-span-6 mb-2">
              <label className="text-sm font-semibold">
                Lieu de naissance<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className={`primary ${errors.lieu_de_naissance && 'has-error'}`}
                {...register("lieu_de_naissance", {required: true})}
                placeholder="Wilaya"
              />
            </div>
            <div className="col-span-6 mb-2">
              <label className="text-sm font-semibold">
                Sexe<span className="text-red-500">*</span>
              </label>
              <select {...register("sexe", {required: true})} className={`primary ${errors.sexe && 'has-error'}`}>
                <option value="Homme">Homme</option>
                <option value="Femme">Femme</option>
              </select>
            </div>
            <div className="col-span-6 mb-2">
              <label className="text-sm font-semibold">
                Situation Familiale<span className="text-red-500">*</span>
              </label>
              <select {...register("situation_familiale", {required: true})} className={`primary ${errors.situation_familiale && 'has-error'}`}>
                <option value="Célébataire">Célébataire</option>
                <option value="Marrié(e)">Marrié(e)</option>
                <option value="Divorcé(e)">Divorcé(e)</option>
                <option value="Veuf(ve)">Veuf(e)</option>
              </select>
            </div>
          </div>

          <h6 className="mt-4 mb-1"> Information de contact</h6>
          <div className="mb-2">
            <label className="text-sm font-semibold">
              Email<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className={`primary ${errors.email && 'has-error'}`}
              placeholder="Adresse e-mail"
              {...register("email", {required: true})}
            />
          </div>
          <div className="mb-2">
            <label className="text-sm font-semibold">
              Numéro de téléphone<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className={`primary ${errors.telephone && 'has-error'}`}
              placeholder="Numéro de téléphone"
              {...register("telephone", {required: true})}
            />
          </div>
        </div>

        <div className="col-span-12 md:col-span-4">
          <h6 className="mt-0 mb-1"> Informations d'adresse</h6>
          <div className="grid grid-cols-3 gap-x-2">
            <div className="col-span-3 mb-2">
              <label className="text-sm font-semibold">
                Adresse<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className={`primary ${errors.adresse && 'has-error'}`}
                {...register("adresse", {required: true})}
                placeholder="Adresse du patient"
              />
            </div>
            <div className="mb-2">
              <label className="text-sm font-semibold">
                Commune<span className="text-red-500">*</span>
              </label>
              <input type="text"
                className={`primary ${errors.commune && 'has-error'}`}
                {...register("commune", {required: true})}
                placeholder="Commune" />
            </div>
            <div className="mb-2">
              <label className="text-sm font-semibold">
                Code postale<span className="text-red-500">*</span>
              </label>
              <input type="number"
                className={`primary ${errors.code_postale && 'has-error'}`}
                {...register("code_postale", {required: true})}
                placeholder="ex. 16000"/>
            </div>
            <div className="mb-6">
              <label className="text-sm font-semibold">
                Wilaya<span className="text-red-500">*</span>
              </label>
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
          </div>
          <h6 className="mb-1"> Informations Medicales</h6>
          <div className="mb-2">
            <label className="text-sm font-semibold">
              Groupe Sanguin<span className="text-red-500">*</span>
            </label>
            <select {...register("groupage", {required: true})} className={`primary ${errors.groupage && 'has-error'}`}>
              <option>A+</option>
              <option>A-</option>
              <option>B+</option>
              <option>B-</option>
              <option>AB+</option>
              <option>AB-</option>
              <option>O+</option>
              <option>O-</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-x-2">
            <div className="mb-2">
              <label className="text-sm font-semibold">
                Taille<span className="text-red-500">*</span>
              </label>
              <div className="flex items-center">
                <input
                  className={`primary mb-2 ${errors.taille && 'has-error'}`}
                  {...register("taille", {required: true})}
                  placeholder="Taille (en cm)"
                  type="number"
                />
                <span className="w-6 ms-2 text-right"> cm</span>
              </div>
            </div>
            <div className="mb-2">
              <label className="text-sm font-semibold">
                Poids<span className="text-red-500">*</span>
              </label>
              <div className="flex items-center">
                <input
                  className={`primary mb-2 ${errors.poids && 'has-error'}`}
                  {...register("poids", {required: true})}
                  placeholder="Poids (en kg)"
                  type="number"
                  step="0.01"
                />
                <span className="w-6 ms-2 text-right"> kg</span>
              </div>
            </div>
            <div className="mb-3 pl-7 col-span-2">
              <input
                id="chk"
                type="checkbox"
                className="checkbox"
                {...register("donneur_organe")}
              ></input>
              <label htmlFor="chk" className="select-none text-slate-700">
                Donneur d'organes?
              </label>
            </div>
          </div>
          <h6 className="mb-1"> Parents</h6>
          <div className="col-span-12 mb-2">
            <label className="text-sm font-semibold">Père</label>
            <input
              type="text"
              className={`primary ${errors.NIN_pere && 'has-error'}`}
              {...register("NIN_pere")}
              placeholder="Numéro d'identification national du père"
            />
          </div>
          <div className="col-span-12 mb-2">
            <label className="text-sm font-semibold">Mère</label>
            <input
              type="text"
              className={`primary ${errors.NIN_mere && 'has-error'}`}
              {...register("NIN_mere")}
              placeholder="Numéro d'identification national de la mère"
            />
          </div>
        </div>

        <div className="col-span-12 md:col-span-4">
          <div className="mb-0 flex justify-between">
            <h6 className="mb-1">Maladies chroniques</h6>
            <Button
              type="button"
              className="h-8"
              onClick={() => setOpenModal("ajouter_maladie_chronique")}
              theme="primary-alternate">
              <i className="fa fa-plus" />
              <span className="ms-2">Ajouter</span>
            </Button>
          </div>
          <Table fields={["#", "Nom", "Date", "Remarques"]} className="mb-4">
            {maladies_chroniques?.map((x, i) => (
              <TableRow key={i}>
                <TableCell>{x.code_maladie}</TableCell>
                <TableCell>{x.designation}</TableCell>
                <TableCell>{moment(x.date).format("DD/MM/YYYY")}</TableCell>
                <TableCell>{x.remarques}</TableCell>
                <TableCell className="text-right">
                  <DeleteButton
                    onClick={() => {
                      setSelected(i);
                      setOpenModal("delete_maladie_chronique");
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </Table>
          <AjouterMaladieChronique
            isOpen={openModal === "ajouter_maladie_chronique"}
            action={ajouter_maladie_chronique}
            close={() => setOpenModal("")}
          />
          <DeleteMaladieChroique
            isOpen={openModal === "delete_maladie_chronique"}
            action={() => delete_maladie_chronique(selected)}
            close={() => setOpenModal("")}
          />

          <div className="mb-0 flex justify-between">
            <h6 className="mb-1">Allergies</h6>
            <Button
              type="button"
              className="h-8"
              onClick={() => setOpenModal("ajouter_allergie")}
              theme="primary-alternate"
            >
              <i className="fa fa-plus" />
              <span className="ms-2">Ajouter</span>
            </Button>
          </div>
          <Table
            fields={["#", "Nom", "Date", "Remarques", ""]}
            className="mb-4"
          >
            {allergies?.map((x, i) => (
              <TableRow key={i}>
                <TableCell>{x.code_allergene}</TableCell>
                <TableCell>{x.designation}</TableCell>
                <TableCell>{moment(x.date).format("DD/MM/YYYY")}</TableCell>
                <TableCell>{x.remarques}</TableCell>
                <TableCell className="text-right">
                  <DeleteButton
                    onClick={() => {
                      setSelected(i);
                      setOpenModal("delete_allergie");
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </Table>
          <AjouterAllergie
            isOpen={openModal === "ajouter_allergie"}
            action={ajouter_allergie}
            close={() => setOpenModal("")}
          />
          <DeleteAllergie
            isOpen={openModal === "delete_allergie"}
            action={() => delete_allergie(selected)}
            close={() => setOpenModal("")}
          />

          <div className="mb-0 flex justify-between">
            <h6 className="mb-1">Antécédants Médicales</h6>
            <Button
              type="button"
              className="h-8"
              onClick={() => setOpenModal("ajouter_antecedants_medicales")}
              theme="primary-alternate"
            >
              <i className="fa fa-plus" />
              <span className="ms-2">Ajouter</span>
            </Button>
          </div>
          <Table
            fields={["Designation", "Date", "Remarques", ""]}
            className="mb-4"
          >
            {antecedents_medicaux?.map((x, i) => (
              <TableRow key={i}>
                <TableCell>{x.designation}</TableCell>
                <TableCell>{moment(x.date).format("DD/MM/YYYY")}</TableCell>
                <TableCell>{x.remarques}</TableCell>
                <TableCell className="text-right">
                  <DeleteButton
                    onClick={() => {
                      setSelected(i);
                      setOpenModal("delete_antecedants_medicales");
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </Table>
          <AjouterAntecedentMedical
            isOpen={openModal === "ajouter_antecedants_medicales"}
            action={ajouter_antecedants_medicales}
            close={() => setOpenModal("")}
          />
          <DeleteAntecedentMedical
            isOpen={openModal === "delete_antecedants_medicales"}
            action={() => delete_antecedants_medicales(selected)}
            close={() => setOpenModal("")}
          />

          <div className="mb-0 flex justify-between">
            <h6 className="mb-0">Antécédants Familiaux</h6>
            <Button
              type="button"
              className="h-8"
              onClick={() => setOpenModal("ajouter_antecedants_familiales")}
              theme="primary-alternate"
            >
              <i className="fa fa-plus" />
              <span className="ms-2">Ajouter</span>
            </Button>
          </div>
          <Table
            fields={["Designation", "Date", "Remarques", ""]}
            className="mb-4"
          >
            {antecedents_familiaux?.map((x, i) => (
              <TableRow key={i}>
                <TableCell>{x.designation}</TableCell>
                <TableCell>{moment(x.date).format("DD/MM/YYYY")}</TableCell>
                <TableCell>{x.remarques}</TableCell>
                <TableCell className="text-right">
                  <DeleteButton
                    onClick={() => {
                      setSelected(i);
                      setOpenModal("delete_antecedants_familiales");
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </Table>
          <AjouterAntecedentFamilial
            isOpen={openModal === "ajouter_antecedants_familiales"}
            action={ajouter_antecedants_familiales}
            close={() => setOpenModal("")}
          />
          <DeleteAntecedentFamilial
            isOpen={openModal === "delete_antecedants_familiales"}
            action={() => delete_antecedants_familiales(selected)}
            close={() => setOpenModal("")}
          />
        </div>
        <div className="col-span-12 w-full flex justify-end">
          <input
            type="submit"
            value="Ajouter"
            className="flex items-center justify-center py-2 px-4 bg-transparent text-sky-600 font-semibold border border-sky-600 rounded hover:bg-sky-400 hover:text-white hover:border-transparent transition ease-in duration-50 transform hover:-translate-y-1 active:translate-y-0"
          />
        </div>
      </form>
    </Card>
  );
}

export default NewPatientPage;
