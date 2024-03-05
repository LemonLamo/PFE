import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Scaffold from "./pages/Scaffold";
import Dashboard from "./pages/Dashboard";
import NouveauPatient from "./pages/NouveauPatient";
import Test from "./pages/Test";
import Medicaments from "./pages/Medicaments";

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
    path: "/new_patient",
    element: (
      <Scaffold>
        {" "}
        <NouveauPatient />{" "}
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
  {
    path: "medicaments",
    element: (
      <Scaffold>
        {" "}
        <Medicaments />{" "}
      </Scaffold>
    ),
  },
]);

export default router;
