import {
FETCH_LIST_SUCCESS,
FETCH_LIST_FAILURE,
ADD_IMAGE_SUCCESS,
ADD_IMAGE_FAILURE,
REMOVE_IMAGE_SUCCESS,
REMOVE_IMAGE_FAILURE,
ADD_COMMENT_SUCCESS,
ADD_COMMENT_FAILURE,
REMOVE_COMMENT_SUCCESS,
REMOVE_COMMENT_FAILURE,
ADD_BOOKMARK_SUCCESS,
ADD_BOOKMARK_FAILURE,
REMOVE_BOOKMARK_SUCCESS,
REMOVE_BOOKMARK_FAILURE,
FOLLOW_SUCCESS,
FOLLOW_FAILURE,
UNFOLLOW_SUCCESS,
UNFOLLOW_FAILURE,
CLEAR_IMAGE_STATE
} from '../actions/pictureActions';

const getInitialState = () => {
    if (sessionStorage.getItem("imagestate")) {
        let state = JSON.parse(sessionStorage.getItem("imagestate"));
        return state;
    } else {
        return {
            list: [],
            error: ""
        }
    }
}

const saveToStorage = (state) => {
    sessionStorage.setItem("imagestate", JSON.stringify(state));
}

const initialState = getInitialState();

const pictureReducer = (state = initialState, action) => {
    console.log("picturereducer, action: ", action)
    let tmpState = {};
    switch (action.type) {
        case FETCH_LIST_SUCCESS:
            tmpState = {
                ...state,
                list:action.list
            }
            saveToStorage(tmpState);
            return tmpState;
        case FETCH_LIST_FAILURE:
            tmpState = {
                ...state,
                error:action.error
            }
            saveToStorage(tmpState);
            return tmpState;

        case ADD_IMAGE_SUCCESS:
            tmpState = {
                ...state
            }
            saveToStorage(tmpState);
            return tmpState;
        case ADD_IMAGE_FAILURE:
            tmpState = {
                ...state,
                error: action.error
            }
            saveToStorage(tmpState);
            return tmpState;
        case REMOVE_IMAGE_SUCCESS:
            tmpState = {
                ...state
            }
            saveToStorage(tmpState);
            return tmpState;
        case REMOVE_IMAGE_FAILURE:
            tmpState = {
                ...state,
                error: action.error
            }
            saveToStorage(tmpState);
            return tmpState;

        case ADD_COMMENT_SUCCESS:
            tmpState = {
                ...state
            }
            saveToStorage(tmpState);
            return tmpState;
        case ADD_COMMENT_FAILURE:
            tmpState = {
                ...state,
                error: action.error
            }
            saveToStorage(tmpState);
            return tmpState;
        case REMOVE_COMMENT_SUCCESS:
            tmpState = {
                ...state
            }
            saveToStorage(tmpState);
            return tmpState;
        case REMOVE_COMMENT_FAILURE:
            tmpState = {
                ...state,
                error: action.error
            }
            saveToStorage(tmpState);
            return tmpState;

        case ADD_BOOKMARK_SUCCESS:
            tmpState = {
                ...state
            }
            saveToStorage(tmpState);
            return tmpState;
        case ADD_BOOKMARK_FAILURE:
            tmpState = {
                ...state,
                error: action.error
            }
            saveToStorage(tmpState);
            return tmpState;
        case REMOVE_BOOKMARK_SUCCESS:
            tmpState = {
                ...state
            }
            saveToStorage(tmpState);
            return tmpState;
        case REMOVE_BOOKMARK_FAILURE:
            tmpState = {
                ...state,
                error: action.error
            }
            saveToStorage(tmpState);
            return tmpState;

        case FOLLOW_SUCCESS:
            tmpState = {
                ...state
            }
            saveToStorage(tmpState);
            return tmpState;
        case FOLLOW_FAILURE:
            tmpState = {
                ...state,
                error: action.error
            }
            saveToStorage(tmpState);
            return tmpState;
        case UNFOLLOW_SUCCESS:
            tmpState = {
                ...state
            }
            saveToStorage(tmpState);
            return tmpState;
        case UNFOLLOW_FAILURE:
            tmpState = {
                ...state,
                error: action.error
            }
            saveToStorage(tmpState);
            return tmpState;
        case CLEAR_IMAGE_STATE:
            tmpState = {
                list: [],
                error: ""
            }
            saveToStorage(tmpState);
            return tmpState;
        default:
            return state;
    }
}

export default pictureReducer;