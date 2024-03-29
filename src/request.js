import axios from "axios";
import { BASE_URL } from "./localValue";
import { KAKAO_AUTH_URL } from "./secretKey";

import { store } from "./index"
import { flushAll } from "./modules/user";

const axi = axios.create({baseURL: BASE_URL});

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

function jwtTokenExceptionHandler(error){
    var message = error.response.data.message;
    if(message === "Token is Expired" || message === "Token is Invalid" || message === "Token is NULL"){
        localStorage.removeItem('jwtToken');
        store.dispatch(flushAll());
        alert("로그인 후 이용해 주세요.");
        document.location.href = KAKAO_AUTH_URL;
    }
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
        jwtTokenExceptionHandler(error);
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
        jwtTokenExceptionHandler(error)
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
        jwtTokenExceptionHandler(error);
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
        jwtTokenExceptionHandler(error);
    }

    return responseData.data;
}

export async function getLotteryRound(){
    var responseData;

    try{
        responseData = await axi.get("/lottery/lottery-round");
    }catch(error){
        console.log("error", error);
    }

    return responseData.data;
}

export async function getPastLotteryRoundData(round){
    var responseData;

    try{
        responseData = await axi.get("/lottery/lottery-round-number",
            {params:{round: round}}
        );
    }catch(error){
        console.log("error ", error);
    }

    return responseData.data;
}

export default {
    getLocalStorageJwtToken,
    getJwtToken,
    getUserData,
    getLotteryUniqueNumberAndExpireTime,
    confirmLotteryUniqueNumber,
    getUserNumberData,
    getLotteryRound,
    getPastLotteryRoundData
}