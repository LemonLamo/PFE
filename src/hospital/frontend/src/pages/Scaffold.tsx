import Sidebar from '../components/Sidebar'
import Header from '../components/Header/Header'
import Footer from '../components/Footer'
import { ReactNode } from 'react'

type ScaffoldProps = {
    Content : ReactNode
}

function Scaffold({ Content } : ScaffoldProps) {
  return (
    <>
          <Sidebar></Sidebar>
          <main>
              <Header></Header>
              <div className="w-full px-6 py-6 mx-auto max-w-7xl">
                  { Content }
              </div>
              <Footer></Footer>
          </main>
    </>
  )
}

export default Scaffold