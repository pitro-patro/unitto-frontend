import React, { useState } from "react";
import { KAKAO_AUTH_URL } from "../../../src/secretKey";
import kakaoLoginImage from '../../img/kakao_login_medium_narrow.png'
import { Route, Routes } from 'react-router-dom';
import LoginRedirect from './LoginRedirect'

const LoginState = () => {
    const [jwtToken, setJwtToken] = useState(
        localStorage.getItem('jwtToken')
    );
    
    if(!jwtToken){
        return(
            <div>
                <a href={KAKAO_AUTH_URL}>
                    <img alt='kakao_login_button' src = {kakaoLoginImage}/>
                </a>
            </div>
        )
    }
    return(
        <div>
            로그인됨
            <div>
                {jwtToken}
            </div>
            <h4>
                로그아웃 버튼 구현
            </h4>
        </div>
    )
};

export default LoginState;