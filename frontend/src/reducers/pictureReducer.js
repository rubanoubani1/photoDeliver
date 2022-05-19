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
    CLEAR_IMAGE_STATE,

    SET_FILTER,
    CLEAR_FILTER,

    HOME,
    USER,
    BOOKMARKS
} from '../actions/pictureActions';

const emptyState = {
    list: [],
    filteredList: [],
    filter: {
        query: "",
        datefrom: "",
        dateto: ""
    },
    page: HOME,
    error: ""
}

const getInitialState = () => {
    if (sessionStorage.getItem("imagestate")) {
        let state = JSON.parse(sessionStorage.getItem("imagestate"));
        return {
            ...emptyState,
            ...state
        };
    } else {
        return {
            ...emptyState
        }
    }
}

const saveToStorage = (state) => {
    sessionStorage.setItem("imagestate", JSON.stringify(state));
}

const filterList = (list, filter) => {
    return list; //TODO: make the filter filter the list
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
                ...emptyState
            }
            saveToStorage(tmpState);
            return tmpState;
        case SET_FILTER:
            tmpState = {
                ...state,
                filter:action.filter,
                filteredList:filterList(state.list, action.filter)
            }
            saveToStorage(tmpState);
            return tmpState;
        case CLEAR_FILTER:
            tmpState = {
                ...state,
                filter:{
                    ...(emptyState.filter)
                },
                filteredList:state.list
            }
            saveToStorage(tmpState);
            return tmpState;
        default:
            return state;
    }
}

export default pictureReducer;