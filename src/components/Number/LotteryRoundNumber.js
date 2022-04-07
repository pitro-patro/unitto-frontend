import React, {useState, useEffect} from "react";
import request from "../../request";
import "../../styles/LotteryRoundNumber.css";

const LotteryRoundNumber = (props) =>{

    const [lotteryRound, setLotteryRound] = useState('');
    const [lotteryNumber, setLotteryNumber] = useState([]);
    const [bonusNumber, setBonusNumber] = useState('');
    const [roundDate, setRoundDate] = useState('');

    const getPastLotteryRoundData = async (round) =>{
        const pastLotteryRoundData = await request.getPastLotteryRoundData(round);
        setLotteryNumber(pastLotteryRoundData.lotteryRoundNumbers);
        setBonusNumber(pastLotteryRoundData.bonusNumber);
        setRoundDate(pastLotteryRoundData.roundDate);
    }

    useEffect(() =>{
        const getLotteryRound = async () =>{
            const lotteryRoundData = await request.getLotteryRound();
            setLotteryRound(lotteryRoundData-1);
            getPastLotteryRoundData(lotteryRoundData-1);
        }

        getLotteryRound();
    }, [])

    const LotteryNumberList = (props) =>{
        const lotteryNumbers = props.lotteryNumbers;

        if(lotteryNumbers.length === 0){
            return(
                <div></div>
            )
        }

        const lotteryNumberList = lotteryNumbers.map(number =>
            <li className="numberList" key={number}>{number}</li>
        );

        return (
            <div>
                <div>{roundDate}</div>
                <ul>
                    {lotteryNumberList}
                    +
                    <li className="numberList">{bonusNumber}</li>
                </ul>
            </div>
            
        )
    }

    return(
        <div className="lotteryRoundContainer">
            <h2 className="lotteryRound_h2">{`${lotteryRound}회 당첨번호`}</h2>
            <LotteryNumberList lotteryNumbers={lotteryNumber}/>
        </div>
    )
}

export default LotteryRoundNumber;