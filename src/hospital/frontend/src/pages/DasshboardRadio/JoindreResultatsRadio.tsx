import moment from "moment";
import Modal, { ModalThemes } from "../../components/UI/Modal";
import { useContext, useState } from "react";
import AlertsContext from "../../hooks/AlertsContext";
import { joindre_resultat_radio } from "../../hooks/useRadios";

type Props = {
  isOpen: boolean;
  close: () => void;
  selectedRadio: Radio;
};

export default function JoindreResultatsRadio({
  isOpen,
  close,
  selectedRadio,
}: Props) {
  const [radios, setRadios] = useState<File[]>([]);
  const [observations, setObservations] = useState("");

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files) setRadios([...event.target.files]);
  }

  function deleteUploadedFile(index: number) {
    const newRadios = [...radios];
    newRadios.splice(index, 1);
    setRadios(newRadios);
  }

  async function submit() {
    const formData = new FormData();
    radios.forEach((radio) => formData.append(`radios`, radio));
    formData.append(`observations`, observations);

    const config = { headers: { "content-type": "multipart/form-data" } };
    try {
      const response = await axios.post(
        `${baseURL}/api/radios/${selectedRadio.id}`,
        formData,
        config
      );
      console.log(response.data);
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <Modal isOpen={isOpen} theme="primary" size="sm:max-w-2xl">
      <div className="overflow-auto w-full h-full flex flex-col">
        <div className="flex justify-between border-b border-gray-200 pb-2">
          <div className="text-xl font-bold">{selectedRadio.designation}</div>
          <div className="font-bold">{selectedRadio.id}</div>
        </div>

        <div className="flex mb-2 mt-4">
          <div className="w-1/4 font-bold">Patient:</div>
          <div className="w-3/4 font-medium">
            {selectedRadio.patient.nom} {selectedRadio.patient.prenom} /{" "}
            {selectedRadio.patient.NIN}
          </div>
        </div>

        <div className="flex mb-2">
          <div className="w-1/4 font-bold">Age:</div>
          <div className="w-3/4 font-medium">
            {moment(new Date()).diff(
              moment(selectedRadio.patient.date_de_naissance),
              "years"
            )}{" "}
            ans
          </div>
        </div>

        <div className="flex mb-2">
          <div className="w-1/4 font-bold">Sexe:</div>
          <div className="w-3/4 font-medium">{selectedRadio.patient.sexe}</div>
        </div>

        <div className="flex mb-2">
          <div className="w-1/4 font-bold">Observations:</div>
        </div>
        <textarea
          className="primary"
          rows={3}
          placeholder="Observations"
          value={observations}
          onChange={(e) => setObservations(e.target.value)}
        />

        <div className="border-dashed border-2 border-gray-400 mt-2 py-4 flex flex-col justify-center items-center">
          <label htmlFor="fileupload" className="mb-3 text-center">
            <i>
              <svg
                className="fill-current w-12 h-12 mb-3 text-cyan-400"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M19.479 10.092c-.212-3.951-3.473-7.092-7.479-7.092-4.005 0-7.267 3.141-7.479 7.092-2.57.463-4.521 2.706-4.521 5.408 0 3.037 2.463 5.5 5.5 5.5h13c3.037 0 5.5-2.463 5.5-5.5 0-2.702-1.951-4.945-4.521-5.408zm-7.479-1.092l4 4h-3v4h-2v-4h-3l4-4z" />
              </svg>
            </i>
            <div className="font-semibold text-gray-900">
              Glissez-déposez vos fichiers n'importe où
            </div>
            <div className="font-semibold text-gray-900">ou bien</div>
            <div className="mt-2">
              <span
                id="button"
                className="mt-2 rounded-sm px-3 py-1 bg-gray-100 hover:bg-gray-300 focus:shadow-outline focus:outline-none"
              >
                {" "}
                Choisir un fichier{" "}
              </span>
            </div>
          </label>
          <input
            id="fileupload"
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            onChange={handleChange}
          />
        </div>

        <h1 className="pt-6 pb-3 font-semibold sm:text-lg text-gray-900">
          Radios
        </h1>
        <div
          className="flex flex-1 flex-wrap bg-no-repeat bg-opacity- bg-center min-h-40 gap-4"
          style={{
            backgroundImage:
              "url('https://user-images.githubusercontent.com/507615/54591670-ac0a0180-4a65-11e9-846c-e55ffce0fe7b.png')",
          }}
        >
          {radios?.map((x, i) => (
            <div key={i} className="block h-40 w-32">
              <div className="group w-full h-full rounded-md focus:outline-none focus:shadow-outline elative bg-gray-100 cursor-pointer relative shadow-sm">
                <div className="text-xs break-words w-full absolute bottom-0">
                  <div className="flex items-center justify-between px-2 pb-1 gap-1">
                    <i className="fa fa-file text-red-600 text-sm" />
                    <span className="text-cyan-700 text-sm truncate">
                      {" "}
                      {x.name}{" "}
                    </span>
                    <button
                      className="focus:outline-none text-gray-800 pl-2"
                      onClick={() => deleteUploadedFile(i)}
                    >
                      <i className="fa fa-trash text-sm" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-end gap-3 mt-4">
        <button
          type="button"
          className={`${ModalThemes["primary"].color} rounded-md px-4 py-2 font-semibold text-white`}
          onClick={() => submit()}
        >
          Upload
        </button>
        <button
          type="button"
          className="bg-white px-3 font-semibold text-gray-900 ring-gray-300 hover:bg-gray-50"
          onClick={close}
        >
          Annuler
        </button>
      </div>
    </Modal>
  );
}
