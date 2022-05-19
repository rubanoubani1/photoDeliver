import {
    REGISTER_SUCCESS,
    REGISTER_FAILURE,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT_SUCCESS,
    LOGOUT_FAILURE,
    LOADING,
    STOP_LOADING,
    CLEAR_LOGIN_STATE
} from '../actions/loginActions';

const emptyState = {
    user: {id:-1},
    isLogged: false,
    loading: false,
    token: "",
    error: ""
}

const getInitialState = () => {
    if(sessionStorage.getItem("loginstate")){
        let state = JSON.parse(sessionStorage.getItem("loginstate"));
        return {
            ...emptyState,
            ...state
        };
    } else {
        return {
            ...emptyState
        };
    }
}

const saveToStorage = (state) => {
    sessionStorage.setItem("loginstate", JSON.stringify(state));
}

const initialState = getInitialState();

const loginReducer = (state = initialState, action) => {
    console.log("loginreducer, action: ",action)
    let tmpState = {};
    switch(action.type) {
        case LOADING:
            return {
                ...state,
                loading:true,
                error:""
            }
        case STOP_LOADING:
            return {
                ...state,
                loading: false
            }
        case REGISTER_SUCCESS:
            tmpState = {
                ...state,
                loading:false,
                error:"Register success!"
            }
            saveToStorage(tmpState);
            return tmpState;
        case REGISTER_FAILURE:
            tmpState = {
                ...state,
                loading:false,
                error:action.error
            }
            saveToStorage(tmpState);
            return tmpState;
        case LOGIN_SUCCESS:
            tmpState = {
                user:action.user,
                isLogged:true,
                token:action.token,
                loading:false,
                error:""
            }
            saveToStorage(tmpState);
            return tmpState;
        case LOGIN_FAILURE:
            tmpState = {
                ...state,
                loading:false,
                error:action.error
            }
            saveToStorage(tmpState);
            return tmpState;
        case LOGOUT_SUCCESS:
            tmpState = {
                ...emptyState
            }
            saveToStorage(tmpState);
            return tmpState;
        case LOGOUT_FAILURE:
            tmpState = {
                ...emptyState,
                error: action.error
            }
            saveToStorage(tmpState);
            return tmpState;
        case CLEAR_LOGIN_STATE:
            tmpState = {
                ...emptyState
            }
            saveToStorage(tmpState);
            return tmpState;
        default:
            return state;
    }
}

export default loginReducer;