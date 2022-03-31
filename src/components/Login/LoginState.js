import React, { useEffect, useState } from "react";
import { KAKAO_AUTH_URL } from "../../../src/secretKey";
import kakaoLoginImage from '../../img/kakao_login_medium_narrow.png'
import request from "../../request";
import "../../styles/LoginState.css"

const LoginState = () => {
    const [jwtToken, setJwtToken] = useState(
        request.getLocalStorageJwtToken()
        //localStorage.getItem('jwtToken')
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

        const getUserData = async () => {
            const userData = await request.getUserData();
            setUserData(userData);
        };
        getUserData(jwtToken);
    }, []);

    if(!jwtToken){
        return(
            <div className="loginStateContainer">
                <a href={KAKAO_AUTH_URL}>
                    <img alt='kakao_login_button' src = {kakaoLoginImage}/>
                </a>
            </div>
        )
    }

    return(
        <div className="loginStateContainer">
            <ul className="userdata_ul">
                <li className="userdata_li">{userData.name}님</li>
                <li className="userdata_li"> / </li>
                <li className="userdata_li">{userData.email}</li>
                <li className="userdata_li">
                    <button className="buttonContainer" onClick={logoutHandler}>
                    로그아웃
                    </button>
                </li>
                {/* {
                    Object.keys(userData).map((key, index)=>
                        <li key={index}>{key} : {userData[key]}</li>)
                } */}
            </ul>
        </div>
    )
};

export default LoginState;