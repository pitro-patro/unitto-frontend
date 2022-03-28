import axios from "axios";
// TODO : JWT 토큰 만료 처리 필요
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

export async function getLotteryUniqueNumberAndExpireTime(includeExcludeNumber){
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
    
    return responseData.data;
}

export async function confirmLotteryUniqueNumber(uniqueNumber, isConfirmed){
    var responseData;

    try{
        responseData = await axi.post(
            "/lottery/unique-numbers-confirm",
            {
                "lotteryNumbers": uniqueNumber,
                "confirm": isConfirmed
            },
            {headers: jwtTokenHeader(getLocalStorageJwtToken())}
        );
    }catch(error){
        console.log("error", error.response.data.message);
    }

    const confirmedUniqueNumber = responseData.data.lotteryNumbers;

    return confirmedUniqueNumber;
}

export async function getUserNumberData(){
    var responseData;

    try{
        responseData = await axi.get(
            "/user/my-number-info",
            {headers: jwtTokenHeader(getLocalStorageJwtToken())}
        );
    }catch(error){
        console.log("error", error.response.data.message);
    }

    return responseData.data;
}

export default {
    getLocalStorageJwtToken,
    getJwtToken,
    getUserData,
    getLotteryUniqueNumberAndExpireTime,
    confirmLotteryUniqueNumber,
    getUserNumberData
}