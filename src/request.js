import axios from "axios";

const axi = axios.create({baseURL: "http://localhost:3000/"});

function jwtTokenHeader(jwtToken){
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwtToken}`
      };
}

export async function getJwtToken(code){
    const userSignInData = await axi.get(
        `/login/oauth2/code/kakao?code=${code}`
    );

    const jwtToken = userSignInData.data.jwtToken;
    return jwtToken;

}

export async function getUserData(jwtToken){
    // TODO : try catch문 어디에 위치해야될까
    var userData;
    try{
        userData = await axi.get(
            "/user/my-info",
            {headers: jwtTokenHeader(jwtToken)}
            );
    }catch(error){
        console.log("error", error.response.data.message);
    }
    // const userData = await axi.get("/user/my-info");
    //console.log(userData.data);
    return userData.data;
}

export default {
    getJwtToken,
    getUserData,
}