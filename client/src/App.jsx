import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './pages/Login'
import Chat from './pages/Chat'
import Register from './pages/Register'
import Landing from './pages/Landing'
import ProtectedRoute from './components/ProtectedRoute'
import Scenarios from './pages/Scenarios'
import WritingScenarios from './pages/WritingScenarios'

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
      </Routes>
    </BrowserRouter>
  )
}

export default App

