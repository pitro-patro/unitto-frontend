import axios from "axios";

const axi = axios.create({baseURL: "http://localhost:3000/"});

export async function getJwtToken(code){
    const userSignInData = await axi.get(
        `/login/oauth2/code/kakao?code=${code}`
    );

    const jwtToken = userSignInData.data.jwtToken;
    return jwtToken;

}

export default {
    getJwtToken,
}