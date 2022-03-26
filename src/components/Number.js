import React from "react";
import request from "../request";

const Number = () =>{

    const getNumber = async () =>{
        const number = await request.getLotteryUniqueNumber();
        console.log(number);
    };

    return(
        <div>
            <h2>
                번호 생성기
            </h2>
            <button onClick={getNumber}>
                번호 발급
            </button>
        </div>
    );
};

export default Number;