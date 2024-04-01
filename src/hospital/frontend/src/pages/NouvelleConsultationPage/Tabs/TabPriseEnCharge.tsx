import PerscriptionsSection from './Sections_TabPriseEnCharge/PerscriptionsSection';
import RadiologieSection from "./Sections_TabPriseEnCharge/RadiologieSection";
import InterventionsSection from "./Sections_TabPriseEnCharge/InterventionsSection";
import ProchaineConsultationSection from "./Sections_TabPriseEnCharge/ProchaineConsultationSection";
import BilansSection from './Sections_TabPriseEnCharge/BilansSection';
import ArretDeTravailSection from './Sections_TabPriseEnCharge/ArretDeTravailSection';

type TabProps = {
  consultationData: Partial<Consultation>,
  setConsultationData: React.Dispatch<React.SetStateAction<Partial<Consultation>>>,
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
        <BilansSection state={state} updateState={updateState} consultationData={consultationData} updateConsultationData={updateConsultationData} />
        <InterventionsSection state={state} updateState={updateState} consultationData={consultationData} updateConsultationData={updateConsultationData} />
        <ArretDeTravailSection state={state} updateState={updateState} consultationData={consultationData} updateConsultationData={updateConsultationData} />
        <ProchaineConsultationSection state={state} updateState={updateState} consultationData={consultationData} updateConsultationData={updateConsultationData} />
      </div>
    </>
  );
}

export default TabPriseEnCharge