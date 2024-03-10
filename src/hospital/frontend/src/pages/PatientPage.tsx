import { useMemo } from "react";
import { useParams } from "react-router-dom";
import Card from "../components/UI/Card";
import photo_profile from "../assets/profile.jpg";
import moment from "moment";
import TabHistorique from "../components/Tabs/TabHistorique";
import TabContent from "../components/UI/Tabs/TabContent";
import Tabs from "../components/UI/Tabs/Tabs";

function PatientPage() {
    const { NIN } = useParams();
    const profile = useMemo<Patient>(()=>{
        return {
            NIN: "100010364027390000",
            nom: "BRAHIM",
            prenom: "Abderrazak",
            date_naissance: new Date("2002-05-12"),
            lieu_naissance: "Tebessa",
            situation_familiale: "Célébataire",
            sexe: "Female",
            addresse: "39 HAI MOUHOUS",
            email: "brahim.abderrazak1307@gmail.com",
            telephone: "0799771062",
        }
    }, [NIN])

    return (
        <Card title={`Dossier médicale de "${profile.nom} ${profile.prenom}"`} subtitle="Une liste de tous les patients du service" className="w-full">
            <h3 className="text-lg font-bold text-gray-900 mb-3">Informations personnelles</h3>
            <div className="flex flex-row gap-x-4 w-full mb-3">
                <div className="">
                    <img src={photo_profile} style={{ width: "9.25rem", aspectRatio: 3.5 / 4.5 }} />
                </div>
                <div className="grid grid-cols-12 gap-x-2">
                    <div className="col-span-3">
                        <strong className="text-slate-700">Nom:</strong>
                        <p className="">{profile.nom}</p>

                        <strong className="text-slate-700">Prénom:</strong>
                        <p className="">{profile.prenom}</p>

                        <strong className="text-slate-700">Date et lieu de naissance:</strong>
                        <p className="">{moment(profile.date_naissance).format('DD/MM/YYYY')}, {profile.lieu_naissance}</p>

                    </div>
                    <div className="col-span-2">
                        <strong className="text-slate-700">Age:</strong>
                        <p className="">{moment(new Date()).diff(moment(profile.date_naissance), 'years')} ans</p>

                        <strong className="text-slate-700">Sexe:</strong>
                        <p className="">{profile.sexe}</p>

                        <strong className="text-slate-700">Situation familiale:</strong>
                        <p className="">{profile.situation_familiale}</p>

                    </div>
                    <div className="col-span-4">
                        <strong className="text-slate-700">Email:</strong>
                        <p className="">{profile.email}</p>

                        <strong className="text-slate-700">Téléphone:</strong>
                        <p className="">{profile.telephone}</p>

                        <strong className="text-slate-700">Addresse:</strong>
                        <p className="">{profile.addresse}</p>
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
            <Tabs type="horizontal">
                <TabContent icon="fa fa-user" text="Vaccinations">
                    Work in progress
                </TabContent>
                <TabContent icon="fa fa-user" text="Antécédents">
                    Work in progress
                </TabContent>
                <TabContent icon="fa fa-user" text="Allergies">
                    Work in progress
                </TabContent>
                <TabContent icon="fa fa-user" text="Médicaments">
                    Work in progress
                </TabContent>
                <TabContent icon="fa fa-user" text="Historique">
                    <TabHistorique NIN={NIN!} />
                </TabContent>
            </Tabs>
        </Card>
    )
}

export default PatientPage