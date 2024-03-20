import Sidebar from '../components/Sidebar/Sidebar'
import Header from '../components/Header/Header'
import Footer from '../components/Footer'
import { ReactNode, useEffect, useState } from 'react'

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
      <Sidebar setOpen={() => setSidebarOpen(!sidebarOpen)}></Sidebar>
      <Header setOpen={() => setSidebarOpen(!sidebarOpen)}></Header>
      <main className='min-h-[91vh] flex flex-col justify-between'>
        <div className={`w-full px-2 sm:px-6 py-6 mx-auto ${size} flex justify-center flex-wrap`}>
          { children }
        </div>
        <Footer></Footer>
      </main>
    </>
  )
}

export default Scaffold