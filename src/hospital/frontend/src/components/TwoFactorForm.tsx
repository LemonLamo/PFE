import { useNavigate } from "react-router-dom";

function TwoFactorForm({ formActions }: LoginFormProps ){
    const navigate = useNavigate();

    function handle2FA(){
        // submit 2fa

        // handle response
        formActions.swapToLogin();
        navigate("/dashboard", { replace: false })
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
            <div className="grid grid-cols-6 gap-2">
                <input className="px-4 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white dark:text-gray-400" />
                <input className="px-4 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white dark:text-gray-400" />
                <input className="px-4 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white dark:text-gray-400" />
                <input className="px-4 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white dark:text-gray-400" />
                <input className="px-4 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white dark:text-gray-400" />
                <input className="px-4 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white dark:text-gray-400" />
            </div>

            <button onClick={handle2FA} className="mt-5 tracking-wide font-semibold bg-cyan-500 text-white w-full py-4 rounded-lg hover:bg-cyan-600 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                <svg className="w-6 h-6 -ml-2" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
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