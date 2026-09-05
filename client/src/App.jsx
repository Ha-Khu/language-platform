import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './pages/Login'
import Chat from './pages/Chat'
import Register from './pages/Register'
import Landing from './pages/Landing'
import ProtectedRoute from './components/ProtectedRoute'
import Scenarios from './pages/Scenarios'

function App(){
  return(
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/register' element={<Register />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/scenarios' element={<Scenarios />}/>
        <Route path='/chat/:scenario' element={
          <ProtectedRoute>
            <Chat />
            <Scenarios />
          </ProtectedRoute>
          }/>
      </Routes>
    </BrowserRouter>
  )
}

export default App

