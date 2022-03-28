import React, { useState } from "react";
import request from "../../request";
import Timer from "./Timer";

const Number = () =>{

    const [confirmedUniqueNumber, setConfirmedUniqueNumber] = useState([]);

    const [uniqueNumber, setUniqueNumber] = useState([]);
    const [expireTime, setExpireTime] = useState('');
    
    const getNumber = async () =>{
        setConfirmedUniqueNumber([]);
        // TODO : 번호 include, exclude 기능 구현 필요
        //
        var includeExcludeNumber = {
            "includeNumbers" : [1,2,3,4],
            "excludeNumbers" : [28,29,30,31]
        };
        //

        const numberAndExpireTime = await request.getLotteryUniqueNumberAndExpireTime(includeExcludeNumber);
 
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
            <li key={number}>{number}</li>
        );

        return (
            <div>
                <b>등록되었습니다!!!
                </b>
                <ul>{confirmedUniqueNumberList}</ul>
            </div>
            
        )
    }

    const NumberList = (props) =>{
        const numbers = props.numbers;
        const expireTime = props.expireTime;

        if(numbers.length === 0){
            return(
                <div>번호를 생성해주세요</div>
            )
        }
        
        const uniqueNumberList = numbers.map(number =>
            <li key={number}>{number}</li>
        );

        return (
            <div>
                <ul>{uniqueNumberList}</ul>
                <Timer expireTimeInSeconds={expireTime} timeout={timeout}/>
                <button onClick={()=>confirmNumber(true)}>사용</button>
                <button onClick={()=>confirmNumber(false)}>취소</button>
            </div>
            
        )
    }

    return(
        <div>
            <h2>
                번호 생성기
            </h2>
            <button onClick={getNumber}>
                번호 발급
            </button>
            <div>
                <h3>UniqueNumber</h3>
                <ConfirmedNumberList confirmedNumbers={confirmedUniqueNumber}/>
                <NumberList numbers={uniqueNumber} expireTime={expireTime}/>
            </div>
        </div>
    );
};

export default Number;