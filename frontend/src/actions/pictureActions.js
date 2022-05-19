import { loading, stopLoading, clearLoginState } from "./loginActions";

// action constants

export const FETCH_LIST_SUCCESS = "FETCH_LIST_SUCCESS";
export const FETCH_LIST_FAILURE = "FETCH_LIST_FAILURE";

export const ADD_IMAGE_SUCCESS = "ADD_IMAGE_SUCCESS";
export const ADD_IMAGE_FAILURE = "ADD_IMAGE_FAILURE";
export const REMOVE_IMAGE_SUCCESS = "REMOVE_IMAGE_SUCCESS";
export const REMOVE_IMAGE_FAILURE = "REMOVE_IMAGE_FAILURE";

export const ADD_COMMENT_SUCCESS = "ADD_COMMENT_SUCCESS";
export const ADD_COMMENT_FAILURE = "ADD_COMMENT_FAILURE";
export const REMOVE_COMMENT_SUCCESS = "REMOVE_COMMENT_SUCCESS";
export const REMOVE_COMMENT_FAILURE = "REMOVE_COMMENT_FAILURE";

export const ADD_BOOKMARK_SUCCESS = "ADD_BOOKMARK_SUCCESS";
export const ADD_BOOKMARK_FAILURE = "ADD_BOOKMARK_FAILURE";
export const REMOVE_BOOKMARK_SUCCESS = "REMOVE_BOOKMARK_SUCCESS";
export const REMOVE_BOOKMARK_FAILURE = "REMOVE_BOOKMARK_FAILURE";

export const FOLLOW_SUCCESS = "FOLLOW_SUCCESS";
export const FOLLOW_FAILURE = "FOLLOW_FAILURE";
export const UNFOLLOW_SUCCESS = "UNFOLLOW_SUCCESS";
export const UNFOLLOW_FAILURE = "UNFOLLOW_FAILURE";

export const CLEAR_IMAGE_STATE = "CLEAR_IMAGE_STATE";

export const SET_FILTER = "SET_FILTER";
export const CLEAR_FILTER = "CLEAR_FILTER";

// page constants

export const HOME = "HOME"
export const USER = "USER"
export const BOOKMARKS = "BOOKMARKS"
export const PROFILE = "PROFILE"

//async action creators

const responseCheckGet = async (response, dispatch, succeed, failed, page, page_id) => {
    if (!response) {
        dispatch(failed("Received no response, check internet connection"))
        return;
    }
    if (response.ok) {
        let list = await response.json();
        if (!list) {
            dispatch(failed("Failed to parse data"))
            return;
        }
        let data = {
            data:list,
            page:page,
            page_id:page_id
        }
        dispatch(succeed(data));
    } else {
        if (response.status === 403) {
            dispatch(clearImageState());
            dispatch(clearLoginState());
            dispatch(failed("The session has expired, logging out"))
        } else {
            dispatch(failed("Error, server responded with status " + response.status))
        }
    }
}

const responseCheckUpdate = (response, dispatch, succeed, failed, token, page, page_id) => {
    if (!response) {
        dispatch(failed("Received no response, check internet connection"))
        return;
    }
    if (response.ok) {
        dispatch(succeed());
        dispatch(getList(token, page, page_id));
    } else {
        if (response.status === 403) {
            dispatch(clearImageState());
            dispatch(clearLoginState());
            dispatch(failed("The session has expired, logging out"))
        } else {
            dispatch(failed("Error, server responded with status " + response.status))
        }
    }
}

const createRequest = (method, token, item) => {
    let request = {
        method: method,
        mode: "cors",
        headers: { "Content-type": "application/json", "token": token }
    }
    if(item) {
        request.body = JSON.stringify(item);
    }
    return request;
}

const loadResponse = async (dispatch, url, request) => {
    dispatch(loading());
    let response = await fetch(url, request);;
    dispatch(stopLoading());
    return response;
}

export const getList = (token, page, page_id) => {
    
    return async (dispatch, getState) => 
    {
        let url = "/api/pictures";
        let state = getState()
        let tmpPage = state.images.page //HOME;
        if (page) {
            tmpPage = page;
        }
        let tmpPageId = state.images.page_id
        if (page_id) {
            tmpPageId = page_id;
        }
        
        if(tmpPage === USER){
            url = "/api/user/" + state.login.user.id + "/pictures" //user.urlsafe might look nicer
        }
        if (tmpPage === BOOKMARKS) {
            url = "/api/user/" + state.login.user.id + "/bookmarks"
        }
        if(tmpPage === PROFILE){
            url = "/api/user/" + state.images.tmpPageId + "/pictures"
        }
        let request = createRequest("GET", token);
        let response = await loadResponse(dispatch, url, request);
        responseCheckGet(response, dispatch, fetchListSuccess, fetchListFailed, tmpPage, tmpPageId);
    }
}

export const addImage = (token, item) => {
    return async (dispatch) => {
        let request = createRequest("POST", token, item);
        let response = await loadResponse(dispatch, "/api/pictures", request);
        responseCheckUpdate(response, dispatch, addImageSuccess, addImageFailed, token);
    }
}

