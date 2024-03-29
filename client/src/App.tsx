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
import Summary from './pages/summary/Summary'
import Home from './pages/home/Home'
import axios from 'axios'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useAppSelector } from './redux/store'
import AddProduct from './pages/addProduct/AddProduct'
import ProductDetail from './components/products/ProductDetail'
import EditProduct from './pages/editProduct/EditProduct'
import Profile from './pages/profile/Profile'
import EditProfile from './pages/profile/EditProfile'
import Contact from './pages/contact/Contact'

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
            path='/summary'
            element={
              <Sidebar>
                <Layout>
                  <Summary />
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
          <Route
            path='/edit-product/:id'
            element={
              <Sidebar>
                <Layout>
                  <EditProduct />
                </Layout>
              </Sidebar>
            }
          />
          <Route
            path='/product-detail/:id'
            element={
              <Sidebar>
                <Layout>
                  <ProductDetail />
                </Layout>
              </Sidebar>
            }
          />
          <Route
            path='/profile'
            element={
              <Sidebar>
                <Layout>
                  <Profile />
                </Layout>
              </Sidebar>
            }
          />
          <Route
            path='/profile-update'
            element={
              <Sidebar>
                <Layout>
                  <EditProfile />
                </Layout>
              </Sidebar>
            }
          />
          <Route
            path='/contact-us'
            element={
              <Sidebar>
                <Layout>
                  <Contact />
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
