import React, { useEffect, useState } from "react";
import { MAX_EXCLUDE_NUMBER, MAX_INCLUDE_NUMBER, numberColor } from "../../localValue";
import request from "../../request";
import NumberSelect from "./NumberSelect";
import Timer from "./Timer";
import LotteryRoundNumber from "./LotteryRoundNumber";
import "../../styles/Number.css"

const Number = () =>{

    const [lotteryRound, setLotteryRound] = useState('');

    const [confirmedUniqueNumber, setConfirmedUniqueNumber] = useState([]);

    const [uniqueNumber, setUniqueNumber] = useState([]);
    const [expireTime, setExpireTime] = useState('');

    const [includeExcludeNumber, setIncludeExcludeNumber] = useState({
        "includeNumbers" : [],
        "excludeNumbers" : []  
    });

    useEffect(() =>{
        const getLotteryRound = async () =>{
            const lotteryRoundData = await request.getLotteryRound();
            setLotteryRound(lotteryRoundData);
        }

        getLotteryRound();
    }, [])
    
    const getNumber = async () =>{

        let tempIncludeExcludeNumber = {
            "includeNumbers" : [],
            "excludeNumbers" : []
        };

        for(let i=1; i<=45; i++){
            const classList = document.getElementById(`number${i}`).classList;
            if(classList.contains("includeNumber")){
                tempIncludeExcludeNumber.includeNumbers.push(i);
            }
            else if(classList.contains("excludeNumber")){
                tempIncludeExcludeNumber.excludeNumbers.push(i);
            }
        }

        if(tempIncludeExcludeNumber.includeNumbers.length > MAX_INCLUDE_NUMBER){
            alert(`포함 번호는 최대 ${MAX_INCLUDE_NUMBER}개 까지 선택 가능합니다!`);
            return;
        }else if(tempIncludeExcludeNumber.excludeNumbers.length > MAX_EXCLUDE_NUMBER){
            alert(`제외 번호는 최대 ${MAX_EXCLUDE_NUMBER}개 까지 선택 가능합니다!`);
            return;
        }
        
        

        const numberAndExpireTime = await request.getLotteryUniqueNumberAndExpireTime(tempIncludeExcludeNumber);
 
        // 포함 제외 번호 저장
        setIncludeExcludeNumber(tempIncludeExcludeNumber);
  
        setConfirmedUniqueNumber([]);
        setUniqueNumber(numberAndExpireTime.uniqueLotteryNumbers);
        setExpireTime(numberAndExpireTime.expireTime);
    };

    const confirmNumber = async (isConfirmed) =>{
        const confirmedUniqueNumber = await request.confirmLotteryUniqueNumber(uniqueNumber, isConfirmed);
        if(confirmedUniqueNumber){
            alert(`${confirmedUniqueNumber} 번호가 등록되었습니다!`);
            setConfirmedUniqueNumber(uniqueNumber);
        }else{
            alert("번호 등록을 취소했습니다!");
        }
        setUniqueNumber([]);
    }

    const timeout = () =>{
        setUniqueNumber([]);
    }

    const ConfirmedNumberList = (props) =>{
        const confirmedNumbers = props.confirmedNumbers;

        if(confirmedNumbers.length === 0){
            return(
                <div></div>
            )
        }

        const confirmedUniqueNumberList = confirmedNumbers.map(number =>
            <li style={{background: numberColor(number)}} className="numberList" key={number}>{number}</li>
        );

        return (
            <div>
                <h1>등록된 번호</h1>
                <ul>{confirmedUniqueNumberList}</ul>
            </div>
            
        )
    }

    const NumberList = (props) =>{
        const numbers = props.numbers;
        const expireTime = props.expireTime;

        if(numbers.length === 0){
            return(
                <div className="textContainer">
                    <div className="includeNumber textBox">추가 번호</div>
                    <div className="excludeNumber textBox">제외 번호</div>
                    선택 후 번호를 생성해주세요
                </div>
            )
        }
        
        const uniqueNumberList = numbers.map(number =>
            <li style={{background: numberColor(number)}} className="numberList" key={number}>{number}</li>
        );

        return (
            <div>
                <ul>{uniqueNumberList}</ul>
                <Timer expireTimeInSeconds={expireTime} timeout={timeout}/>
                <button className="defaultButton confirmButton" onClick={()=>confirmNumber(true)}>사용</button>
                <button className="defaultButton confirmButton" onClick={()=>confirmNumber(false)}>취소</button>
            </div>
            
        )
    }

    return(
        <div className="numberContainer">
            <div>
                <LotteryRoundNumber currentRound={lotteryRound}/>
            </div>
            <h2>
                {`${lotteryRound}회차 로또 번호 생성기`}
            </h2>
            <button className="defaultButton" onClick={getNumber}>
                번호 발급
            </button>
            <div>
                <NumberSelect includeExcludeNumber={includeExcludeNumber}/>
                <ConfirmedNumberList confirmedNumbers={confirmedUniqueNumber}/>
                <NumberList numbers={uniqueNumber} expireTime={expireTime}/>
            </div>
        </div>
    );
};

export default Number;