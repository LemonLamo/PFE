import moment from "moment";

type SectionProps = {
    state: Record<string, boolean>,
    updateState: (id: string, value: boolean) => void
    consultationData: Consultation,
    updateConsultationData: (id: keyof Consultation, value: Consultation[typeof id]) => void,
}

function ProchaineConsultationSection({ state, updateState, consultationData, updateConsultationData }: SectionProps) {
    return (
        <>
            <div className="block pl-7 py-2 flex justify-between">
                <label>
                    <input id="checkbox-5" className="checkbox" type="checkbox" checked={state.prochaine_consultation_active} onChange={(e) => updateState('prochaine_consultation_active', e.target.checked)} />
                    <label htmlFor="checkbox-5" className="cursor-pointer select-none text-slate-700">Prochaine consultation</label>
                </label>
            </div>
            {state.prochaine_consultation_active &&
                <div className={"overflow-hidden transition-all ease-soft-in-out duration-350 mb-2"}>
                    <input className="primary" type="datetime-local" value={moment(consultationData.prochaine_consultation).format('YYYY-MM-DDTHH:mm')} onChange={(e) => updateConsultationData('prochaine_consultation', moment(e.target.value).format('YYYY-MM-DDTHH:mm'))}></input>
                </div>
            }
        </>
    );
}

export default ProchaineConsultationSection