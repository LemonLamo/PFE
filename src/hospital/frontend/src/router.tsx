import { createBrowserRouter } from "react-router-dom";
import { PublicOrPrivateRoute, PrivateRouteOnly } from "./hooks/useAuth";
import Scaffold from "./components/Scaffold";
import LoginPage from "./pages/LoginPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import Dashboard from "./pages/DashboardMedecin";
import DashboardAdmin from "./pages/DashboardAdmin";
import DashboardEntree from "./pages/DashboardEntree";
import DashboardLab from "./pages/DashboardLab";
import DashboardRadio from "./pages/DasshboardRadio";
import DashboardInfirmier from "./pages/DashboardInfirmier";
import NouveauPatientPage from "./pages/NouveauPatientPage";
import NouvelleConsultationPage from "./pages/NouvelleConsultationPage";
import MesPatientsPage from "./pages/MesPatientsPage/MesPatientsPage";
import PatientPage from "./pages/PatientPage/PatientPage";
import MesRendezVousPage from "./pages/MesRendezVousPage";
import NouvelleHospitalisationPage from "./pages/NouvelleHospitalisationPage";
import MesPatientsHospitalisesPage from "./pages/MesPatientsHospitalisesPage";
import PharmaciePage from "./pages/PharmaciePage";
import ChambresPage from "./pages/ChambresPage";
import PersonnelPage from "./pages/PersonnelPage";
import RolesPage from "./pages/RolesPage/RolesPage";
import ParemetresPage from "./pages/ParametresPage";
import TestRoute from "./pages/TestRoute";

const router = createBrowserRouter([
  { path: "/", element:(
    <PublicOrPrivateRoute 
      notLoggedIn={(<LoginPage />)}
      loggedIn = {<Scaffold> <Dashboard /> </Scaffold>}
    />)},

  { path: "/dashboard_inf", element:(<Scaffold> <DashboardInfirmier /> </Scaffold>)},

  { path: "/dashboard_admin", element:(<Scaffold> <DashboardAdmin /> </Scaffold>)},

  { path: "/dashboard_entree", element:(<Scaffold> <DashboardEntree /> </Scaffold>)},

  { path: "/dashboard_lab", element:(<Scaffold> <DashboardLab /> </Scaffold>)},

  { path: "/dashboard_radio", element:(<Scaffold> <DashboardRadio /> </Scaffold>)},

  { path: "/forgot-password", element:(<ForgotPasswordPage />)},
    
  { path: "/nouvelle_consultation", element:(
    <PrivateRouteOnly>
      <Scaffold> <NouvelleConsultationPage /> </Scaffold>
    </PrivateRouteOnly>)},

  { path: "/patients", element:(
    <PrivateRouteOnly>
      <Scaffold> <MesPatientsPage/> </Scaffold>
    </PrivateRouteOnly>)},

  { path: "/patients/new", element:(
    <PrivateRouteOnly>
      <Scaffold> <NouveauPatientPage/> </Scaffold>
    </PrivateRouteOnly>)},
  
  { path: "/patients/:NIN", element:(
    <PrivateRouteOnly>
      <Scaffold> <PatientPage /> </Scaffold>
    </PrivateRouteOnly>)},

  { path: "/rendez_vous", element:(
    <PrivateRouteOnly>
      <Scaffold> <MesRendezVousPage /> </Scaffold>
    </PrivateRouteOnly>)},

  { path: "/hospitalisations", element:(
    <PrivateRouteOnly>
      <Scaffold> <MesPatientsHospitalisesPage /> </Scaffold>
    </PrivateRouteOnly>)},

  { path: "/hospitalisations/new", element:(
    <PrivateRouteOnly>
      <Scaffold> <NouvelleHospitalisationPage /> </Scaffold>
    </PrivateRouteOnly>)},

  { path: "/pharmacie", element:(
    <PrivateRouteOnly>
      <Scaffold> <PharmaciePage/> </Scaffold>
    </PrivateRouteOnly>)},
    
  { path: "/chambres", element:(
    <PrivateRouteOnly>
      <Scaffold> <ChambresPage/> </Scaffold>
    </PrivateRouteOnly>)},

  { path: "/personnel", element:(
    <PrivateRouteOnly>
      <Scaffold> <PersonnelPage /> </Scaffold>
    </PrivateRouteOnly>)},

  { path: "/roles", element:(
    <PrivateRouteOnly>
      <Scaffold> <RolesPage/> </Scaffold>
    </PrivateRouteOnly>)},

  { path: "/parametres", element:(
    <PrivateRouteOnly>
      <Scaffold> <ParemetresPage /> </Scaffold>
    </PrivateRouteOnly>)},

  { path: "/test", element:( <Scaffold> <TestRoute/> </Scaffold>)}
]);

export default router;
