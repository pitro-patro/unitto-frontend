import React, { useState } from "react";
import request from "../request";

const Number = () =>{

    const [uniqueNumber, setUniqueNumber] = useState([]);

    const getNumber = async () =>{
        // TODO : 번호 include, exclude 기능 구현 필요
        //
        var includeExcludeNumber = {
            "includeNumbers" : [1,2,3,4],
            "excludeNumbers" : [28,29,30,31]
        };
        //

        // TODO : 번호 등록 제한시간 기능 구현 필요
        const number = await request.getLotteryUniqueNumber(includeExcludeNumber);
        setUniqueNumber(number);
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
                <NumberList numbers={uniqueNumber}/>
            </div>
        </div>
    );
};

export default Number;