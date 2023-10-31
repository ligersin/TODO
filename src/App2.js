import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Navbar from './components/Navbar';
import About from './pages/About';
import Home from './pages/Home';
import Services from './pages/Services';


function App() {
    return (
<h2>
 <BrowserRouter>
 <Navbar/>

  <Routes>
      <Route path ="/" exact element={<Home></Home>}/> 
      <Route path ="/about" element={<About></About>}/> 
      <Route path ="/services" element={<Services></Services>}/> 
  </Routes>

 
 </BrowserRouter>
</h2>
    );

}

export default App;