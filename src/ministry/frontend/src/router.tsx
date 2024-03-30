import { Navigate, createBrowserRouter } from "react-router-dom";
import { PublicOrPrivateRoute } from "./hooks/useAuth";
import Scaffold from "./pages/Scaffold";
import Dashboard from "./pages/Dashboard";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";

const router = createBrowserRouter([
  { path: "/", element:(
    <PublicOrPrivateRoute 
      notLoggedIn={(<LandingPage />)}
      loggedIn = {<Scaffold> <Dashboard /> </Scaffold>}
    />)},

  { path: "/login", element:(<PublicOrPrivateRoute 
      notLoggedIn={(<LoginPage />)}
      loggedIn = {(<Navigate to="/"/>)}
    />)},

  { path: "/forgot-password", element:(<PublicOrPrivateRoute 
      notLoggedIn={(<ForgotPasswordPage />)}
      loggedIn = {(<Navigate to="/"/>)}
    />)},
]);

export default router;
