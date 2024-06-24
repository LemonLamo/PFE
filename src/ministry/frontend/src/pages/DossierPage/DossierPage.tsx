import Card from "../../components/UI/Card";
import TabInfoPersonelles from "./Tabs/TabInfoPersonelles";
import Tabs from "../../components/UI/Tabs/Tabs";
import TabContent from "../../components/UI/Tabs/TabContent";
import TabMaladiesChroniques from "./Tabs/TabMaladiesChroniques";
import TabAllergies from "./Tabs/TabAllergies";
import TabAntecedentsMedicales from "./Tabs/TabAntecedentsMedicales";
import TabAntecedentsFamiliaux from "./Tabs/TabAntecedentsFamiliaux";
import TabMedicaments from "./Tabs/TabMedicaments";
import TabVaccinations from "./Tabs/TabVaccinations";
import TabHistorique from "./Tabs/TabHistorique";
import { useContext } from "react";
import AuthContext from "../../hooks/AuthContext";
import TabHandicaps from "./Tabs/TabHandicaps";

function DossierPage(){
    const auth = useContext(AuthContext)

    return <>
        <Card className="w-full">
            <TabInfoPersonelles NIN={auth!.NIN!} />
            <Tabs type="horizontal">
                <TabContent icon="fa fa-timeline" text="Historique">
                    <TabHistorique NIN={auth!.NIN!} />
                </TabContent>
                <TabContent icon="fa fa-virus" text="Maladies chroniques">
                    <TabMaladiesChroniques NIN={auth!.NIN!} />
                </TabContent>
                <TabContent icon="fa fa-person-dots-from-line" text="Allergies">
                    <TabAllergies NIN={auth!.NIN!} />
                </TabContent>
                <TabContent icon="fa fa-clock-rotate-left" text="Antécédents Médicaux">
                    <TabAntecedentsMedicales NIN={auth!.NIN!} />
                </TabContent>
                <TabContent icon="fa fa-clock-rotate-left" text="Antécédents Familiaux">
                    <TabAntecedentsFamiliaux NIN={auth!.NIN!} />
                </TabContent>
                <TabContent icon="fa fa-wheelchair" text="Handicaps">
                    <TabHandicaps NIN={auth!.NIN!} />
                </TabContent>
                <TabContent icon="fa fa-pills" text="Médicaments">
                    <TabMedicaments NIN={auth!.NIN!} />
                </TabContent>
                <TabContent icon="fa fa-syringe" text="Vaccinations">
                    <TabVaccinations NIN={auth!.NIN!} />
                </TabContent>
            </Tabs>    
        </Card>
    </>
}

export default DossierPage;