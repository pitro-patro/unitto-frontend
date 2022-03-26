import React, { useState } from "react";
import request from "../request";
import Timer from "./Timer";

const Number = () =>{

    const [uniqueNumber, setUniqueNumber] = useState([]);
    const [expireTime, setExpireTime] = useState('');
    
    const getNumber = async () =>{
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

        // TODO : 타임아웃시 처리 필요
        setTimeout(()=>{
            alert("타임아웃!!! 번호 이제 못씀!");
        }, numberAndExpireTime.expireTime * 1000);
        // 밑에서 clearTimeout()으로 타이머 멈춤 필요
    };

    const confirmNumber = async (isConfirmed) =>{
        const confirmedUniqueNumber = await request.confirmLotteryUniqueNumber(uniqueNumber, isConfirmed);
        if(confirmedUniqueNumber){
            alert(`${confirmedUniqueNumber} 번호가 등록되었습니다!`);
        }else{
            alert("번호 등록을 취소했습니다!");
            setUniqueNumber([]);
        }
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
                <Timer expireTimeInSeconds={expireTime}/>
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
                <NumberList numbers={uniqueNumber} expireTime={expireTime}/>
            </div>
        </div>
    );
};

export default Number;