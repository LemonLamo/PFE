import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Scaffold from "./pages/Scaffold";
import Dashboard from "./pages/Dashboard";
import NewVisitPage from "./pages/NewVisitPage";
import PatientsPage from "./pages/PatientsPage";
import NewPatientPage from "./pages/NewPatientPage";
import Test from "./pages/Test";
import RendezVousPage from "./pages/RendezVousPage";

const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  {
    path: "/dashboard",
    element: (
      <Scaffold>
        {" "}
        <Dashboard />{" "}
      </Scaffold>
    ),
  },
  {
    path: "/new_visit",
    element: (
      <Scaffold>
        {" "}
        <NewVisitPage />{" "}
      </Scaffold>
    ),
  },
  {
    path: "/new_patient",
    element: (
      <Scaffold>
        {" "}
        <NewPatientPage />{" "}
      </Scaffold>
    ),
  },
  {
    path: "/patients",
    element: (
      <Scaffold>
        {" "}
        <PatientsPage />{" "}
      </Scaffold>
    ),
  },
  {
    path: "/rendez_vous",
    element: (
      <Scaffold>
        {" "}
        <RendezVousPage />{" "}
      </Scaffold>
    ),
  },
  {
    path: "/test",
    element: (
      <Scaffold>
        {" "}
        <Test />{" "}
      </Scaffold>
    ),
  },
]);

export default router;
