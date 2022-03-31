import React, { useEffect, useState } from "react";
import request from "../../request";
import "../../styles/MyNumber.css"

const MyNumber = () =>{

    const [userNumberData, setUserNumberData] = useState([]);

    useEffect(() =>{
        const getUserData = async () =>{
            const userNumberData = await request.getUserNumberData();
            setUserNumberData(userNumberData);
        }

        getUserData();
    }, []);

    const DataList = (props) =>{
        const numberData = props.userNumberData;

        if(numberData.length === 0){
            return(
                <div>
                    <table className="myNumberTable">
                        <caption><h3>구매한 번호가 없습니다</h3></caption>
                    </table>
                </div>
            )
        }

        const dataListRow = numberData.map(data =>
            <tr className="myNumberRow">
                <td>{data.lotteryNumber}</td>
                <td>{data.confirmDate}</td>
            </tr>
        );

        return(
            <div>
                <table className="myNumberTable">
                    <caption><h2>내가 구매한 번호</h2></caption>
                    <thead>
                        <tr>
                            <th className="myNumberTh">번호</th>
                            <th className="myNumberTh">발급 시간</th>
                        </tr>
                    </thead>

                    <tbody>
                        {dataListRow}
                    </tbody>
                </table>
            </div>
        )
    }

    return(
        <div>
            <div>
                <DataList userNumberData={userNumberData}/>
            </div>
        </div>
    )
}

export default MyNumber;