import React, { useState } from "react";
import { MAX_EXCLUDE_NUMBER, MAX_INCLUDE_NUMBER } from "../../localValue";
import request from "../../request";
import NumberSelect from "./NumberSelect";
import Timer from "./Timer";

const Number = () =>{

    const [confirmedUniqueNumber, setConfirmedUniqueNumber] = useState([]);

    const [uniqueNumber, setUniqueNumber] = useState([]);
    const [expireTime, setExpireTime] = useState('');
    
    const getNumber = async () =>{
        // TODO : 번호 include, exclude 기능 구현 필요

        var includeExcludeNumber = {
            "includeNumbers" : [],
            "excludeNumbers" : []
        };

        for(let i=1; i<=45; i++){
            const classList = document.getElementById(`number${i}`).classList;
            if(classList.contains("includeNumber")){
                includeExcludeNumber.includeNumbers.push(i);
            }
            else if(classList.contains("excludeNumber")){
                includeExcludeNumber.excludeNumbers.push(i);
            }
        }

        if(includeExcludeNumber.includeNumbers.length > MAX_INCLUDE_NUMBER){
            alert(`포함 번호는 최대 ${MAX_INCLUDE_NUMBER}개 까지 선택 가능합니다!`);
            return;
        }else if(includeExcludeNumber.excludeNumbers.length > MAX_EXCLUDE_NUMBER){
            alert(`제외 번호는 최대 ${MAX_EXCLUDE_NUMBER}개 까지 선택 가능합니다!`);
            return;
        }
        
        

        const numberAndExpireTime = await request.getLotteryUniqueNumberAndExpireTime(includeExcludeNumber);
 
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
                <div>[추가할 번호], [제외할 번호] 선택 후 번호를 생성해주세요</div>
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
                <NumberSelect/>
                <ConfirmedNumberList confirmedNumbers={confirmedUniqueNumber}/>
                <NumberList numbers={uniqueNumber} expireTime={expireTime}/>
            </div>
        </div>
    );
};

export default Number;