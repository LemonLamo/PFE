import Card from "../components/UI/Card"
import profile from "../assets/profile.jpg"

function NewPatientPage() {
  return (
    <Card title="Nouveau patient" subtitle="Create a new medical record" className="w-full">
      <div className="grid grid-cols-12 gap-x-4">
        <div className="col-span-4">
          <h6 className="mb-0"> Informations Civiles</h6>
          <input className="primary" placeholder="NIN" />
          <input className="primary" placeholder="Nom" />
          <input className="primary" placeholder="Prénom" />
          <input className="primary" placeholder="Date de naissance" />
          <input className="primary" placeholder="Lieu de naissance" />
          <input className="primary" placeholder="Date de Naissance" />

          <h6 className="mt-2 mb-0"> Addresse</h6>
          <input className="primary" placeholder="Addresse" />
          <input className="primary col-span-6" placeholder="Commune" />
          <input className="primary col-span-6" placeholder="Zip Code" />
          <input className="primary" placeholder="Wilaya" />
        </div>

        <div className="col-span-4">
          <h6 className="mb-0"> Informations Medicales</h6>
          <input className="primary" placeholder="Group Sanguin" />
          <input className="primary" placeholder="Taille" />
          <input className="primary" placeholder="Poids" />
        </div>

        <div className="col-span-4">
          <h6 className="mb-0"> Antécédants Familiales</h6>
          <input className="primary" placeholder="Group Sanguin" />

          <h6 className="mb-0"> Antécédants Médicales</h6>
          <input className="primary" placeholder="Group Sanguin" />

          <h6 className="mb-0"> Allergies</h6>
          <input className="primary" placeholder="Group Sanguin" />

          <h6 className="mb-0"> Vaccinations</h6>
          <input className="primary" placeholder="Group Sanguin" />
        </div>
      </div>

      <div className="w-full flex justify-end">
        <button className="flex items-center justify-center py-2 px-4 bg-transparent text-sky-600 font-semibold border border-sky-600 rounded hover:bg-sky-400 hover:text-white hover:border-transparent transition ease-in duration-50 transform hover:-translate-y-1 active:translate-y-0" onClick={() => console.log("hi")}>
          Submit
        </button>
      </div>
    </Card>
  )
}

export default NewPatientPage