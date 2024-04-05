import Card from "../../components/UI/Card";
import Table from "../../components/UI/Tables/Table";
import TableRow from "../../components/UI/Tables/TableRow";
import TableCell from "../../components/UI/Tables/TableCell";
import DeleteButton from "../../components/UI/Buttons/DeleteButton";
import Button from "../../components/UI/Buttons/Button";
import { useState } from "react";
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

function NewPatientPage() {
  const [openModal, setOpenModal] = useState("");
  const [selected, setSelected] = useState(0);

  const [maladies_chroniques, setMaladiesChroniques] = useState<Maladie[]>([]);
  const [allergies, setAllergies] = useState<Allergie[]>([]);
  const [antecedents_medicaux, setAntecedentsMedicaux] = useState<Antecedent[]>(
    []
  );
  const [antecedents_familiaux, setAntecedentsFamiliaux] = useState<
    Antecedent[]
  >([]);

  const { register, handleSubmit } = useForm<Patient>();
  const onSubmit: SubmitHandler<Patient> = async (patient) => {
    const data = {
      ...patient,
      maladies_chroniques,
      allergies,
      antecedents_medicaux,
      antecedents_familiaux,
    };
    await axios.post(`${baseURL}/api/patients`, data);
  };
  function ajouter_maladie_chronique(maladie_chronique: Maladie) {
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

  function ajouter_allergie(allergie: Allergie) {
    setAllergies((allergies) => [...allergies!, allergie]);
    setOpenModal("");
  }
  function delete_allergie(index: number) {
    allergies!.splice(index, 1);
    setAllergies(allergies);
    setOpenModal("");
  }

  function ajouter_antecedants_medicales(antecedent_medical: Antecedent) {
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

  function ajouter_antecedants_familiales(antecedent_familial: Antecedent) {
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
    <Card
      title="Nouveau patient"
      subtitle="Création d'un nouveau dossier médical"
      className="w-full"
    >
      <form
        className="grid grid-cols-12 gap-x-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="col-span-12 md:col-span-4">
          <h6 className="mb-1"> Informations civiles</h6>
          <div className="grid grid-cols-12 gap-x-2">
            <div className="col-span-12 mb-2">
              <label className="text-sm font-semibold">NIN<span className="text-red-500">*</span></label>
              <input
                type="text"
                className="primary"
                {...register("NIN")}
                placeholder="ex. 111111111111111111"
              />
            </div>
            <div className="col-span-12 mb-2">
              <label className="text-sm font-semibold">NSS</label>
              <input
                type="text"
                className="primary"
                placeholder="ex. 111111111111111111"
              />
            </div>
            <div className="col-span-6 mb-2">
              <label className="text-sm font-semibold">Nom<span className="text-red-500">*</span></label>
              <input
                type="text"
                className="primary"
                {...register("nom")}
                placeholder="ex. Bouguerra"
              />
            </div>
            <div className="col-span-6 mb-2">
              <label className="text-sm font-semibold">Prénom<span className="text-red-500">*</span></label>
              <input
                type="text"
                className="primary"
                {...register("prenom")}
                placeholder="ex. Mohammed"
              />
            </div>
            <div className="col-span-6 mb-2">
              <label className="text-sm font-semibold">
                Date de naissance<span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                className="primary"
                {...register("date_de_naissance")}
                placeholder="Date"
              />
            </div>
            <div className="col-span-6 mb-2">
              <label className="text-sm font-semibold">
                Lieu de naissance<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="primary"
                {...register("lieu_de_naissance")}
                placeholder="ex. Alger"
              />
            </div>
            <div className="col-span-6 mb-2">
              <label className="text-sm font-semibold">Sexe<span className="text-red-500">*</span></label>
              <select {...register("sexe")}>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div className="col-span-6 mb-2">
              <label className="text-sm font-semibold">
                Situation Familiale<span className="text-red-500">*</span>
              </label>
              <select {...register("situation_familiale")}>
                <option value="Célébataire">Célébataire</option>
                <option value="Marrié(e)">Marrié(e)</option>
                <option value="Divorcé(e)">Divorcé(e)</option>
                <option value="Veuf(ve)">Veuf(e)</option>
              </select>
            </div>
          </div>

          <h6 className="mt-4 mb-1"> Information de contact</h6>
          <div className="mb-2">
            <label className="text-sm font-semibold">Email<span className="text-red-500">*</span></label>
            <input
              type="text"
              className="primary"
              placeholder="ex. bouguera.med@gmail.com"
              {...register("email")}
            />
          </div>
          <div className="mb-2">
            <label className="text-sm font-semibold">
              Numéro de téléphone<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="primary"
              placeholder="+213 549297666"
              {...register("telephone")}
            />
          </div>
        </div>

        <div className="col-span-12 md:col-span-4">
          <h6 className="mt-0 mb-1"> Informations d'adresse</h6>
          <div className="grid grid-cols-3 gap-x-2">
            <div className="col-span-3 mb-2">
              <label className="text-sm font-semibold">Adresse<span className="text-red-500">*</span></label>
              <input
                type="text"
                className="primary"
                {...register("adresse")}
                placeholder="ex. 22 BD Laichi Abdellah"
              />
            </div>
            <div className="mb-2">
              <label className="text-sm font-semibold">Commune<span className="text-red-500">*</span></label>
              <input
                type="text"
                className="primary"
                {...register("commune")}
                placeholder="ex. Bouarfa"
              />
            </div>
            <div className="mb-2">
              <label className="text-sm font-semibold">Code postale<span className="text-red-500">*</span></label>
              <input
                type="number"
                className="primary"
                {...register("code_postale")}
                placeholder="ex. 09000"
              />
            </div>
            <div className="mb-6">
              <label className="text-sm font-semibold">Wilaya<span className="text-red-500">*</span></label>
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
          </div>
          <h6 className="mb-1"> Informations Medicales</h6>
          <div className="mb-2">
            <label className="text-sm font-semibold">Groupe Sanguin<span className="text-red-500">*</span></label>
            <select {...register("groupage")}>
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
              <label className="text-sm font-semibold">Taille<span className="text-red-500">*</span></label>
              <div className="flex items-center">
                <input
                  className="primary mb-2"
                  {...register("taille")}
                  placeholder="170"
                  type="number"
                />
                <span className="w-6 ms-2 text-right"> cm</span>
              </div>
            </div>
            <div className="mb-2">
              <label className="text-sm font-semibold">Poids<span className="text-red-500">*</span></label>
              <div className="flex items-center">
                <input
                  className="primary mb-2"
                  {...register("poids")}
                  placeholder="72.8"
                  type="number"
                  step="0.01"
                />
                <span className="w-6 ms-2 text-right"> kg</span>
              </div>
            </div>
            <div className="mb-3 pl-7 col-span-2">
              <input id="chk" type="checkbox" {...register("donneur_organe")}className="checkbox"></input>
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
              className="primary"
              {...register("NIN_pere")}
              placeholder="ex. 111111111111111111"
            />
          </div>
          <div className="col-span-12 mb-2">
            <label className="text-sm font-semibold">Mère</label>
            <input
              type="text"
              className="primary"
              {...register("NIN_mere")}
              placeholder="ex. 111111111111111111"
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
              theme="primary-alternate"
            >
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
