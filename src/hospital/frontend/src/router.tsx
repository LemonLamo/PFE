import { Navigate, createBrowserRouter } from "react-router-dom";
import { PublicOrPrivateRoute, PrivateRouteOnly, Dashboard, RequireRole } from "./hooks/useAuth";
import Scaffold from "./components/Scaffold";
import LoginPage from "./pages/LoginPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import DashboardAdmin from "./pages/DashboardAdmin";
import DashboardReception from "./pages/DashboardReception";
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
import ParemetresPage from "./pages/ParametresPage";
import RadioResultPage from "./pages/RadioResultPage";
import BilanResultPage from "./pages/BilanResultPage";
import OrdonnanceResultPage from "./pages/OrdonnanceResultPage";
import ArretDeTravailResultPage from "./pages/ArretDeTravailResultPage";
import NouvelleInterventionPage from "./pages/NouvelleInterventionPage";
import MesInterventionsPage from "./pages/MesInterventionsPage/MesInterventionsPage";

const router = createBrowserRouter([
  { path: "/", element:(
    <PublicOrPrivateRoute 
      notLoggedIn={(<LoginPage />)}
      loggedIn = {<Dashboard />}
    />)
  },

  { path: "/reception", element:(
    <PrivateRouteOnly>
      <Scaffold> <DashboardReception/> </Scaffold>
    </PrivateRouteOnly>
  )},

  /* TODO: Remove these when done testing */
  { path: "/dashboard_inf", element:(<Scaffold> <DashboardInfirmier /> </Scaffold>)},
  
  { path: "/dashboard_admin", element:(<Scaffold> <DashboardAdmin /> </Scaffold>)},


  { path: "/dashboard_entree", element:(<Scaffold> <DashboardReception /> </Scaffold>)},
  
  { path: "/dashboard_entree", element:(<Scaffold> <DashboardReception /> </Scaffold>)},
  
  { path: "/dashboard_lab", element:(<Scaffold> <DashboardLab /> </Scaffold>)},
  
  { path: "/dashboard_radio", element:(<Scaffold> <DashboardRadio /> </Scaffold>)},
  /* END */

  { path: "/forgot-password", element:(
    <PublicOrPrivateRoute 
      notLoggedIn={(<ForgotPasswordPage />)}
      loggedIn = {<Navigate to="/" />}
    />)
  },

  { path: "/ordonnances/:id", element:(
    <RequireRole roles={['medecin']}>
      <OrdonnanceResultPage />
    </RequireRole>)},

  { path: "/arret_de_travail/:id", element:(
    <RequireRole roles={['medecin']}>
      <ArretDeTravailResultPage />
    </RequireRole>
  )},

  { path: "/radios/:id", element:(
    <RequireRole roles={['medecin', 'radio']}>
      <RadioResultPage />
    </RequireRole>
  )},

  
  { path: "/bilans/:id", element:(
    <RequireRole roles={['medecin', 'lab']}>
      <BilanResultPage />
    </RequireRole>)},
    
  { path: "/consultations/new", element:(
    <RequireRole roles={['medecin']}>
      <Scaffold> <NouvelleConsultationPage /> </Scaffold>
    </RequireRole>)},

  { path: "/patients", element:(
    <RequireRole roles={['medecin']}>
      <Scaffold> <MesPatientsPage/> </Scaffold>
    </RequireRole>)},

  { path: "/patients/new", element:(
    <PrivateRouteOnly>
      <Scaffold> <NouveauPatientPage/> </Scaffold>
    </PrivateRouteOnly>)},
  
  { path: "/patients/:NIN", element:(
    <RequireRole roles={['medecin']}>
      <Scaffold> <PatientPage /> </Scaffold>
    </RequireRole>)},

  { path: "/rendez-vous", element:(
    <RequireRole roles={['medecin']}>
      <Scaffold> <MesRendezVousPage /> </Scaffold>
    </RequireRole>)},

  { path: "/hospitalisations", element:(
    <RequireRole roles={['medecin']}>
      <Scaffold> <MesPatientsHospitalisesPage /> </Scaffold>
    </RequireRole>)},

  { path: "/hospitalisations/new", element:(
    <RequireRole roles={['medecin']}>
      <Scaffold> <NouvelleHospitalisationPage /> </Scaffold>
    </RequireRole>)},
  
  { path: "/interventions/new", element:(
    <RequireRole roles={['medecin']}>
      <Scaffold> <NouvelleInterventionPage /> </Scaffold>
    </RequireRole>)},
  
  { path: "/interventions", element:(
    <RequireRole roles={['medecin']}>
      <Scaffold> <MesInterventionsPage /> </Scaffold>
    </RequireRole>)},

  { path: "/pharmacie", element:(
    <PrivateRouteOnly>
      <Scaffold> <PharmaciePage/> </Scaffold>
    </PrivateRouteOnly>)},
    
  { path: "/chambres", element:(
    <RequireRole roles={['admin']}>
      <Scaffold> <ChambresPage/> </Scaffold>
    </RequireRole>)},

  { path: "/personnel", element:(
    <RequireRole roles={['admin']}>
      <Scaffold> <PersonnelPage /> </Scaffold>
    </RequireRole>)},

  { path: "/parametres", element:(
    <PrivateRouteOnly>
      <Scaffold> <ParemetresPage /> </Scaffold>
    </PrivateRouteOnly>)},
]);

export default router;
