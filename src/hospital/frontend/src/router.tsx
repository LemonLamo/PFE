import { Navigate, createBrowserRouter } from "react-router-dom";
import { PublicOrPrivateRoute, PrivateRouteOnly, Dashboard, RequireRole } from "./hooks/useAuth";
import Scaffold from "./components/Scaffold";
import LoginPage from "./pages/LoginPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import DashboardReception from "./pages/DashboardReception";
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
import SoinsArchivesPage from "./pages/SoinsArchivesPage";
import BilansArchivesPage from "./pages/BilansArchivesPage";
import RadiosArchivesPage from "./pages/RadiosArchivesPage";
import HistoriqueAccesUrgence from "./pages/HistoriqueAccesUrgence";
import UrgencesPage from "./pages/UrgencesPage";
import NouvelleUrgencePage from "./pages/NouvelleUrgencePage";

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

  { path: "/radios", element:(
    <RequireRole roles={['radio']}>
      <Scaffold> <RadiosArchivesPage /> </Scaffold>
    </RequireRole>)},

  { path: "/radios/:id", element:(
    <RequireRole roles={['medecin', 'radio']}>
      <RadioResultPage />
    </RequireRole>
  )},

  { path: "/bilans", element:(
    <RequireRole roles={['lab']}>
      <Scaffold> <BilansArchivesPage /> </Scaffold>
    </RequireRole>)},
  
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
    <RequireRole roles={['pharmacien']}>
      <Scaffold> <PharmaciePage/> </Scaffold>
    </RequireRole>)},
    
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

  { path: "/soins", element:(
    <RequireRole roles={['infirmier']}>
      <Scaffold> <SoinsArchivesPage /> </Scaffold>
    </RequireRole>)},

  { path: "/historique_acces_urgences", element:(
    <RequireRole roles={['admin']}>
      <Scaffold> <HistoriqueAccesUrgence /> </Scaffold>
    </RequireRole>)},
  
  { path: "/urgences/new", element:(
    <RequireRole roles={['medecin']}>
      <Scaffold> <NouvelleUrgencePage /> </Scaffold>
    </RequireRole>)},
  {
    path: "/urgences", element: (
      <RequireRole roles={['medecin']}>
        <Scaffold> <UrgencesPage /> </Scaffold>
      </RequireRole>)},
]);

export default router;
