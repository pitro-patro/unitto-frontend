import React from "react";
import request from "../../request";

const LoginRedirect = () =>{

    let code = new URL(window.location.href).searchParams.get("code");

    const kakao = async () => {
        const jwtToken = await request.getJwtToken(code);
        localStorage.setItem('jwtToken', jwtToken);

        document.location.href = "/";
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