import { Outlet } from 'react-router-dom'
import Footer from './components/Footer'
import Header from './components/Header'
import Layout from './components/Layout'

function App() {

  return (
    <Layout>
      <Header/>
      <Outlet/>
      <Footer/>
    </Layout>
  )
}

export default App
