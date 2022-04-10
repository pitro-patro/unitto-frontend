import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Number from './components/Number/Number';
import Navigation from './components/Navigation';
import LoginRedirect from './components/Login/LoginRedirect';

import LoginState from './components/Login/LoginState';
import MyNumber from './components/Number/MyNumber';

function App() {

  return (
    <div>
      <h1>UNITTO</h1>
      <div className='headerContainer'>
        <LoginState/>
        <Navigation/>
      </div>
      

      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/number" element={<Number/>}/>
        <Route path="/my/number" element={<MyNumber/>}/>
        <Route path="/login/code/kakao" element={<LoginRedirect/>}/>
      </Routes>

    </div>
    
  );
}

export default App;
