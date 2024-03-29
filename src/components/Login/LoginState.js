import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { KAKAO_AUTH_URL } from "../../../src/secretKey";
import kakaoLoginImage from '../../img/kakao_login_medium_narrow.png'
import { flushAll, storeJwtToken, storeUserData } from "../../modules/user";
import request from "../../request";
import "../../styles/LoginState.css"

const LoginState = () => {

    const dispatch = useDispatch();

    const [jwtToken, setJwtToken] = useState(
        request.getLocalStorageJwtToken()
    );
    const [userData, setUserData] = useState('');

    const logoutHandler = () => {
        localStorage.removeItem('jwtToken');
        dispatch(flushAll());
        document.location.href= "/";
    }
    
    useEffect(() => {
        if(!jwtToken){
            return;
        }

        const getUserData = async () => {
            const userData = await request.getUserData();
            setUserData(userData);
            dispatch(storeUserData(userData));
        };
        getUserData(jwtToken);
        dispatch(storeJwtToken(jwtToken));
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
                <li className="userdata_li">{userData.email}</li>
                <li className="userdata_li">
                    <button className="buttonContainer" onClick={logoutHandler}>
                    로그아웃
                    </button>
                </li>
            </ul>
        </div>
    )
};

export default LoginState;