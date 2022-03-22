import React from "react";
import axios from 'axios';

const Login = () =>{

    let code = new URL(window.location.href).searchParams.get("code");

    const kakao = async () => {
        try{
            const result = await axios.get(
                `/login/oauth2/code/kakao?code=${code}`
            );
            console.log(result);
        }catch(error){
            console.log("error", error);
        }
    }
    kakao();

    return(
        <div>
            <h2>
                로그인 + JWT 토큰
                {code}
            </h2>
        </div>
    );
};

export default Login;