import { useParams } from "react-router-dom";
import Card from "../components/UI/Card";
import Tabs from "../components/UI/Tabs/Tabs";
import TabContent from "../components/UI/Tabs/TabContent";
import TabInfoPersonelles from "../components/Tabs/TabInfoPersonelles";
import TabMaladiesChroniques from "../components/Tabs/TabMaladiesChroniques";
import TabAllergies from "../components/Tabs/TabAllergies";
import TabAntecedentsMedicales from "../components/Tabs/TabAntecedentsMedicales";
import TabAntecedentsFamiliaux from "../components/Tabs/TabAntecedentsFamiliaux";
import TabMedicaments from "../components/Tabs/TabMedicaments";
import TabVaccinations from "../components/Tabs/TabVaccinations";
import TabHistorique from "../components/Tabs/TabHistorique";

function PatientPage() {
    const { NIN } = useParams();
    
    return (
        <Card title={`Dossier médicale N°${NIN}`} className="w-full">
            <TabInfoPersonelles NIN={NIN!} />
            <Tabs type="horizontal">
                <TabContent icon="fa fa-user" text="Maladies chroniques">
                    <TabMaladiesChroniques NIN={NIN!} />
                </TabContent>
                <TabContent icon="fa fa-user" text="Allergies">
                    <TabAllergies NIN={NIN!} />
                </TabContent>
                <TabContent icon="fa fa-user" text="Antécédents Médicales">
                    <TabAntecedentsMedicales NIN={NIN!} />
                </TabContent>
                <TabContent icon="fa fa-user" text="Antécédents Familiales">
                    <TabAntecedentsFamiliaux NIN={NIN!} />
                </TabContent>
                <TabContent icon="fa fa-user" text="Médicaments">
                    <TabMedicaments NIN={NIN!} />
                </TabContent>
                <TabContent icon="fa fa-user" text="Vaccinations">
                    <TabVaccinations NIN={NIN!}/>
                </TabContent>
                <TabContent icon="fa fa-user" text="Historique">
                    <TabHistorique NIN={NIN!} />
                </TabContent>
            </Tabs>
        </Card>
    )
}

export default PatientPage