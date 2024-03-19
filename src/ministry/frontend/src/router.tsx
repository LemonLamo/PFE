import { createBrowserRouter } from "react-router-dom";
import Scaffold from "./pages/Scaffold";
import Dashboard from "./pages/Dashboard";
import Test from "./pages/Test";
import { PublicOrPrivateRoute } from "./hooks/useAuth";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";

const router = createBrowserRouter([
  { path: "/", element:(
    <PublicOrPrivateRoute 
      notLoggedIn={(<LandingPage />)}
      loggedIn = {<Scaffold> <Dashboard /> </Scaffold>}
    />)},

  { path: "/login", element:(<LoginPage />)},
  { path: "/forgot-password", element:(<ForgotPasswordPage />)},
    
  { path: "/test", element:(<Scaffold> <Test/> </Scaffold>) },
]);

export default router;
