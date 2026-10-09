import React from 'react'
import { Route, Routes } from 'react-router'
import Rootlayout from './Pages/Rootlayout'
import Home from './Pages/Home'
import Blog from './Pages/Blog'
import AboutUs from './Pages/AboutUs'
import BlogRightwide from './Pages/BlogRightwide'
import Card from './Pages/Card'
import Checkout from './Pages/Checkout'
import Faq from './Pages/Faq'
import ProductList from './Pages/ProductList'
import ProductDetails from './Pages/ProductsDetails'
import Wishlist from './Pages/Wishtlist'
import Registation from './Pages/Registation'
import Login from './Pages/Login'
import Contact from './Pages/Contact'


function App() {
  return (
    <>
    
    <Routes>
      <Route path='/' element={ <Rootlayout/> }>
      <Route index element={ <Home/> }/>
      <Route path='blog' element={ <Blog/> }/>
      <Route path='about' element={<AboutUs/>}/>
      <Route path='blogright' element={ <BlogRightwide/> } />
      <Route  path='card' element={ <Card/>  } />
      <Route path='checkout' element={ <Checkout/> } /> 
      <Route path='faq' element={ <Faq/> } />
      <Route path='productlist' element={ <ProductList/> }/>
      <Route path='productdetails/:id' element={<ProductDetails/>} />
      <Route path='wishlist' element={<Wishlist/>}/>
      <Route path='contact' element={ <Contact/> }/>
      <Route path='registation' element={ <Registation/> }/>
      <Route path='login' element={ <Login/>} />

      </Route>
    </Routes>
    </>
  )
}

export default App