export const removeImage = (token, image_id) => {
    return async (dispatch) => {
        let request = createRequest("DELETE", token);
        let response = await loadResponse(dispatch, "/api/pictures/" + image_id, request);
        responseCheckUpdate(response, dispatch, removeImageSuccess, removeImageFailed, token);
    }
}

export const addComment = (token, item, image_id) => {
    return async (dispatch) => {
        let request = createRequest("POST", token, item);
        let response = await loadResponse(dispatch, "/api/pictures/" + image_id, request);
        responseCheckUpdate(response, dispatch, addCommentSuccess, addCommentFailed, token);
    }
}

export const removeComment = (token, image_id, comment_id) => {
    return async (dispatch) => {
        let request = createRequest("DELETE", token);
        let response = await loadResponse(dispatch, "/api/pictures/" + image_id + "/comments/" + comment_id, request);
        responseCheckUpdate(response, dispatch, removeCommentSuccess, removeCommentFailed, token);
    }
}

export const addBookmark = (token, image_id, user_id) => {
    return async (dispatch) => {
        let request = createRequest("POST", token, {user_id:user_id});
        let response = await loadResponse(dispatch, "/api/pictures/" + image_id + "/bookmarks", request);
        responseCheckUpdate(response, dispatch, addBookmarkSuccess, addBookmarkFailed, token);
    }
}

export const removeBookmark = (token, image_id, user_id) => {
    return async (dispatch) => {
        let request = createRequest("DELETE", token);
        let response = await loadResponse(dispatch, "/api/pictures/" + image_id + "/bookmarks/" + user_id, request);
        responseCheckUpdate(response, dispatch, removeBookmarkSuccess, removeBookmarkFailed, token);
    }
}

export const follow = (token, toFollow_id, user_id) => {
    return async (dispatch) => {
        let request = createRequest("POST", token, { user_id: toFollow_id });
        let response = await loadResponse(dispatch, "/api/users/" + user_id + "/following", request);
        responseCheckUpdate(response, dispatch, followSuccess, followFailed, token);
    }
}

export const unfollow = (token, following_id, user_id) => {
    return async (dispatch) => {
        let request = createRequest("DELETE", token);
        let response = await loadResponse(dispatch, "/api/users/" + user_id + "/following/" + following_id, request);
        responseCheckUpdate(response, dispatch, unfollowSuccess, unfollowFailed, token);
    }
}

//action creators

const fetchListSuccess = (data) => {
    return {
        type: FETCH_LIST_SUCCESS,
        list: data.data,
        page: data.page,
        page_id: data.page_id
    }
}

const fetchListFailed = (error) => {
    return {
        type: FETCH_LIST_FAILURE,
        error: error
    }
}

const addImageSuccess = () => {
    return {
        type: ADD_IMAGE_SUCCESS
    }
}
const addImageFailed = (error) => {
    return {
        type: ADD_IMAGE_FAILURE,
        error: error
    }
}

const removeImageSuccess = () => {
    return {
        type: REMOVE_IMAGE_SUCCESS
    }
}
const removeImageFailed = (error) => {
    return {
        type: REMOVE_IMAGE_FAILURE,
        error: error
    }
}

const addCommentSuccess = () => {
    return {
        type: ADD_COMMENT_SUCCESS
    }
}
const addCommentFailed = (error) => {
    return {
        type: ADD_COMMENT_FAILURE,
        error: error
    }
}

const removeCommentSuccess = () => {
    return {
        type: REMOVE_COMMENT_SUCCESS
    }
}
const removeCommentFailed = (error) => {
    return {
        type: REMOVE_COMMENT_FAILURE,
        error: error
    }
}

const addBookmarkSuccess = () => {
    return {
        type: ADD_BOOKMARK_SUCCESS
    }
}
const addBookmarkFailed = (error) => {
    return {
        type: ADD_BOOKMARK_FAILURE,
        error: error
    }
}

const removeBookmarkSuccess = () => {
    return {
        type: REMOVE_BOOKMARK_SUCCESS
    }
}
const removeBookmarkFailed = (error) => {
    return {
        type: REMOVE_BOOKMARK_FAILURE,
        error: error
    }
}

const followSuccess = () => {
    return {
        type: FOLLOW_SUCCESS
    }
}
const followFailed = (error) => {
    return {
        type: FOLLOW_FAILURE,
        error: error
    }
}

const unfollowSuccess = () => {
    return {
        type: UNFOLLOW_SUCCESS
    }
}
const unfollowFailed = (error) => {
    return {
        type: UNFOLLOW_FAILURE,
        error: error
    }
}

export const clearImageState = () => {
    return {
        type: CLEAR_IMAGE_STATE
    }
}
export const setFilter = (filter) => {
    return {
        type: SET_FILTER,
        filter: filter
    }
}
export const clearFilter = () => {
    return {
        type: CLEAR_FILTER
    }
}