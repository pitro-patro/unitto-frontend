import React, { useEffect, useState } from "react";
import { KAKAO_AUTH_URL } from "../../../src/secretKey";
import kakaoLoginImage from '../../img/kakao_login_medium_narrow.png'
import request from "../../request";

const LoginState = () => {
    const [jwtToken, setJwtToken] = useState(
        localStorage.getItem('jwtToken')
    );
    const [userData, setUserData] = useState('');

    const logoutHandler = () => {
        localStorage.removeItem('jwtToken');
        //TODO : 삭제예정
        console.log(jwtToken);
        document.location.href= "/";
    }
    
    useEffect(() => {
        if(!jwtToken){
            return;
        }

        const getUserData = async (jwtToken) => {
            const userData = await request.getUserData(jwtToken);
            setUserData(userData);
        };
        getUserData(jwtToken);
    }, []);

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
            <div>
                <h3>
                    사용자 정보
                </h3>
                <ul>
                    {
                        Object.keys(userData).map((key, index)=>
                            <li key={index}>{key} : {userData[key]}</li>)
                    }
                </ul>
                
            </div>

            <button onClick={logoutHandler}>
                로그아웃
            </button>
        </div>
    )
};

export default LoginState;