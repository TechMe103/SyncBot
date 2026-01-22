import { useState } from 'react'
import './App.css'
import LandingPage from "./pages/landingPage.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Authentication from './pages/authenticationPage.jsx';


function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />}/>
        {/* <Route path="/auth" element={<Authentication/>} />
        <Route path="/auth" element={<Authentication/>} /> */}
      </Routes>
    </Router>
  )
}

export default App
