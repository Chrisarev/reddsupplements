import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React from 'react';
import Home from './Home'
import Protein from './Protein'
import AddProduct from './AddProduct'
import ProductsGrid from './ProductsGrid'
import ProductShow from './ProductShow'
import Signup from './Signup';
import Login from './Login';
import Checkout from './Checkout'

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/protein" element={<Protein />}></Route>
          <Route path="/addProduct" element={<AddProduct />}></Route>
          <Route path="/category/:category" element={<ProductsGrid />}></Route>
          <Route path="/product/:prodID" element={<ProductShow />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/checkout" element={<Checkout />}></Route>
        </Routes>
      </div>
    </Router>
  )
}

export default App
