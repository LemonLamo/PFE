import moment from "moment";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import TableError from "../../../components/UI/Tables/TableError";
import TableLoading from "../../../components/UI/Loading";
import { baseURL } from "../../../config";
import Avatar from "../../../components/Avatar";

type Props = {
  NIN: string;
};

function TabInfoPersonelles({ NIN }: Props) {
  const profile = useQuery<Patient>({
    queryKey: ["patient" + NIN],
    queryFn: async () => {
      const data = (await axios.get(`${baseURL}/api/patients/${NIN}`)).data;
      return data;
    },
  });

  return (
    <>
      <h3 className="text-lg mb-0">Informations personnelles</h3>
      <p className="mb-4">Ci-dessous les informations civiles et personnelles du patient</p>
      <div className="flex flex-row gap-x-8 w-full mb-3">
        {profile.isError ? (
          <TableError msg={(profile.error as any).response.data?.errorMessage} />
        ) : profile.isLoading ? (
          <TableLoading />
        ) : (
          <>
            <div className="">
              <Avatar src={`${baseURL}/api/patients/${NIN}/avatar`} alt="profile_picture" style={{ width: "9.25rem", aspectRatio: 3.5 / 4.5 }}/>
            </div>
            <div className="grid grid-cols-12 gap-x-2">
              <div className="col-span-3">
                <strong className="text-slate-700">Nom :</strong>
                <p className="">{profile.data?.nom}</p>

                <strong className="text-slate-700">Prénom :</strong>
                <p className="">{profile.data?.prenom}</p>

                <strong className="text-slate-700">
                  Date et lieu de naissance:
                </strong>
                <p className="">
                  {[profile.data?.date_de_naissance && moment(profile.data?.date_de_naissance).format("DD/MM/YYYY"), profile.data?.lieu_de_naissance].filter(Boolean).join(', ')}
                </p>
              </div>
              <div className="col-span-3">
                <strong className="text-slate-700">Age :</strong>
                <p className="">
                  {profile.data?.date_de_naissance && `${moment(new Date()).diff(moment(profile.data?.date_de_naissance),"years")} ans`}
                </p>

                <strong className="text-slate-700">Sexe :</strong>
                <p className="">{profile.data?.sexe}</p>

                <strong className="text-slate-700">Situation familiale :</strong>
                <p className="">{profile.data?.situation_familiale}</p>
              </div>
              <div className="col-span-4">
                <strong className="text-slate-700">Email :</strong>
                <p className="">{profile.data?.email}</p>

                <strong className="text-slate-700">Téléphone :</strong>
                <p className="">{profile.data?.telephone}</p>

                <strong className="text-slate-700">Addresse :</strong>
                <p className="">
                  {[profile.data?.adresse, profile.data?.commune, profile.data?.code_postale, profile.data?.wilaya].filter(Boolean).join(", ")}
                </p>
              </div>
              <div className="col-span-2">
                <strong className="text-slate-700">Groupage :</strong>
                <p className="">{profile.data?.groupage}</p>

                <strong className="text-slate-700">Taille :</strong>
                <p className="">{profile.data?.taille && `${profile.data?.taille}cm`}</p>

                <strong className="text-slate-700">Poids :</strong>
                <p className="">{profile.data?.poids && `${profile.data?.poids}kg`}</p>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default TabInfoPersonelles;
