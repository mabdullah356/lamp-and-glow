import Header from './Components/Header'
import Footer from './Components/Footer'
import Home from './Components/Pages/Home'
import Collections from './Components/Pages/Collections'
import ProductPage from './Components/Pages/ProductPage'
import Signature from './Components/Pages/Signature'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <>
      <Router>
        <Header />

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/collections' element={<Collections />} />
          <Route path='/signature' element={<Signature />} />
          <Route path='/product/:id' element={<ProductPage />} />
        </Routes>

        <Footer />
      </Router>
    </>
  )
}

export default App
