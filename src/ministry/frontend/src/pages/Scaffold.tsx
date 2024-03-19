import Header from '../components/Header/Header'
import Footer from '../components/Footer'
import { ReactNode, useEffect, useState } from 'react'
import Navbar from '../components/Navbar'

type ScaffoldProps = {
  size?: string,
  children : ReactNode
}

function Scaffold({ size ="max-w-8xl", children } : ScaffoldProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  useEffect(()=>{
    document.getElementById('sidenav_close_button')?.classList.toggle("hidden");
    document.getElementById('sidenav')?.classList.toggle("translate-x-0");
    document.getElementById('sidenav')?.classList.toggle("shadow-soft-xl");
    document.getElementById('top_bread')?.classList.toggle("translate-x-[5px]");
    document.getElementById('bottom_bread')?.classList.toggle("translate-x-[5px]");
  }, [sidebarOpen]);

  return (
    <>
      <Navbar setOpen={() => setSidebarOpen(!sidebarOpen)} className={size}/>
      <main className={`container min-h-[91vh] flex flex-col justify-between ${size}`}>
        <div className='w-full sm:px-6 py-6 mx-auto flex justify-center flex-wrap'>
          <Header/>
          { children }
        </div>
        <Footer></Footer>
      </main>
    </>
  )
}

export default Scaffold