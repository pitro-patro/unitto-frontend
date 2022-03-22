import React, { useState } from "react";
import { KAKAO_AUTH_URL } from "../../../src/secretKey";
import kakaoLoginImage from '../../img/kakao_login_medium_narrow.png'

const LoginState = () => {
    const [jwtToken, setJwtToken] = useState(
        localStorage.getItem('jwtToken')
    );

    const logoutHandler = () => {
        localStorage.removeItem('jwtToken');
        document.location.href= "/";
    }
    
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

            <button onClick={logoutHandler}>
                로그아웃
            </button>
        </div>
    )
};

export default LoginState;