import React, {useState, useEffect} from "react";
import { numberColor } from "../../localValue";
import request from "../../request";
import "../../styles/LotteryRoundNumber.css";

const LotteryRoundNumber = () =>{

    const [lotteryRound, setLotteryRound] = useState('');
    const [lotteryNumber, setLotteryNumber] = useState([]);
    const [bonusNumber, setBonusNumber] = useState();
    const [roundDate, setRoundDate] = useState('');

    const [roundList, setRoundList] = useState([]);

    const getPastLotteryRoundData = async (round) =>{
        const pastLotteryRoundData = await request.getPastLotteryRoundData(round);
        setLotteryNumber(pastLotteryRoundData.lotteryRoundNumbers);
        setBonusNumber(pastLotteryRoundData.bonusNumber);
        setRoundDate(getStringRoundDate(pastLotteryRoundData.roundDate));
    }

    const getStringRoundDate = (date) =>{
        let dateString = date.split('-');
        return `(${dateString[0]}년 ${dateString[1]}월 ${dateString[2]}일 추첨)`
    }

    useEffect(() =>{
        const getLotteryRound = async () =>{
            const lotteryRoundData = await request.getLotteryRound();
            setLotteryRound(lotteryRoundData-1);
            getPastLotteryRoundData(lotteryRoundData-1);

            let rounds = []
            for(let i=lotteryRoundData-1; i>0; i--){
                rounds.push(i);
            }
            setRoundList(rounds);
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

        const lotteryNumberList = lotteryNumbers.map(number =>{
            return(
                <li style={{background: numberColor(number)}} className="roundNumberList" key={number}>{number}</li>
            )
        }
            
        );

        return (
            <div>
                <div className="roundDate">{roundDate}</div>
                <ul>
                    {lotteryNumberList}
                    +
                    <li style={{background: numberColor(bonusNumber)}} className="roundNumberList">{bonusNumber}</li>
                </ul>
            </div>
            
        )
    }

    const onRoundChange = (e) =>{
        let round = e.target.value;
        setLotteryRound(round);
        getPastLotteryRoundData(round);
    }

    return(
        <div className="lotteryRoundContainer">
            <div className="lotteryRoundSelectContainer">
                <select onChange={e => onRoundChange(e)}>
                    {
                        roundList.map(round=> <option key={round} value={round}>{round}</option>)
                    }
                </select>
            </div>
            <h2 className="lotteryRound_h2">{`${lotteryRound}회 당첨번호`}</h2>
            <LotteryNumberList lotteryNumbers={lotteryNumber}/>
        </div>
    )
}

export default LotteryRoundNumber;