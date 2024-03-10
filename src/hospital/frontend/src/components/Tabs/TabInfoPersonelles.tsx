import { useMemo } from "react";
import profile from "../../assets/profile.jpg";
import moment from "moment";

type TabInfoPersonnellesProps = {
  NIN: string
}

function TabInfoPersonelles({NIN} : TabInfoPersonnellesProps) {
  const data = useMemo(()=>{
    return {
      NIN: "100010364027390000",
      nom: "BRAHIM",
      prenom: "Abderrazak",
      sexe: "Male",
      situation_familiale: "Célébataire",
      date_naissance: new Date('2001-07-13'),
      lieu_naissance: "Tebessa",
      email: "brahim.abderrazak1307@gmail.com",
      telephone: "0799771062",
      addresse: "22 BD Laichi Abdellah, Bouarfa, 09001, Blida",
    }
  }, [NIN])

  return (
    <>
      <h3 className="text-lg font-bold text-gray-900 mb-0">Informations personnelles</h3>
      <p className="mb-4">This is some placeholder content the Profile tab's associated content, clicking another tab will toggle the visibility of this one for the next.</p>
      <div className="flex flex-row gap-x-2 w-full">
        <div className="">
          <img src={profile} style={{
            width: "10rem",
            aspectRatio: 3.5 / 4.5
          }} />
        </div>
        <div className="grid grid-cols-12 gap-x-2">
          <div className="col-span-3">
            <strong className="text-slate-700">Nom:</strong>
            <p className="">{data.nom}</p>

            <strong className="text-slate-700">Prénom:</strong>
            <p className="">{data.prenom}</p>

            <strong className="text-slate-700">Date et lieu de naissance:</strong>
            <p className="">{moment(data.date_naissance).format('DD/MM/YYYY')}, {data.lieu_naissance}</p>

          </div>
          <div className="col-span-2">
            <strong className="text-slate-700">Age:</strong>
            <p className="">{moment(new Date()).diff(moment(data.date_naissance), 'years')} ans</p>

            <strong className="text-slate-700">Sexe:</strong>
            <p className="">{data.sexe}</p>

            <strong className="text-slate-700">Situation familiale:</strong>
            <p className="">{data.situation_familiale}</p>

          </div>
          <div className="col-span-4">
            <strong className="text-slate-700">Email:</strong>
            <p className="">{data.email}</p>

            <strong className="text-slate-700">Téléphone:</strong>
            <p className="">{data.telephone}</p>

            <strong className="text-slate-700">Addresse:</strong>
            <p className="">{data.addresse}</p>
          </div>
          <div className="col-span-3">
            <strong className="text-slate-700">Groupage:</strong>
            <p className="">B+</p>

            <strong className="text-slate-700">Taille:</strong>
            <p className="">181cm</p>

            <strong className="text-slate-700">Poids:</strong>
            <p className="">88.8kg</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default TabInfoPersonelles