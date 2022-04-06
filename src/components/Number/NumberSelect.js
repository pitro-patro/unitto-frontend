import React, { useEffect } from "react";
import '../../styles/NumberSelect.css';

const NumberSelect = (props) =>{

    useEffect(() =>{
        const includeExcludeNumber = props.includeExcludeNumber;
        
        for(let number of includeExcludeNumber.includeNumbers){
            const includeNumberClassList = document.getElementById(`number${number}`).classList;
            includeNumberClassList.add("includeNumber");
        }
        for(let number of includeExcludeNumber.excludeNumbers){
            const excludeNumberClassList = document.getElementById(`number${number}`).classList;
            excludeNumberClassList.add("excludeNumber");
        }

    },[props]);

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