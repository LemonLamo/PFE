import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Scaffold from "./pages/Scaffold";
import Dashboard from "./pages/Dashboard";
import NouveauPatientPage from "./pages/NouveauPatientPage";
import NouvelleConsultationPage from "./pages/NouvelleConsultationPage/NouvelleConsultationPage";
import MesRendezVousPage from "./pages/MesRendezVousPage";
import MesPatientsPage from "./pages/MesPatientsPage/MesPatientsPage";
import NouvelleHospitalisationPage from "./pages/NouvelleHospitalisationPage/NouvelleHospitalisationPage";
import MesPatientsAdmisPage from "./pages/MesPatientsAdmisPage/MesPatientsAdmisPage";
import PharmaciePage from "./pages/PharmaciePage";
import AgentsPage from "./pages/AgentsPage";
import ChambresPage from "./pages/ChambresPage";
import RolesPage from "./pages/RolesPage";
import ParemetresPage from "./pages/ParametresPage";
import Test from "./pages/Test";
import PatientPage from "./pages/PatientPage";
import { PublicOrPrivateRoute, PrivateRouteOnly } from "./hooks/useAuth";

const router = createBrowserRouter([
  { path: "/", element:(
    <PublicOrPrivateRoute 
      notLoggedIn = {(<Login />)}
      loggedIn = {<Scaffold> <Dashboard /> </Scaffold>}
    />)},
    
  { path: "/nouvelle_consultation", element:(
    <PrivateRouteOnly>
      <Scaffold> <NouvelleConsultationPage /> </Scaffold>
    </PrivateRouteOnly>)},

  { path: "/nouveau_patient", element:(
    <PrivateRouteOnly>
      <Scaffold> <NouveauPatientPage/> </Scaffold>
    </PrivateRouteOnly>)},

  { path: "/mes_patients", element:(
    <PrivateRouteOnly>
      <Scaffold> <MesPatientsPage/> </Scaffold>
    </PrivateRouteOnly>)},

  { path: "/mes_rendez_vous", element:(
    <PrivateRouteOnly>
      <Scaffold> <MesRendezVousPage /> </Scaffold>
    </PrivateRouteOnly>)},

  { path: "/nouvelle_hospitalisation", element:(
    <PrivateRouteOnly>
      <Scaffold> <NouvelleHospitalisationPage /> </Scaffold>
    </PrivateRouteOnly>)},

  { path: "/mes_patients_admis", element:(
    <PrivateRouteOnly>
      <Scaffold> <MesPatientsAdmisPage /> </Scaffold>
    </PrivateRouteOnly>)},

  { path: "/patients/:NIN", element:(
    <PrivateRouteOnly>
      <Scaffold> <PatientPage /> </Scaffold>
    </PrivateRouteOnly>)},

  { path: "/pharmacie", element:(
    <PrivateRouteOnly>
      <Scaffold> <PharmaciePage/> </Scaffold>
    </PrivateRouteOnly>)},
    
  { path: "/chambres", element:(
    <PrivateRouteOnly>
      <Scaffold> <ChambresPage/> </Scaffold>
    </PrivateRouteOnly>)},

  { path: "/agents", element:(
    <PrivateRouteOnly>
      <Scaffold> <AgentsPage/> </Scaffold>
    </PrivateRouteOnly>)},

  { path: "/roles", element:(
    <PrivateRouteOnly>
      <Scaffold> <RolesPage/> </Scaffold>
    </PrivateRouteOnly>)},

  { path: "/parametres", element:(
    <PrivateRouteOnly>
      <Scaffold> <ParemetresPage /> </Scaffold>
    </PrivateRouteOnly>)},
    
  { path: "/test", element:(<Scaffold> <Test/> </Scaffold>) },
]);

export default router;
