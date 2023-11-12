import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Head from './pages/customer/Head'
import Body from './pages/customer/Body'
import ProtectedRoute from './pages/ProtectedRoute'
import CustomerLogin from './pages/customer/Login';
import Dashboard from './pages/admin/Dashboard'
import AdminPage from './pages/admin/AdminPage'
import "./App.css"
import UserPage from './pages/admin/UserPage'

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          
          <Route path='/' element={<CustomerLogin />} />
          <Route path='/admin' element={<AdminPage />} />
          <Route path= '/user' element={<UserPage />} />
          {/* <Route element={<ProtectedRoute />}>
            <Route path="/head" element={<Head />} />
            <Route path="/body" element={<Body />} /> 
          </Route> */}
        </Routes>
      </Router>
    </>
  )
}

export default App