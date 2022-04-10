import React, { useEffect, useState } from "react";
import { numberColor } from "../../localValue";
import request from "../../request";
import "../../styles/MyNumber.css"

const MyNumber = () =>{

    const [userRoundList, setUserRoundList] = useState([]);
    const [userNumberData, setUserNumberData] = useState([]);

    const [selectedNumberData, setSelectedNumberData] = useState([]);

    useEffect(() =>{
        const getUserData = async () =>{
            const userNumberDataResponse = await request.getUserNumberData();
            setUserNumberData(userNumberDataResponse);

            // Get user's bought Rounds
            let roundSet = new Set([]);
            userNumberDataResponse.forEach(element => {
                roundSet.add(element.lotteryRound)
            });
            let roundList = Array.from(roundSet);
            setUserRoundList(roundList);

            setNumberDataByRound(userNumberDataResponse, roundList[0]);
        }

        getUserData();
    }, []);

    const setNumberDataByRound = (numberData, round) =>{
        setSelectedNumberData(numberData.filter(data => data.lotteryRound === round));
    }

    const onRoundChange = (e) =>{
        let round = Number(e.target.value);
        setNumberDataByRound(userNumberData, round);
    }

    const getStringDate = (date) =>{
        let sliceDate = date.split("T");
        let YMD = sliceDate[0].split("-");
        let Time = sliceDate[1].split(":");

        return `${YMD[0]}/${YMD[1]}/${YMD[2]} ${Time[0]}시 ${Time[1]}분`;
    }

    const getLotteryNumberList = (lotteryNumber) =>{
        let numbers = lotteryNumber.split("-");

        return(
            numbers.map(number =>
                <li style={{background: numberColor(number)}} className="myNumberList" key={number}>{number}</li>
                )
        )
    }

    const DataList = (props) =>{
        const numberData = props.userNumberData;

        if(numberData.length === 0){
            return(
                <div>
                    <table className="myNumberTable">
                        <caption><h2>구매한 번호가 없습니다</h2></caption>
                    </table>
                </div>
            )
        }

        const dataListRow = numberData.map((data, index) =>
            <tr className="myNumberRow" key={index}>
                <td>{data.lotteryRound}</td>
                <td>{getLotteryNumberList(data.lotteryNumber)}</td>
                <td>{getStringDate(data.confirmDate)}</td>
            </tr>
        );

        return(
            <div>
                
                
                <table className="myNumberTable">
                    <thead>
                        <tr>
                            <th className="myNumberTh">회차</th>
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
                <div>
                    <h2 className="myNumberTitle">내가 구매한</h2>
                    <select className="lotteryRoundSelect myNumberTitle" onChange={e => onRoundChange(e)}>
                        {
                            userRoundList.map(round=> <option key={round} value={round}>{round}</option>)
                        }
                    </select>
                    <h2 className="myNumberTitle">회차 번호</h2>
                </div>
                <DataList userNumberData={selectedNumberData}/>
            </div>
        </div>
    )
}

export default MyNumber;