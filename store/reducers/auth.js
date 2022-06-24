import { AUTHENTICATE, LOGOUT, SET_DID_TRY_AL } from "../actions/auth";

const initialState={
    token: null,
    userId: null,
    didTryAutoLogin:false,
};


export default (state=initialState, action)=>{
    switch(action.type) {
        case AUTHENTICATE:
                    return { token: action.token, userId: action.userId, didTryAutoLogin:true }
        case SET_DID_TRY_AL:
                    return {
                        ...state,
                        didTryAutoLogin:true,
                    }
        // case SIGNUP:
        //             return {token: action.token, userId: action.userId }
        case LOGOUT:
            
                return {
                    ...state,
                    token: null,
                    userId: null,
                };
        default: 
                return state;
    }
};