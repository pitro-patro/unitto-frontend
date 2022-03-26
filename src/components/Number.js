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

        const number = await request.getLotteryUniqueNumber(includeExcludeNumber);
        setUniqueNumber(number);
    };

    const NumberList = (props) =>{
        const numbers = props.numbers;
        
        const uniqueNumberList = numbers.map(number =>
            <li key={number}>{number}</li>
        );

        return (
            <ul>{uniqueNumberList}</ul>
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