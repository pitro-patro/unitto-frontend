import React from "react";
import { Link } from "react-router-dom";

const Navigation = () =>{

    return(
        <div>
            <ul>
                <li><Link to={"/"}>홈</Link></li>
                <li><Link to={"/number"}>번호생성</Link></li>
            </ul>
        </div>
    )
}

export default Navigation