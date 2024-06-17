import { useParams } from "react-router-dom";
import Card from "../../components/UI/Card";
import Tabs from "../../components/UI/Tabs/Tabs";
import TabContent from "../../components/UI/Tabs/TabContent";
import TabInfoPersonelles from "./Tabs/TabInfoPersonelles";
import TabMaladiesChroniques from "./Tabs/TabMaladiesChroniques";
import TabAllergies from "./Tabs/TabAllergies";
import TabAntecedentsMedicales from "./Tabs/TabAntecedentsMedicales";
import TabAntecedentsFamiliaux from "./Tabs/TabAntecedentsFamiliaux";
import TabMedicaments from "./Tabs/TabMedicaments";
import TabVaccinations from "./Tabs/TabVaccinations";
import TabHistorique from "./Tabs/TabHistorique";
import { useState } from "react";

function PatientPage() {
  const { NIN } = useParams();
  const [selectedTab, setSelectedTab] = useState<number>(0);

  return (
    <Card title={`Dossier médicale N°${NIN}`} className="w-full">
      <TabInfoPersonelles NIN={NIN!} />
      <Tabs type="horizontal" selected={selectedTab} setSelected={setSelectedTab}>
        <TabContent icon="fa fa-timeline" text="Historique">
          <TabHistorique NIN={NIN!} />
        </TabContent>
        <TabContent icon="fa fa-virus" text="Maladies chroniques">
          <TabMaladiesChroniques NIN={NIN!} />
        </TabContent>
        <TabContent icon="fa fa-person-dots-from-line" text="Allergies">
          <TabAllergies NIN={NIN!} />
        </TabContent>
        <TabContent icon="fa fa-clock-rotate-left" text="Antécédents Médicaux">
          <TabAntecedentsMedicales NIN={NIN!} />
        </TabContent>
        <TabContent icon="fa fa-clock-rotate-left"text="Antécédents Familiaux">
          <TabAntecedentsFamiliaux NIN={NIN!} />
        </TabContent>
        <TabContent icon="fa fa-pills" text="Médicaments">
          <TabMedicaments NIN={NIN!} />
        </TabContent>
        <TabContent icon="fa fa-syringe" text="Vaccinations">
          <TabVaccinations NIN={NIN!} />
        </TabContent>
      </Tabs>
    </Card>
  );
}

export default PatientPage;
