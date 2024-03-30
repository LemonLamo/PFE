import { useEffect, useState } from 'react'
import login from '../../assets/login.svg'
import LoginForm from './LoginForm'
import TwoFactorForm from './TwoFactorForm'

function LoginPage() {
  const [form, setForm] = useState(0);
  const [NIN, setNIN] = useState('')

  const formActions : LoginFormActions = {
    swapToLogin: () => setForm(0),
    swapTo2FA: () => setForm(1),
  }

  // Select correct form
  function selectForm(){
    if (form == 0) return <LoginForm formActions={formActions} NIN={NIN} setNIN={setNIN}/>
    else if (form == 1) return <TwoFactorForm formActions={formActions} NIN={NIN} />
  }
  useEffect(() => {
    selectForm();
  }, [form]);

  return <div className="bg-gradient-to-r from-[#ecfef5] to-[#fee5d3] w-[100vw] h-[100vh] flex justify-center items-center sm:px-16">
    <div className="bg-white shadow sm:rounded-lg flex justify-center pb-16 md:pb-0 md:h-5/6" >
      <div className="p-6 sm:p-5">
        <div className="mt-7 flex flex-col items-center w-full">
          <div className='flex justify-center items-center w-full'>
            <div className='w-[15px] ms-[-15px]'>
            { form == 1 && <button onClick={() => setForm(0)}> <i className='fa fa-chevron-left text-2xl' /></button>}
            </div>
            <h1 className="text-2xl xl:text-3xl font-extrabold text-black mb-1 ms-2"> Connexion </h1>
          </div>
          <h2 className="text-xl xl:text-xl text-sky-500 font-extrabold"> Compte Personnel Medical </h2>
          <div className="w-full flex-1 mt-8">
            {selectForm()}
          </div>
        </div>
      </div>
      <div className="flex-1 bg-indigo-100 text-center hidden md:flex">
        <img src={login} className='w-full'/>
      </div>
    </div>
  </div>
}

export default LoginPage