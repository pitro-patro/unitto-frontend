import React from "react";
import '../../styles/NumberSelect.css';

const NumberSelect = () =>{

    const numberClicked = (id)=>{
        const element = document.getElementById(`number${id}`);
        const classList = element.classList;
        
        if(classList.contains("includeNumber")){
            classList.remove("includeNumber");
            classList.add("excludeNumber");
        }
        else if(classList.contains("excludeNumber")){
            classList.remove("excludeNumber");
        }
        else{
            classList.add("includeNumber");
        }
    }

    const NumberSelectList = () =>{

        var numberList = []
        for(let i = 1; i<=45; i++){
            numberList.push(<div id={`number${i}`} key={i} className="lotteryNumber" onClick={()=>numberClicked(i)}>{i}</div>)
        }
        return <>{numberList}</>
    }

    return(
        <div className="lotteryNumberContainer">
            <NumberSelectList/>
        </div>
    )
}

export default NumberSelect;