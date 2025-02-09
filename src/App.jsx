import React from 'react'
import Home from './Pages/Home/Home'
import Footer from './Components/Footer/Footer'
import { toast, ToastContainer } from "react-toastify";
import {  BrowserRouter as Router,Routes,Route, useNavigate } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";
import Login from './Pages/Login/Login';
import ItemDetail from './Pages/ItemDetail/ItemDetail';
import AddItem from './Pages/AddItem/AddItem';


const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path="/detail-page/:id" element={<ItemDetail />} />
        <Route path="/add-item" element={<AddItem />} />
        <Route path='/login' element={<Login/>}/>
      
      </Routes>
       
    </div>
  );
};

export default App;
