import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Head from './pages/customer/Head'
import Body from './pages/customer/Body'
import ProtectedRoute from './pages/ProtectedRoute'
import CustomerLogin from './pages/customer/Login';
import ThemeProvider from './themes'

const App = () => {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path='/' element={<CustomerLogin />} />
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