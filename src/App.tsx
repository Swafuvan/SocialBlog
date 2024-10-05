import { BrowserRouter as Router, Route, Routes, } from 'react-router-dom'
import './App.css'
import HomePage from './pages/Homepage'
import Loginpage from './pages/Loginpage'
import SignUpPage from './pages/SignUpPage'
import ProtectedRoutes from './pages/ProtectedRoute'
import NotFoundPage from './pages/NotFoundpage'
import ProfilePage from './pages/Profilepage'
import BlogCreatePage from './pages/CreateBlog'
import BlogDetailPage from './pages/BlogDetail'

function App() {

  return (
    <>
      <Router>
        <Routes>

          {/* public Routes */}
          <Route path='/login' element={<Loginpage />} />
          <Route path='/signup' element={<SignUpPage />} />

          <Route element={<ProtectedRoutes />} >
            <Route path='/' element={<HomePage />} />
            <Route path='/profile' element={<ProfilePage />} />
            <Route path='/create' element={<BlogCreatePage />} />
            <Route path='/blog' element={<BlogDetailPage />} />
          </Route>

          {/* 404 route */}
          <Route path="*" element={<NotFoundPage />} />

        </Routes>
      </Router>
    </>
  )
}

export default App
