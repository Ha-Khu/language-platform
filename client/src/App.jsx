import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './pages/Login'
import Chat from './pages/Chat'
import Register from './pages/Register'
import Landing from './pages/Landing'
import ProtectedRoute from './components/ProtectedRoute'
import Scenarios from './pages/Scenarios'
import WritingScenarios from './pages/WritingScenarios'
import Writing from './pages/Writing'

function App(){
  return(
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/register' element={<Register />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/scenarios' element={<ProtectedRoute><Scenarios /></ProtectedRoute>}/>
        <Route path='/chat/:scenario' element={<ProtectedRoute><Chat /></ProtectedRoute>}/>
        <Route path='/writing-scenarios' element={<ProtectedRoute><WritingScenarios /></ProtectedRoute>}/>
        <Route path='/writing/:scenario' element={<ProtectedRoute><Writing /></ProtectedRoute>}/>

      </Routes>
    </BrowserRouter>
  )
}

export default App

