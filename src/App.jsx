import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Head from './pages/customer/Head'
import Body from './pages/customer/Body'
import ProtectedRoute from './pages/ProtectedRoute'
import CustomerLogin from './pages/customer/Login';
import AdminDashboard from './pages/admin/Dashboard';
import ThemeProvider from './themes'
// import Router from 'src/routes/sections';
import DashboardLayout from './layouts/dashboard';
import AdminLogin from './pages/admin/Login';
import CustomerDetail from './pages/admin/CustomerDetail'

import './global.css';


const App = () => {
  return (
    <ThemeProvider>
      <Router>
          <Routes>
            <Route path='/' element={<CustomerLogin />} />
            <Route path='/admin/dashboard' element={<DashboardLayout><AdminDashboard /></DashboardLayout>} />
            <Route path='/admin/login' element={<AdminLogin />} />
            <Route path='/admin/dashboard/customer-details/:id' element={<DashboardLayout><CustomerDetail /></DashboardLayout>} />
            <Route element={<ProtectedRoute />}>
              <Route path="/head" element={<Head />} />
              <Route path="/body" element={<Body />} />
            </Route>
          </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App