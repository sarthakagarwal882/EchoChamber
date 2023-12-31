/* eslint-disable no-unused-vars */
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import SignUp from './components/authentication/SignUp'
import Login from './components/authentication/Login'
import HomeRoute from './routes/HomeRoute'
import CreatePostRoute from './routes/CreatePostRoute'
import ForgotPassRoute from './routes/ForgotPassRoute'
import DashboardRoute from './routes/DashboardRoute'
import { ToastContainer } from 'react-toastify'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/dashboard' element={<DashboardRoute />} />
        <Route path='/create' element={<CreatePostRoute />} />
        <Route path='/' element={<HomeRoute />}>
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
        </Route>
        <Route path='/forgot_password' element={<ForgotPassRoute />} />
      </Routes>
      <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
    </BrowserRouter>
  )
}

export default App
