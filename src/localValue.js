export const MAX_INCLUDE_NUMBER = 5;
export const MAX_EXCLUDE_NUMBER = 39;

// Lottery Round
const round = 1010;
const roundDate = "2022-04-03";

export const CURRENT_LOTTERY_ROUND = getLotteryRound();

function getLotteryRound(){
    let lastDate = new Date(roundDate);
    let currentDate = new Date();

    let timeDifference = currentDate.getTime() - lastDate.getTime();

    let dayDifference = timeDifference / (1000 * 3600 * 24);

    return round + Math.floor(dayDifference/7);
}