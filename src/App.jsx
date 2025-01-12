import './App.css'
import Home from './components/Home'
import Navbar from './components/Navbar'
import About from './components/About'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HospRegForm from './components/Hospital/HospRegForm'
import HospLogin from './components/Hospital/HospLogin'
import DocRegForm from './components/Doctors/DocRegForm'
import DocLogin from './components/Doctors/DocLogin'
import HospDashboard from './components/Hospital/HospDashboard'
import DocDashboard from './components/Doctors/DocDashboard'
import Logout from './components/Logout'
import Vacancies from './components/Hospital/Vacancies'
import DisplayVacancies from './components/Doctors/DisplayVacancies'


function App() {

  return (
    <>
      <Router>
        <Navbar home="Home" about="About Us" />

        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/about" element={
            <>
              <About />
            </>
          } />
          <Route path="/HospRegForm" element={<HospRegForm />} />
          <Route path="/HospLogin" element={<HospLogin />} />
          <Route path="/DocRegForm" element={<DocRegForm />} />
          <Route path="/DocLogin" element={<DocLogin />} />
          <Route path="/HospDashboard" element={
            <>
              <Vacancies />
              <HospDashboard />
              <Logout />

            </>
          } />
          <Route path="/DocDashboard" element={
            <>
              <DocDashboard />
              <DisplayVacancies />
              <Logout />
            </>
          } />
        </Routes>
      </Router>
    </>
  )
}

export default App
