import React, { useEffect, useState } from "react";
import "../../styles/Timer.css"

const Timer = (props) =>{
    const [minutes, setMinutes] = useState(parseInt(props.expireTimeInSeconds/60));
    const [seconds, setSeconds] = useState(parseInt(props.expireTimeInSeconds%60));

    useEffect(() =>{
        const countdown = setInterval(() => {
            if(seconds > 0){
                setSeconds(seconds-1);
            }

            if(seconds === 0){
                if(minutes === 0){
                    // 타이머 끝날시 처리
                    props.timeout();
                    alert('발급 가능 시간이 만료되었습니다!');
                    clearInterval(countdown);
                }else{
                    setMinutes(minutes-1);
                    setSeconds(59);
                }
            }
        }, 1000);

        return () => clearInterval(countdown);
    }, [minutes, seconds]);

    return(
        <div class="timerContainer">
            <h1>남은 시간</h1>
            <div>
                <ul>
                    <li className="timerLi"><span className="timerSpan">{minutes}</span>MINUTES</li>
                    <li className="timerLi"><span className="timerSpan">{seconds < 10 ? `0${seconds}` : seconds}</span>SECONDS</li>
                </ul>
            </div>
        </div>
    )
}

export default Timer;