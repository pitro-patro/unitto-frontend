const SET_JWT_TOKEN = 'user/SET_JWT_TOKEN';
const FLUSH_ALL = 'user/FLUSH_ALL';

export const setJwtToken = jwtToken => ({type: SET_JWT_TOKEN, jwtToken});
export const flushAll = () => ({type: FLUSH_ALL});

const initialState = {
    jwtToken: null,
    userEmail: null,
    userName: null,
};

// REDUCER
export default function user(state = initialState, action){
    switch(action.type){
        case SET_JWT_TOKEN:
            return{
                ...state,
                jwtToken: action.jwtToken
            };
        case FLUSH_ALL:
            return initialState;
        default:
            return state;
    }
}