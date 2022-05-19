import { getList, clearImageState } from "./pictureActions";

export const REGISTER_SUCCESS = "REGISTER_SUCCESS"; 
export const REGISTER_FAILURE = "REGISTER_FAILURE";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAILURE = "LOGOUT_FAILURE";
export const LOADING = "LOADING";
export const STOP_LOADING = "STOP_LOADING";
export const CLEAR_LOGIN_STATE = "CLEAR_LOGIN_STATE";

//async action creators

export const register = (user) => {
    return async (dispatch) => {
        let request = {
            method:"POST",
            mode:"cors",
            headers:{"Content-type":"application/json"},
            body:JSON.stringify(user)
        }
        dispatch(loading());
        let response = await fetch("/register", request);
        dispatch(stopLoading());
        if(!response) {
            dispatch(registerFailed("there was an error with the connection. register failed"))
            return;
        }
        if(response.ok) {
            dispatch(registerSuccess());
        } else {
            if(response.status === 409) {
                dispatch(registerFailed("username already exists"));
            } else {
                dispatch(registerFailed("register failed, server responded with status: "+response.status))
            }
        }
    }
}

export const login = (user) => {
    return async (dispatch) => {
        let request = {
            method:"POST",
            mode:"cors",
            headers:{"Content-type":"application/json"},
            body:JSON.stringify(user)
        }
        dispatch(loading());
        let response = await fetch("/login", request);
        dispatch(stopLoading());
        if(!response) {
            dispatch(loginFailed("there was an error with connection, login failed"));
            return;
        }
        if (response.ok) {
            let data = await response.json();
            if(!data) {
                dispatch(loginFailed("error parsing login information"))
                return;
            }
            dispatch(loginSuccess(data.token, data.user));
            dispatch(getList(data.token));
        } else {
            dispatch(loginFailed("login failed, error: "+response.status))
        }
    }
}

export const logout = (token) => {
    return async (dispatch) => {
        let request = {
            method:"POST",
            mode:"cors",
            headers:{"Content-type":"application/json","token":token}
        }
        dispatch(loading());
        let response = await fetch("/logout", request);
        dispatch(stopLoading());
        if(!response){
            dispatch(logoutFailed("there was an error with connection, logging out"));
            dispatch(clearImageState());
            return;
        }
        if(response.ok) {
            dispatch(logoutSuccess());
            dispatch(clearImageState());
        } else {
            dispatch(logoutFailed("server responded with "+response.status+", logging out"))
            dispatch(clearImageState());
        }
    }
}

//action creators
export const loading = () => {
    return {
        type:LOADING
    }
}
export const stopLoading = () => {
    return {
        type: STOP_LOADING
    }
}

export const registerSuccess = () => {
    return {
        type: REGISTER_SUCCESS
    }
}

export const registerFailed = (error) => {
    return {
        type: REGISTER_FAILURE,
        error:error
    }
}

const loginSuccess = (token, user) => {
    return {
        type:LOGIN_SUCCESS,
        token:token,
        user:user
    }
}

const loginFailed = (error) => {
    return {
        type:LOGIN_FAILURE,
        error:error
    }
}

const logoutSuccess = () => {
    return {
        type:LOGOUT_SUCCESS
    }
}

const logoutFailed = (error) => {
    return {
        type: LOGOUT_FAILURE,
        error:error
    }
}

export const clearLoginState = () => {
    return {
        type: CLEAR_LOGIN_STATE
    }
}