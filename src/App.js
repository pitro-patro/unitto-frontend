import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Number from './components/Number';
import Navigation from './components/Navigation';
import LoginRedirect from './components/Login/LoginRedirect';

import LoginState from './components/Login/LoginState';

function App() {

  const [testStr, setTestStr] = useState('');
  const [jwtToken, setJwtToken] = useState('');

  function callback(str){
    setTestStr(str);
  }

  useEffect(
    ()=>{
      axios({
        url: '/login/react-test',
        method: 'GET'
      }).then((res)=>{
        callback(res.data);
      })
    }, []
  );

  return (
    <div className="App">

      <LoginState/>
      <Navigation/>

      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/number" element={<Number/>}/>
        <Route path="/login/code/kakao" element={<LoginRedirect/>}/>
      </Routes>

      <header className="App-header">
        {testStr}
      </header>

    </div>
    
  );
}

export default App;
