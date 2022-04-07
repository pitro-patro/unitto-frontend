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
// Lottery Round
// const round = 1010;
// const roundDate = "2022-04-03";

// export const CURRENT_LOTTERY_ROUND = getLotteryRound();

// function getLotteryRound(){
//     let lastDate = new Date(roundDate);
//     let currentDate = new Date();

//     let timeDifference = currentDate.getTime() - lastDate.getTime();

//     let dayDifference = timeDifference / (1000 * 3600 * 24);

//     return round + Math.floor(dayDifference/7);
// }