import axios, { AxiosError } from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "./UI/Alert";
import secureLocalStorage from "react-secure-storage";
import { baseURL } from "../hooks";

type UserError = {
  code: string;
  message: string;
};
function LoginForm({ formActions, NIN, setNIN }: LoginFormProps) {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<UserError>();

  async function handleLogin(e: any) {
    e.preventDefault();
    // submit login
    const body = { NIN: NIN, password: password };
    try {
      const response = await axios.post(
        `${baseURL}/api/auth/login`,
        body
      );
      const data = response.data;
      // if 2fa enabled, swap
      if (data.successCode == "login.2fa-code") formActions.swapTo2FA();
      else {
        secureLocalStorage.setItem("NIN", data.NIN);
        secureLocalStorage.setItem(
          "permissions",
          JSON.stringify(data.permissions)
        );
        navigate(0);
      }
    } catch (err: AxiosError | any) {
      if (err.response)
        setError({
          code: err.response.data.errorCode,
          message: err.response.data.errorMessage,
        });
      else if (err.request)
        setError({
          code: "Échec Réseau",
          message: "Service injoignable en ce moment.",
        });
    }
  }

  function swapToResetPassword(e: any){
    e.preventDefault();
    formActions.swapToResetPassword()
  }

  return (
    <div>
      <div className="alert alert-danger"></div>
      <div className="my-12 border-b text-center">
        <div className="leading-none px-2 inline-block text-sm tracking-wide font-medium bg-white transform translate-y-1/2 text-black">
          Se connecter avec le NIN et le mot de passe
        </div>
      </div>

      <form className="mx-auto max-w-xs" onSubmit={handleLogin}>
        {error && (
          <Alert color="bg-red-400">
            {error.code} - {error.message}
          </Alert>
        )}
        <input
          className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white dark:text-gray-400"
          type="text"
          name="NIN"
          placeholder="NIN"
          value={NIN}
          onChange={(e) => setNIN!(e.target.value)}
        />
        <input
          className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5 dark:text-gray-400"
          type="password"
          name="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="w-full text-right text-cyan-600 mt-2 text-sm" onClick={(e) => swapToResetPassword(e)}> Vous avez oublié votre mot de passe? </button>
        <button
          onClick={handleLogin}
          className="mt-5 tracking-wide font-semibold bg-cyan-500 text-white w-full py-4 rounded-lg hover:bg-cyan-600 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
        >
          <svg
            className="w-6 h-6 -ml-2"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
            <circle cx="8.5" cy="7" r="4" />
            <path d="M20 8v6M23 11h-6" />
          </svg>
          <span className="ml-3"> Se connecter </span>
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
