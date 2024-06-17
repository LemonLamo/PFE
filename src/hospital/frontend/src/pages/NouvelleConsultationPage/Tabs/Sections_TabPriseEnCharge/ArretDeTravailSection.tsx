type SectionProps = {
    state: Record<string, boolean>,
    updateState: (id: string, value: boolean) => void,
    form: any
}

function ArretDeTravailSection({ state, updateState, form }: SectionProps) {
    return (
        <>
            <div className="block pl-7 py-2 border-b-2 flex justify-between">
                <label>
                    <input id="checkbox-arretDeTravail" className="checkbox" type="checkbox" checked={state.arret_de_travail_active} onChange={(e) => updateState('arret_de_travail_active', e.target.checked)} />
                    <label htmlFor="checkbox-arretDeTravail" className="cursor-pointer select-none text-slate-700">Arrêt de travail</label>
                </label>
            </div>
            {state.arret_de_travail_active &&
                <div className="overflow-hidden transition-all ease-soft-in-out duration-350 mb-2">
                    <div className="grid grid-cols-12 mt-2 mb-2 flex items-center gap-2">
                        <div className="text-sm font-semibold col-span-2 flex items-center">Durée:</div>
                        <input type="number" className={`col-span-9 text-right primary ${form.errors.duree_arret_de_travail && 'has-error'}`} {...form.register("duree_arret_de_travail", {required: true})} />
                        <div className="col-span-1 primary w-full">
                            jours
                        </div>
                    </div>
                    
                </div>
            }
        </>
    );
}

export default ArretDeTravailSection