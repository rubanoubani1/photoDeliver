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

const getInitialState = () => {
    if(sessionStorage.getItem("loginstate")){
        let state = JSON.parse(sessionStorage.getItem("loginstate"));
        return state;
    } else {
        return {
            isLogged:false,
            loading:false,
            token:"",
            error:""
        }
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
                isLogged:false,
                token:"",
                loading:false,
                error:""
            }
            saveToStorage(tmpState);
            return tmpState;
        case LOGOUT_FAILURE:
            tmpState = {
                isLogged: false,
                token: "",
                loading: false,
                error: action.error
            }
            saveToStorage(tmpState);
            return tmpState;
        case CLEAR_LOGIN_STATE:
            tmpState = {
                isLogged: false,
                token: "",
                loading: false,
                error: ""
            }
            saveToStorage(tmpState);
            return tmpState;
        default:
            return state;
    }
}

export default loginReducer;