import { useContext, useState } from 'react'
import Card from '../../components/UI/Card';
import { useNavigate } from 'react-router-dom';
import PatientsSelect from '../../components/Selects/PatientsSelect';
import AlertsContext from '../../hooks/AlertsContext';
import { requestEHRAuth } from '../../hooks/useAuth';
import axios from 'axios';
import { baseURL } from '../../config';

function NouvelleUrgencePage() {
  const { showAlert } = useContext(AlertsContext);
  const navigate = useNavigate();
  const [patient, setPatient] = useState<Partial<Patient>>({ NIN: "", nom: "", prenom: "" });

  function select_patient(patient: any) {
    if(patient)
      setPatient({ NIN: patient.NIN!, nom: patient.nom!, prenom: patient.prenom! })
  }

  async function choosePatient() {
    if (patient.NIN !== "") {
      if (!confirm("Êtes-vous sûr de vouloir continuer? Cette action est irréversible et ces données ne pourront plus être modifiées par la suite."))
        return;

      try {
        await requestEHRAuth(patient.NIN!, "Urgence");
        await axios.post(`${baseURL}/api/urgences`, {patient: patient.NIN});
        showAlert("success", `Patient ${patient.nom} ${patient.prenom} has been added to emergency list`)
        navigate("/urgences")
      } catch (err) {
        if ((err as any).response)
          showAlert("error", (err as any).response.data?.errorMessage)
        else
          showAlert("error", "Échec Réseau - Service injoignable en ce moment. Veuillez réessayer ultérieurement.")
      }
    }
  }

  return (
    <Card title="Choisir un patient?" subtitle="Veuillez sélectionner un patient" className="w-full max-w-[600px]">
      <div className="flex w-inherit">
        <PatientsSelect placeholder="Rechercher un patient" onChange={select_patient} state={{ NIN: patient.NIN!, nom: patient.nom!, prenom: patient.prenom!, }} />
        <button className="primary ms-3" onClick={choosePatient}>Choisir</button>
      </div>
    </Card>
  )
}

export default NouvelleUrgencePage