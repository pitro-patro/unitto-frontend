import axios from "axios";

const axi = axios.create({baseURL: "http://localhost:3000/"});

export function getLocalStorageJwtToken(){
    const jwtToken = localStorage.getItem('jwtToken');
    return jwtToken;
}

function jwtTokenHeader(jwtToken){
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwtToken}`
      };
}

export async function getJwtToken(code){
    var userSignInData
    try{
        userSignInData = await axi.get(
            `/login/oauth2/code/kakao?code=${code}`
        );
    }catch(error){
        console.log("error", error);
    }

    const jwtToken = userSignInData.data.jwtToken;
    return jwtToken;

}

export async function getUserData(){
    // TODO : try catch문 어디에 위치해야될까
    var userData;
    try{
        userData = await axi.get(
            "/user/my-info",
            {headers: jwtTokenHeader(getLocalStorageJwtToken())}
            );
    }catch(error){
        console.log("error", error.response.data.message);
    }

    return userData.data;
}

export async function getLotteryUniqueNumber(includeExcludeNumber){
    var responseData;
    
    try{
        responseData = await axi.post(
            "/lottery/unique-numbers",
            includeExcludeNumber,
            {headers: jwtTokenHeader(getLocalStorageJwtToken())}
        );
    }catch(error){
        console.log("error", error.response.data.message);
    }

    const uniqueNumber = responseData.data.uniqueLotteryNumbers;
    
    return uniqueNumber;
}

export default {
    getLocalStorageJwtToken,
    getJwtToken,
    getUserData,
    getLotteryUniqueNumber
}