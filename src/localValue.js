export const BASE_URL = "http://localhost:3000/";

export const MAX_INCLUDE_NUMBER = 5;
export const MAX_EXCLUDE_NUMBER = 39;

export const numberColor = (number) =>{
    let color;
    if(number <= 10)
        color = "rgb(255, 157, 157)";
    else if(number <= 20)
        color = "rgb(255, 221, 157)";
    else if(number <= 30)
        color = "rgb(157, 255, 159)";
    else if(number <= 40)
        color = "rgb(157, 196, 255)";
    else
        color = "rgb(219, 157, 255)";
    
    return color;
}