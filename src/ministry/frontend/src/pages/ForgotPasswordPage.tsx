import { Link, useLocation } from 'react-router-dom'
import login from '../assets/login.svg'
import { useState } from 'react';

function ForgotPasswordPage() {
    const [NIN] = useState(useLocation().state?.NIN ?? "");

    function handleResetPassword() {
        // submit reset password

        //navigate("/dashboard", { replace: false })
    }

    return <div className="bg-gradient-to-r from-[#ecfef5] to-[#fee5d3] w-[100vw] h-[100vh] flex justify-center items-center">
        <div className="bg-white shadow sm:rounded-lg flex justify-center h-5/6" >
            <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-5">
                <div className="mt-7 flex flex-col items-center w-full">
                    <div className='flex justify-center items-center w-full'>
                        <div className='w-[15px] ms-[-15px]'>
                            <Link to="/login"> <i className='fa fa-chevron-left text-2xl' /></Link>
                        </div>
                        <h1 className="text-2xl xl:text-3xl font-extrabold text-black mb-1 ms-2"> Connexion </h1>
                    </div>
                    <h2 className="text-xl xl:text-xl text-sky-500 font-extrabold"> Compte Patient </h2>
                    <div className="w-full flex-1 mt-8">
                        <div>
                            <div className="alert alert-danger">
                            </div>
                            <div className="my-12 border-b text-center">
                                <div className="leading-none px-2 inline-block text-sm tracking-wide font-medium bg-white transform translate-y-1/2 text-black">
                                    Se connecter avec le NIN et le mot de passe
                                </div>
                            </div>

                            <div className="mx-auto max-w-xs">
                                <input className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white dark:text-gray-400" type="text" name="NIN" placeholder="NIN" value={NIN} disabled />
                                <button onClick={handleResetPassword} className="mt-5 tracking-wide font-semibold bg-cyan-500 text-white w-full py-4 rounded-lg hover:bg-cyan-600 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                                    <svg className="w-6 h-6 -ml-2" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                                        <circle cx="8.5" cy="7" r="4" />
                                        <path d="M20 8v6M23 11h-6" />
                                    </svg>
                                    <span className="ml-3"> Réinitialiser le mot de passe </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex-1 bg-indigo-100 text-center hidden md:flex dark:bg-gray-800 dark:text-gray-200">
                <img src={login} />
            </div>
        </div>
    </div>
}

export default ForgotPasswordPage