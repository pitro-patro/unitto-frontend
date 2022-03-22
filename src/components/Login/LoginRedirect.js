import React from "react";
import axios from 'axios';

const LoginRedirect = () =>{

    let code = new URL(window.location.href).searchParams.get("code");

    const kakao = async () => {
        try{
            const result = await axios.get(
                `/login/oauth2/code/kakao?code=${code}`
            );
            const jwtToken = result.data.jwtToken;
            localStorage.setItem('jwtToken', jwtToken);

            document.location.href = "/";

        }catch(error){
            console.log("error", error);
        }
    }
    kakao();

    return(
        <div>
            <h2>
                로그인 중
            </h2>
        </div>
    );
};

export default LoginRedirect;