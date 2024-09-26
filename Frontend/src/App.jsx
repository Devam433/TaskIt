import { Outlet, useLocation } from 'react-router-dom'
import Footer from './components/Footer'
import Header from './components/Header'
import Layout from './components/Layout'

function App() {
  const {pathname} = useLocation();
  let hide = false;
  if(pathname=='/signin' || pathname=='/signup' || pathname=='/dashboard' || pathname=='/dashboard/all-tasks' || pathname=='/dashboard/completed-tasks' || pathname=='/dashboard/ongoing-tasks') {
    hide=true;
  } else{
    hide=false;
  }

  return (
    <Layout>
      { !hide && <Header/> }
      <Outlet/>
      { !hide && <Footer/> }
    </Layout>
  )
}

export default App
