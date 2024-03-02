import Sidebar from '../components/Sidebar'
import Header from '../components/Header/Header'
import Footer from '../components/Footer'

function Dashboard(){

    return <>
      <Sidebar></Sidebar>
      <main>
        <Header></Header>
        <div className="w-full px-6 py-6 mx-auto max-w-7xl">
          Hi, this is the dashboard
          
        </div>
        <Footer></Footer>
      </main>
    </>
}

export default Dashboard;