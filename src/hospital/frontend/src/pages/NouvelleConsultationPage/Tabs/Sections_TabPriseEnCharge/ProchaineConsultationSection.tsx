type SectionProps = {
    state: Record<string, boolean>,
    updateState: (id: string, value: boolean) => void,
    form: any
}

function ProchaineConsultationSection({ state, updateState, form }: SectionProps) {
    return (
        <>
            <div className="block pl-7 py-2 flex justify-between">
                <label>
                    <input id="checkbox-prochaineConsultation" className="checkbox" type="checkbox" checked={state.prochaine_consultation_active} onChange={(e) => updateState('prochaine_consultation_active', e.target.checked)} />
                    <label htmlFor="checkbox-prochaineConsultation" className="cursor-pointer select-none text-slate-700"> Date de la prochaine consultation</label>
                </label>
            </div>
            {state.prochaine_consultation_active &&
                <div className={"overflow-hidden transition-all ease-soft-in-out duration-350 mb-2"}>
                    <input type="datetime-local" className={`col-span-10 primary ${form.errors.prochaine_consultation && 'has-error'}`} {...form.register("prochaine_consultation", {required: true})} />
                </div>
            }
        </>
    );
}

export default ProchaineConsultationSection