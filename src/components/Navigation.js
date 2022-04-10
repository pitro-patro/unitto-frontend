import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navigation.css"

const Navigation = () =>{

    return(
        <div className="navigationContainer">
            <ul className="navigation_ul">
                <li className="navigation_li"><Link className="link_text" style={{ textDecoration: 'none' }} to={"/"}>홈</Link></li>
                <li className="navigation_li"><Link className="link_text hover1" style={{ textDecoration: 'none' }} to={"/my/number"}>내 번호</Link></li>
                <li className="navigation_li"><Link className="link_text hover2" style={{ textDecoration: 'none' }} to={"/number"}>번호생성</Link></li>
            </ul>
        </div>
    )
}

export default Navigation