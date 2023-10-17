import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Head from './pages/Head'
import Body from './pages/Body'

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Head />} />
          <Route path='/body' element={<Body />} />
        </Routes>
      </Router>
    </>
  )
}

export default App