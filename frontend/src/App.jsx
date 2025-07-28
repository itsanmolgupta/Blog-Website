import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import ViewBlog from './pages/ViewBlog'
import About from './pages/About'
import Contact from './Contact'
import UseState from './UseState'
import UseEffect from './UseEffect'
import CreateBlog from './pages/CreateBlog'
import EditBlog from './pages/EditBlog'

function App() {
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/create' element={<CreateBlog />} />
        <Route path='/blog/:id' element={<ViewBlog />} />
        <Route path='/edit/:id' element={<EditBlog />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/count' element={<UseState />} />
        <Route path='/use-effect' element={<UseEffect />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
