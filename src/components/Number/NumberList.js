// TODO : 삭제 예정
import Timer from "./Timer";
import React, { useState } from "react";

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
            <button onClick={()=>props.confirmNumber(true)}>사용</button>
            <button onClick={()=>props.confirmNumber(false)}>취소</button>
        </div>
        
    )
}

export default NumberList;