import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
  Outlet,
} from 'react-router-dom'
import Layout from './components/layout/Layout'
import Sidebar from './components/sidebar/Sidebar'
import Forgot from './pages/auth/Forgot'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import Reset from './pages/auth/Reset'
import Dashboard from './pages/dashboard/Dashboard'
import Home from './pages/home/Home'
import axios from 'axios'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useAppSelector } from './redux/store'
import AddProduct from './pages/addProduct/AddProduct'

axios.defaults.withCredentials = true

const ProtectedRoute = () => {
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn)
  if (!isLoggedIn) {
    return <Navigate to='/login' replace />
  }
  return <Outlet />
}

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path='/reset/:resetToken' element={<Reset />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/forgot' element={<Forgot />} />
        <Route element={<ProtectedRoute />}>
          <Route
            path='/dash'
            element={
              <Sidebar>
                <Layout>
                  <Dashboard />
                </Layout>
              </Sidebar>
            }
          />
          <Route
            path='/add-product'
            element={
              <Sidebar>
                <Layout>
                  <AddProduct />
                </Layout>
              </Sidebar>
            }
          />
        </Route>
        <Route path='/' element={<Home />} />
        <Route path='*' element={<p>There's nothing here: 404!</p>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
