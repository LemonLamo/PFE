import { Navigate, createBrowserRouter } from "react-router-dom";
import { PrivateRouteOnly, PublicOrPrivateRoute } from "./hooks/useAuth";
import Scaffold from "./components/Scaffold";
import DashboardPage from "./pages/DashboardPage";
import DossierPage from "./pages/DossierPage";
import MesRendezVousPage from "./pages/MesRendezVousPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import OrdonnanceResultPage from "./pages/OrdonnanceResultPage";
import ArretDeTravailResultPage from "./pages/ArretDeTravailResultPage";
import RadioResultPage from "./pages/RadioResultPage";
import BilanResultPage from "./pages/BilanResultPage";
import HistoriquePage from "./pages/HistoriquePage";

const router = createBrowserRouter([
  { path: "/", element:(
    <PublicOrPrivateRoute 
      notLoggedIn={(<LandingPage />)}
      loggedIn = {<Scaffold> <DashboardPage /> </Scaffold>}
    />)},
  
  { path: "/rendez-vous", element:(
    <PrivateRouteOnly>
      <Scaffold> <MesRendezVousPage /> </Scaffold>
    </PrivateRouteOnly>)},

  { path: "/dossier", element:(
    <PrivateRouteOnly>
      <Scaffold> <DossierPage /> </Scaffold>
    </PrivateRouteOnly>)},
  
  { path: "/historique", element:(
    <PrivateRouteOnly>
      <Scaffold> <HistoriquePage /> </Scaffold>
    </PrivateRouteOnly>)},
  
  { path: "/ordonnances/:id", element:(<OrdonnanceResultPage />)},

  { path: "/arret_de_travail/:id", element:(<ArretDeTravailResultPage />)},

  { path: "/radios/:id", element:(<RadioResultPage />)},

  { path: "/bilans/:id", element:(<BilanResultPage />)},

  { path: "/login", element:(
    <PublicOrPrivateRoute 
      notLoggedIn={(<LoginPage />)}
      loggedIn = {(<Navigate to="/"/>)}
    />)},

  { path: "/forgot-password", element:(
    <PublicOrPrivateRoute 
      notLoggedIn={(<ForgotPasswordPage />)}
      loggedIn = {(<Navigate to="/"/>)}
    />)},
]);

export default router;
