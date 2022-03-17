import {Component} from 'react'

class Oauth2RedirectHandler extends Component{
    render(){
        let code = new URL(window.location.href).searchParams.get("code");

        return(
            <div>
                {code}
            </div>
        )
    }
}
// const Oauth2RedirectHandler = (props) =>{
//     const dispatch = useDispatch();

//     //code
//     let code = new URL(window.location.href).searchParams.get("code");

//     React.useEffect(async () => {
//         await dispatch(userActions.kakaoLogin(code));
//     }, []);

//     return <Spinner/>;
// };

export default Oauth2RedirectHandler;