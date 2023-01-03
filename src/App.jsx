import { Routes, Route } from 'react-router-dom'
import Footer from './components/Footer'
import Navbar from "./components/Navbar"
import Home from './pages/Home'
import { AuthProvider } from './context/authContext'
import SignIn from './pages/SignIn'
import SignUp from './pages/SingUp'
import Account from './pages/Account'
import ProtectedRoute from './components/ProtectedRoute'

function App() {

  return (
    <>
      <AuthProvider> 
        <Navbar/>
      <Routes>
          <Route path='/' element={<Home />} />
          <Route path="signin" element={<SignIn/>} />
          <Route path="signup" element={<SignUp/>} />
          <Route path="account" element={<ProtectedRoute> <Account/></ProtectedRoute>} />
        </Routes>
        <Footer />
      </AuthProvider>
    </>
  )
}

export default App
