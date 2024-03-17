import PerscriptionsSection from './TabPriseEnChargeSections/PerscriptionsSection';
import RadiologieSection from "./TabPriseEnChargeSections/RadiologieSection";
import AnalysesSection from "./TabPriseEnChargeSections/AnalysesSection";
import InterventionsSection from "./TabPriseEnChargeSections/InterventionsSection";
import ProchaineConsultationSection from "./TabPriseEnChargeSections/ProchaineConsultationSection";

type TabProps = {
  consultationData: Consultation,
  setConsultationData: React.Dispatch<React.SetStateAction<Consultation>>,
  state: Record<string, boolean>,
  setState: React.Dispatch<React.SetStateAction<Record<string, boolean>>>
}

function TabPriseEnCharge({ consultationData, setConsultationData, state, setState }: TabProps) {
  function updateConsultationData(id: keyof Consultation, value: Consultation[typeof id]) {
    setConsultationData((consultationData) => ({ ...consultationData, [id]: value }))
  }
  function updateState(id: string, value: boolean) {
    setState((state) => ({ ...state, [id]: value }))
  }

  return (
    <>
      <h3 className="text-lg mb-0">Prise en charge</h3>
      <p className="mb-2">This is some placeholder content the Profile tab's associated content, clicking another tab will toggle the visibility of this one for the next.</p>
      <div className="">
        <PerscriptionsSection state={state} updateState={updateState} consultationData={consultationData} updateConsultationData={updateConsultationData} />
        <RadiologieSection state={state} updateState={updateState} consultationData={consultationData} updateConsultationData={updateConsultationData} />
        <AnalysesSection state={state} updateState={updateState} consultationData={consultationData} updateConsultationData={updateConsultationData} />
        <InterventionsSection state={state} updateState={updateState} consultationData={consultationData} updateConsultationData={updateConsultationData} />
        <ProchaineConsultationSection state={state} updateState={updateState} consultationData={consultationData} updateConsultationData={updateConsultationData} />
      </div>
    </>
  );
}

export default TabPriseEnCharge