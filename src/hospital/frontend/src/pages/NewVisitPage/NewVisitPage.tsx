import Card from "../../components/UI/Card"
import Tabs from "../../components/UI/Tabs/Tabs"
import { TabPriseEnCharge } from "./TabPriseEnCharge"
import { TabDiagnostique } from "./TabDiagnostique"
import { TabExamenClinique } from "./TabExamenClinique"
import { TabMotif } from "./TabMotif"
import { TabHistorique } from "./TabHistorique"
import { TabInfoPersonelles } from "./TabInfoPersonelles"
import { useState } from "react"
import moment from "moment"
import TabContent from "../../components/UI/Tabs/TabContent"

function NewVisitPage() {
  const [state, setState] = useState<Record<string, boolean>>({
    mediacments_active: false,
    radiologie_active: false,
    analyses_active: false,
    interventions_active: false,
    prochaine_consultation_active: true,
  })

  const [visiteData, setVisiteData] = useState<Visite>({
    date_visite: moment(new Date()).toDate(),
    type_visite: '',
    motif_visite: '',
    symptomes: '',
    resume_visite: '',

    examens_cliniques: [],

    diagnostique: '',
    diagnostique_details: '',

    medicaments: [],
    radiologie: [],
    analyses: [],
    interventions: [],
    prochaine_consultation: moment(new Date()).add(7).toDate(),
  })

  return (
    <>
      <Card title="Who is this visit for?" subtitle="Pick a patient, any patient" className="flex">
        <div className="relative flex transition-all rounded-sm ease-soft">
          <span className="text-sm ease-soft leading-5.6 absolute z-50 -ml-px flex h-full items-center whitespace-nowrap rounded-lg rounded-tr-none rounded-br-none border border-r-0 border-transparent bg-transparent py-2 px-2.5 text-center font-normal text-slate-500 transition-all">
            <i className="fas fa-user" aria-hidden="true"></i>
          </span>
          <input type="text" className="pl-9 text-sm focus:shadow-soft-primary-outline ease-soft w-1/100 leading-5.6 relative -ml-px block min-w-0 flex-auto rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 pr-3 text-gray-700 transition-all placeholder:text-gray-500 focus:border-fuchsia-300 focus:outline-none focus:transition-shadow" placeholder="Search for a patient..." />
        </div>
      </Card>

      <Card title="New patient" subtitle="You wanna add a new patient huh?">
        <Tabs>
          <TabContent icon="fa fa-user" text="Informations Personnelles" >
            <TabInfoPersonelles NIN={'100010364027390000'}/>
          </TabContent>

          <TabContent icon="fa fa-user" text="Historique Médicale" >
            <TabHistorique NIN={'100010364027390000'}/>
          </TabContent>

          <TabContent icon="fa fa-user" text="Motif de la visite" >
            <TabMotif visiteData={visiteData} setVisiteData={setVisiteData}/>
          </TabContent>

          <TabContent icon="fa fa-user" text="Examen clinique" >
            <TabExamenClinique visiteData={visiteData} setVisiteData={setVisiteData}/>
          </TabContent>

          <TabContent icon="fa fa-user" text="Diagnostique" >
            <TabDiagnostique visiteData={visiteData} setVisiteData={setVisiteData}/>
          </TabContent>

          <TabContent icon="fa fa-user" text="Prise en charge" >
            <TabPriseEnCharge visiteData={visiteData} setVisiteData={setVisiteData} state={state} setState={setState}/>
          </TabContent>
        </Tabs>

        <div className="w-full flex justify-end">
          <button className="flex items-center justify-center py-2 px-4 bg-transparent text-sky-600 font-semibold border border-sky-600 rounded hover:bg-sky-400 hover:text-white hover:border-transparent transition ease-in duration-50 transform hover:-translate-y-1 active:translate-y-0" onClick={()=> console.log(visiteData)}>
            Submit
          </button>
        </div>
      </Card>
    </>
  )
}

export default NewVisitPage