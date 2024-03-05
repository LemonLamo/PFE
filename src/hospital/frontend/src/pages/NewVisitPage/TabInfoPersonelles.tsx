import { useMemo } from "react";
import profile from "../../assets/profile.jpg";
import moment from "moment";

type TabInfoPersonnellesProps = {
  NIN: string
}

export function TabInfoPersonelles({NIN} : TabInfoPersonnellesProps) {
  const data = useMemo(()=>{
    return {
      nom: 'BRAHIM',
      prenom: 'Abderrazak',
      birthday: '13/07/2001',
      age: moment(new Date()).diff(moment('13/07/2001', 'DD/MM/YYYY'), 'years'),
      sexe: 'Male',
      situation_familiale: 'Célébataire',
      email: 'brahim.abderrazak1307@gmail.com',
      numero_telephone: ['(+213) 549297666', ],
      addresse: {
        rue: "Cité 18 logements de l'E.S.B",
        commune: "Bouzareah",
        code_postal: "16032",
        wilaya: "Alger"
      },
      contact_urgence: ['(+213) 549297666', ],
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
        <ul className="grid grid-cols-12 grid-rows-2 gap-x-2">
          <li className="flex flex-col col-span-2">
            <strong className="text-slate-700">Nom:</strong>
            <p className="mb-0">{data.nom}</p>
          </li>
          <li className="flex flex-col col-span-2">
            <strong className="text-slate-700">Prénom:</strong>
            <p className="mb-0">{data.prenom}</p>
          </li>
          <li className="flex flex-col col-span-2">
            <strong className="text-slate-700">Age:</strong>
            <p className="mb-0">{data.age}ans</p>
          </li>
          <li className="flex flex-col col-span-2">
            <strong className="text-slate-700">Date naiss:</strong>
            <p className="mb-0">{data.birthday}</p>
          </li>
          <li className="flex flex-col col-span-2">
            <strong className="text-slate-700">Sexe:</strong>
            <p className="mb-0">{data.sexe}</p>
          </li>
          <li className="flex flex-col col-span-2">
            <strong className="text-slate-700">Situation:</strong>
            <p className="mb-0">{data.situation_familiale}</p>
          </li>
          <li className="flex flex-col col-span-3">
            <strong className="text-slate-700">Email:</strong>
            <p className="mb-0">{data.email}</p>
          </li>
          <li className="flex flex-col col-span-3">
            <strong className="text-slate-700">Phone:</strong>
            <ul className="ps-4 list-disc">
              {data.numero_telephone.map((tel) => <li>{tel}</li>)}
            </ul>
          </li>
          <li className="flex flex-col col-span-3">
            <strong className="text-slate-700">Addresse:</strong>
            <p>{Object.values(data.addresse).join(', ')}</p>
          </li>
          <li className="flex flex-col col-span-3">
            <strong className="text-slate-700">Urgence:</strong>
            <ul className="ps-4 list-disc">
              {data.contact_urgence.map((tel) => <li>{tel}</li>)}
            </ul>
          </li>
        </ul>
      </div>
    </>
  );
}
