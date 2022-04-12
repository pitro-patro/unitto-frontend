import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { flushAll, setJwtToken, setUserData } from "../modules/user";

const Home = () =>{

    const { jwtToken, email, name } = useSelector(state => ({
        jwtToken: state.user.jwtToken,
        email: state.user.email,
        name: state.user.name
    }))

    const dispatch = useDispatch();

    const onSetJwtToken = jwtToken => {
        dispatch(setJwtToken(jwtToken))
        let userData = {
            email: "molly@naver.com",
            name: "MOLLY"
        };
        dispatch(setUserData(userData))
    };
    const flush = () => dispatch(flushAll());

    return(
        <div>
            <h2>
                홈
            </h2>
            <div>{jwtToken} {email} {name}</div>
            <button onClick={() => onSetJwtToken(123)}>button</button>
            <button onClick={() => flush()}>flush</button>
        </div>
    );
};

export default Home;