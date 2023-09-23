/* eslint-disable no-unused-vars */
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import SignUp from './components/authentication/SignUp'
import Login from './components/authentication/Login'
import HomeRoute from './routes/HomeRoute'
import CreatePostRoute from './routes/CreatePostRoute'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomeRoute />}>
          <Route path='/signup' element={<SignUp />} />
          <Route path='/login' element={<Login />} />
          <Route path='/create' element={<CreatePostRoute />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
