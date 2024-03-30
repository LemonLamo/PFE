type SectionProps = {
    state: Record<string, boolean>,
    updateState: (id: string, value: boolean) => void
    consultationData: Partial<Consultation>,
    updateConsultationData: (id: keyof Consultation, value: Consultation[typeof id]) => void,
}

function ArretDeTravailSection({ state, updateState, consultationData, updateConsultationData }: SectionProps) {
    return (
        <>
            <div className="block pl-7 py-2 border-b-2 flex justify-between">
                <label>
                    <input id="checkbox-arretDeTravail" className="checkbox" type="checkbox" checked={state.arret_de_travail_active} onChange={(e) => updateState('arret_de_travail_active', e.target.checked)} />
                    <label htmlFor="checkbox-arretDeTravail" className="cursor-pointer select-none text-slate-700">Arrèt de Travail</label>
                </label>
            </div>
            {state.arret_de_travail_active &&
                <div className="overflow-hidden transition-all ease-soft-in-out duration-350 mb-2">
                    <div className="grid grid-cols-12 mt-2 mb-2">
                        <div className="text-sm font-semibold col-span-2 flex items-center">Durée:</div>
                        <input className="primary col-span-10" type="number" value={consultationData.duree_arret_de_travail} onChange={(e) => updateConsultationData('duree_arret_de_travail', e.target.valueAsNumber)} placeholder="Durée (en jours)" />
                    </div>
                    
                </div>
            }
        </>
    );
}

export default ArretDeTravailSection