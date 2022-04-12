const SET_JWT_TOKEN = 'user/SET_JWT_TOKEN';
const SET_USER_DATA = 'user/SET_USER_DATA';
const FLUSH_ALL = 'user/FLUSH_ALL';

export const setJwtToken = jwtToken => ({type: SET_JWT_TOKEN, jwtToken});
export const setUserData = userData => ({type: SET_USER_DATA, userData});
export const flushAll = () => ({type: FLUSH_ALL});

const initialState = {
    jwtToken: null,
    email: null,
    name: null,
};

// REDUCER
export default function user(state = initialState, action){
    switch(action.type){
        case SET_JWT_TOKEN:
            return{
                ...state,
                jwtToken: action.jwtToken
            };
        case SET_USER_DATA:
            return{
                ...state,
                email: action.userData.email,
                name: action.userData.name
            }
        case FLUSH_ALL:
            return initialState;
        default:
            return state;
    }
}