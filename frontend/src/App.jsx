/* eslint-disable no-unused-vars */
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import SignUp from './components/authentication/SignUp'
import Login from './components/authentication/Login'
import HomeRoute from './routes/HomeRoute'
import CreatePostRoute from './routes/CreatePostRoute'
import ForgotPassRoute from './routes/ForgotPassRoute'
import Dashboard from './components/dashboard'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/' element={<HomeRoute />}>
          <Route path='/create' element={<CreatePostRoute />} />
        </Route>
        <Route path='/forgot_password' element={<ForgotPassRoute/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
