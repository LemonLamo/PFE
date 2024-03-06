import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Scaffold from "./pages/Scaffold";
import Dashboard from "./pages/Dashboard";
import NouvelleConsultationPage from "./pages/NouvelleConsultationPage/NouvelleConsultationPage";
import MesPatientsPage from "./pages/MesPatientsPage/MesPatientsPage";
import NouveauPatientPage from "./pages/NouveauPatientPage";
import Test from "./pages/Test";
import MesRendezVousPage from "./pages/MesRendezVousPage";
import Medicaments from "./pages/Medicaments";
import Chambres from "./pages/Chambres";
import Agents from "./pages/Agents";
import Infirmiers from "./pages/Infirmiers";
import Medecins from "./pages/Medecins";
import NouvelleHospitalisationPage from "./pages/NouvelleHospitalisationPage/NouvelleHospitalisationPage";
import MesPatientsAdmisPage from "./pages/MesPatientsAdmisPage/MesPatientsAdmisPage";

const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  { path: "/dashboard", element: (<Scaffold> <Dashboard/> </Scaffold>) },
  { path: "/nouvelle_consultation", element: (<Scaffold> <NouvelleConsultationPage /> </Scaffold>) },
  { path: "/nouveau_patient", element: (<Scaffold> <NouveauPatientPage/> </Scaffold>) },
  { path: "/mes_patients", element: (<Scaffold> <MesPatientsPage/> </Scaffold>) },
  { path: "/mes_rendez_vous", element: (<Scaffold> <MesRendezVousPage/> </Scaffold> )},

  { path: "/nouvelle_hospitalisation", element: (<Scaffold> <NouvelleHospitalisationPage /> </Scaffold>) },
  { path: "/mes_patients_admis", element: (<Scaffold> <MesPatientsAdmisPage /> </Scaffold>) },

  { path: "/medicaments", element: (<Scaffold> <Medicaments/> </Scaffold>) },
  { path: "/chambres", element: (<Scaffold> <Chambres/> </Scaffold>) },
  { path: "/medecins", element: (<Scaffold> <Medecins/> </Scaffold>) },
  { path: "/agents", element: (<Scaffold> <Agents/> </Scaffold>) },
  { path: "/infirmiers", element: ( <Scaffold> <Infirmiers/> </Scaffold>) },
  { path: "/test", element: (<Scaffold> <Test/> </Scaffold>) },
]);

export default router;
