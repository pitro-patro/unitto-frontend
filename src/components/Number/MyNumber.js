import React, { useEffect, useState } from "react";
import request from "../../request";

const MyNumber = () =>{

    const [userNumberData, setUserNumberData] = useState([]);

    useEffect(() =>{
        const getUserData = async () =>{
            const userNumberData = await request.getUserNumberData();
            setUserNumberData(userNumberData);
        }

        getUserData();
        console.log(userNumberData);
    }, []);

    const DataList = (props) =>{
        const numberData = props.userNumberData;

        if(numberData.length === 0){
            return(
                <div>발급받은 번호가 없습니다</div>
            )
        }

        const dataList = numberData.map(data =>
            <li key={data.id}>
                <div>{data.lotteryNumber}</div>
                <div>{data.confirmDate}</div>
            </li>
        );

        return(
            <div>
                <ul>{dataList}</ul>
            </div>
        )
    }

    return(
        <div>
            <h2>내가 구매한 번호</h2>
            <div>
                <DataList userNumberData={userNumberData}/>
            </div>
        </div>
    )
}

export default MyNumber;