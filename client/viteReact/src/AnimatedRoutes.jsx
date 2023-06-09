import React from 'react';
import './App.css';
import Home from './Home'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import {AnimatePresence} from 'framer-motion'
import {Protein} from './Protein'
function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <AnimatePresence>
        <Routes location={location} key={location.pathname}>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
          <Route path="/" element={<Home />}></Route>
          <Route path="/protein" element={<Protein />}></Route>
        </Routes>
    </AnimatePresence>
  );
}

export default AnimatedRoutes;
