import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navigation.css"

const Navigation = () =>{

    return(
        <div className="navigationContainer">
            <ul className="navigation_ul">
                <li className="navigation_li"><Link to={"/"}>홈</Link></li>
                <li className="navigation_li"><Link to={"/my/number"}>내 번호</Link></li>
                <li className="navigation_li"><Link to={"/number"}>번호생성</Link></li>
            </ul>
        </div>
    )
}

export default Navigation