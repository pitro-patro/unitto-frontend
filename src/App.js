import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Route, Routes } from 'react-router-dom';
import Title from './components/Title';
import Home from './components/Home';
import Number from './components/Number/Number';
import Navigation from './components/Navigation';
import LoginRedirect from './components/Login/LoginRedirect';

import request from "./request";

import LoginState from './components/Login/LoginState';
import MyNumber from './components/Number/MyNumber';
import LotteryRoundNumber from './components/Number/LotteryRoundNumber';

function App() {

  const [lotteryRound, setLotteryRound] = useState('');

  useEffect(() =>{
    const getLotteryRound = async () =>{
        const lotteryRoundData = await request.getLotteryRound();
        setLotteryRound(lotteryRoundData);
    }

    getLotteryRound();
  }, [])

  return (
    <div>

      <div class="background"></div>

      <Title/>
      <div className='headerContainer'>
        <LoginState/>
        <Navigation/>
      </div>
      <div>
        <LotteryRoundNumber/>
      </div>

      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/number" element={<Number currentRound={lotteryRound}/>}/>
        <Route path="/my/number" element={<MyNumber/>}/>
        <Route path="/login/code/kakao" element={<LoginRedirect/>}/>
      </Routes>
      
    </div>
    
  );
}

export default App;
