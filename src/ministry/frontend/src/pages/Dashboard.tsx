import Card from "../components/UI/Card";
import TabInfoPersonelles from "../components/Tabs/TabInfoPersonelles";
import Tabs from "../components/UI/Tabs/Tabs";
import TabContent from "../components/UI/Tabs/TabContent";
import TabMaladiesChroniques from "../components/Tabs/TabMaladiesChroniques";
import TabAllergies from "../components/Tabs/TabAllergies";
import TabAntecedentsMedicales from "../components/Tabs/TabAntecedentsMedicales";
import TabAntecedentsFamiliaux from "../components/Tabs/TabAntecedentsFamiliaux";
import TabMedicaments from "../components/Tabs/TabMedicaments";
import TabVaccinations from "../components/Tabs/TabVaccinations";
import TabHistorique from "../components/Tabs/TabHistorique";

function Dashboard(){
    const NIN = "100010364027390000";

    return <>
        <Card className="w-full">
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
    </>
}

export default Dashboard;