import axios, { AxiosError } from "axios";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "./UI/Alert";
import secureLocalStorage from "react-secure-storage";
import { baseURL } from "../hooks";

type UserError = {code: string, message: string}

function TwoFactorForm({ formActions, NIN }: LoginFormProps ){
    const navigate = useNavigate();

    const [OTP, setOTP] = useState(['', '', '', '', '', '']);
    const OTPBoxReference = useRef([]);
    const [error, setError] = useState<UserError>()
    
    function handleChange(index: number, value: string) {
        let newArr = [...OTP];
        newArr[index] = value;
        setOTP(newArr);

        if (value && index < 5)
            OTPBoxReference.current[index + 1].focus()
    }

    function handleBackspaceAndEnter(index: number, e) {
        if (e.key === "Backspace" && !e.target.value && index > 0)
            OTPBoxReference.current[index - 1].focus()

        if (e.key === "Enter" && e.target.value && index < 5)
            OTPBoxReference.current[index + 1].focus()
    }

    async function handle2FA(e: any){
        e.preventDefault();
        // submit login
        const body = { NIN: NIN, token: OTP.join('') }
        try {

            const response = await axios.post(`${baseURL}/api/auth/verify-2fa`, body)
            const data = response.data
            // if 2fa enabled, swap
            if (data.successCode == "login.2fa-code")
                formActions.swapTo2FA();

            else{
                secureLocalStorage.setItem('NIN', data.NIN)
                secureLocalStorage.setItem('permissions', data.permissions)
                navigate("/dashboard", { replace: false })
            }
        } catch (err: AxiosError | any) {
            if (err.response)
                setError({ code: err.response.data.errorCode, message: err.response.data.errorMessage })

            else if (err.request)
                setError({ code: "Network error", message: "Auth service cannot be contacted at this moment." })
        }
    }
    return <div>
        <div className="alert alert-danger">
        </div>
        <div className="my-12 border-b text-center">
            <div className="leading-none px-2 inline-block text-sm tracking-wide font-medium bg-white transform translate-y-1/2 text-black">
                Introduire le OTP
            </div>
        </div>

        <div className="mx-auto max-w-xs">
            {error &&
                <Alert color='bg-red-400'>
                    {error.code} - {error.message}
                </Alert>
            }
            <div className="grid grid-cols-6 gap-2">
                {OTP.map((digit, index) => (
                    <input className="px-4 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white dark:text-gray-400" maxLength={1} key={index}
                           value={digit}
                           onChange={(e) => handleChange(index, e.target.value)}
                           onKeyDown={(e) => handleBackspaceAndEnter(index, e)}
                           ref={(reference) => (OTPBoxReference.current[index] = reference)}/>
                ))}
            </div>

            <button onClick={handle2FA} className="mt-5 tracking-wide font-semibold bg-cyan-500 text-white w-full py-4 rounded-lg hover:bg-cyan-600 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                <svg className="w-6 h-6 -ml-2" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                    <circle cx="8.5" cy="7" r="4" />
                    <path d="M20 8v6M23 11h-6" />
                </svg>
                <span className="ml-3"> Se connecter </span>
            </button>
        </div>
    </div>
}
export default TwoFactorForm