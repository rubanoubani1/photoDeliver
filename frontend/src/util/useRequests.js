import { useState, useEffect } from 'react';

export const useRequests = () => {
    const [state, setState] = useState({
        isLogged:true,
        list: [],
        message:"",
        loading: false,
        token: "",
        error:"",
        user: {
            firstname: "Jane",
            lastname: "Doe",
            id: 205,
            urlsafe: "janedoe",
            email: "jane.doe@gmail.com",
            profilePictureUrl: "https://images.dog.ceo/breeds/terrier-border/n02093754_4072.jpg"
            
        }
    });

    const [urlRequest, setUrlRequest] = useState({
        url: "",
        request: {},
        action: ''
    })

    // storage

    useEffect(() => {
        let savedState = sessionStorage.getItem("state")
        if (savedState) {
            let state = {
                isLogged: false,
                list: [],
                message: "",
                loading: false,
                token: "",
                user: { id: -1 },
                ...JSON.parse(savedState)
            }
            setState(state);
            if (state.isLogged) {
                getPictures(state.token)
            }
        }
    }, [])

    const saveToStorage = (state) => {
        let toSave = {
            isLogged:state.isLogged,
            token:state.token,
            user:state.user
        }
        sessionStorage.setItem("state", JSON.stringify(toSave));
    }

    // app state

    const setLoading = (loading) => {
        setState((state) => {
            return {
                ...state,
                loading: loading,
                message: ""
            }
        });
    }

    const setMessage = (message) => {
        setState((state) => {
            let tmpState = {
                ...state,
                message: message
            }
            saveToStorage(tmpState);
            return tmpState;
        });
    }

    const setError = (error) => {
		setState((state) => {
			let tempState = {
				...state,
				error:error
			}
			saveToStorage(tempState);
			return tempState;
		})
	}

    const clearState = () => {
        let emptyState = {
            isLogged: false,
            list: [],
            message: "",
            loading: false,
            token: "",
            user:{id:-1}
        }
        saveToStorage(emptyState);
        setState(emptyState);
    }

    useEffect(() => {
        const fetchData = async () => {
            if (!urlRequest.url) return;
            setLoading(true);
            let response = await fetch(urlRequest.url, urlRequest.request);
            setLoading(false);
            if (response.ok) {
                //handle successful requests
                switch (urlRequest.action) {
                    case "getlist": {
                        let data = await response.json();
                        setState((state) => {
                            let tmpState = {
                                ...state,
                                list: data
                            }
                            
                            saveToStorage(tmpState);
                            return tmpState;
                        });
                        return;
                    }
                    case "addimage":
                        getPictures();
                        return;
                    case "removeimage":
                        getPictures();
                        return;
                    case "addcomment":
                        getPictures(); //only needs to reload the comment list or add the uploaded comment to the list
                        return;
                    case "removecomment":
                        getPictures(); //only needs to reload the comment list or remove the comment from the list
                        return;
                    case "addbookmark":
                        getPictures(); //only needs to set the isBookmarked of the picture
                        return;
                    case "removebookmark":
                        getPictures(); //only needs to set the isBookmarked of the picture
                        return;
                    case "follow":
                        setMessage("Follow was a success!");
                        return;
                    case "unfollow":
                        setMessage("Unfollowed!");
                        return;
                    case "register":
                        setMessage("Register was a success!");
                        return;
                    case "login": {
                        
                        let data = await response.json();
                        
                        setState((state) => {
                            let tmpState = {
                                ...state,
                                isLogged: true,
                                token: data.token,
                               // user: data.user
                            }
                           
                            saveToStorage(tmpState);
                            return tmpState;
                        });
                        getPictures(data.token);
                        return;
                    }
                    case "logout":
                        clearState();
                        return;
                    default:
                        return;
                }
            } else {
                if (response.status === 403) {
                    clearState();
                    setMessage("Your session has expired. Log in.")
                    return;
                }
                //handle failed requests
                let data = await response.json();
                switch (urlRequest.action) {
                    case "getlist":
                        setMessage("Failed to retrieve shopping list. Error: " + data.message + ", code " + response.status);
                        return;
                    case "addimage":
                        setMessage("Failed to add new image. Error: " + data.message + ", code " + response.status);
                        return;
                    case "removeimage":
                        setMessage("Failed to remove image. Error: " + data.message + ", code " + response.status);
                        return;
                    case "addcomment":
                        setMessage("Failed to add new comment. Error: " + data.message + ", code " + response.status);
                        return;
                    case "removecomment":
                        setMessage("Failed to remove comment. Error: " + data.message + ", code " + response.status);
                        return;
                    case "addbookmark":
                        setMessage("Failed to add bookmark. Error: " + data.message + ", code " + response.status);
                        return;
                    case "removebookmark":
                        setMessage("Failed to remove bookmark. Error: " + data.message + ", code " + response.status);
                        return;
                    case "follow":
                        setMessage("Failed to follow user. Error: " + data.message + ", code " + response.status);
                        return;
                    case "unfollow":
                        setMessage("Failed to unfollow user. Error: " + data.message + ", code " + response.status);
                        return;
                    case "editsetings":
                        setMessage("Failed to unfollow user. Error: " + data.message + ", code " + response.status);
                        return;
                    case "register":
                        if (response.status === 409) {
                            setMessage("Username already in use.");
                        } else {
                            setMessage("Failed to create new user. Error: " + data.message + ", code " + response.status);
                        }
                        return;
                    case "login":
                        setMessage("Failed to log in. Error: " + data.message + ", code " + response.status);
                        return;
                    case "logout":
                        clearState();
                        return;
                    default:
                        return;
                }
            }
        }
        fetchData();
    }, [urlRequest.url, urlRequest.request]);

    const login = (user) => {
        setUrlRequest({
            url: "/login",
            request: {
                method: "POST",
                mode: "cors",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify(user)
            },
            action: "login"
        })
    }
    const register = (user) => {
        setUrlRequest({
            url: "/register",
            request: {
                method: "POST",
                mode: "cors",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify(user)
            },
            action: "register"
        })
    }
    const logout = () => {
        setUrlRequest({
            url: "/logout",
            request: {
                method: "POST",
                mode: "cors",
                headers: {
                    "content-type": "application/json",
                    "token": state.token
                }
            },
            action: "logout"
        });
    }
    const getPictures = (paramtoken) => {
        let url = "/api/pictures"
        let token = state.token;
 
        if (paramtoken) {
            token = paramtoken
        }
        
        setUrlRequest({
            url: url,
            request: {
                method: "GET",
                mode: "cors",
                headers: {
                    "content-type": "application/json",
                    "token": token
                }
            },
            action: "getlist"
        });
    }

    const addPicture = async (item) => {
        //save picture to cloudinary
       
        const formData = new FormData();
        formData.append("file", item.file);
        //formData.append("api_key", process.env.REACT_APP_API_KEY);
        //formData.append("eager", "c_pad,h_300,w_400|c_crop,h_200,w_260");
        //formData.append("folder", "upload_test");
        //console.log(item.file);
        //data.append("file", item.file);
        //data.append("upload_preset",process.env.REACT_APP_PRESET_NAME);
        //data.append("cloud_name",process.env.REACT_APP_CLOUD_NAME );
        //data.append("folder","test-picture-folder");
        /*
        setUrlRequest({
            url: "https://api.cloudinary.com/v1_1/"+process.env.REACT_APP_CLOUD_NAME+"/image/upload",
            request: {
                method: "POST",
                //mode: "cors",
                headers: {
                    "content-type":"multipart/form-data",
                },
                body: formData
            },
            action: "addimage"
        });*/
        
        setUrlRequest({
            url: "/api/pictures",
            request: {
                method: "POST",
                mode: "cors",
                headers: {
                    //"content-type":"multipart/form-data",
                    "token": state.token
                },
                body: formData
            },
            action: "addimage"
        });

        //console.log(process.env.REACT_APP_CLOUD_NAME);
       /* 
        //const url = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`;
       
        const request = {
            method: "POST",
            mode: "cors",
            headers: {
                "content-type": "multipart/form-data",
            },
            body:data
        }
        try{
            const resp = await fetch(url,request);  
            console.log(resp);            
            //console.log("url:" + resp.data.url +", public_id:" + resp.data.public_id);
        }catch(err){
            console.log("errr : ",err);
        }
        */
    }
    const deletePicture = (id) => {
        setUrlRequest({
            url: "/api/pictures/"+id,
            request: {
                method: "DELETE",
                mode: "cors",
                headers: {
                    "content-type": "application/json",
                    "token": state.token
                }
            },
            action: "removeimage"
        });
    }
    const addComment = (pictureId, item) => {
        setUrlRequest({
            url: "/api/pictures/"+pictureId+"/comments",
            request: {
                method: "POST",
                mode: "cors",
                headers: {
                    "content-type": "application/json",
                    "token": state.token
                },
                body: JSON.stringify(item)
            },
            action: "addcomment"
        });
    }
    const deleteComment = (id) => {
        setUrlRequest({
            url: "/api/comments/" + id,
            request: {
                method: "DELETE",
                mode: "cors",
                headers: {
                    "content-type": "application/json",
                    "token": state.token
                }
            },
            action: "removecomment"
        });
    }
    const addBookmark = (pictureId) => {
        setUrlRequest({
            url: "/api/pictures/" + pictureId + "/bookmarks",
            request: {
                method: "POST",
                mode: "cors",
                headers: {
                    "content-type": "application/json",
                    "token": state.token
                },
                body: JSON.stringify({id:pictureId})
            },
            action: "addbookmark"
        });
    }
    const deleteBookmark = (pictureId) => {
        setUrlRequest({
            url: "/api/pictures/" + pictureId + "/bookmarks", //"/api/bookmarks/" + id,
            request: {
                method: "DELETE",
                mode: "cors",
                headers: {
                    "content-type": "application/json",
                    "token": state.token
                }
            },
            action: "removebookmark"
        });
    }
    const follow = (userId) => {
        setUrlRequest({
            url: "/api/users/" + userId + "/follow",
            request: {
                method: "POST",
                mode: "cors",
                headers: {
                    "content-type": "application/json",
                    "token": state.token
                },
                body: JSON.stringify({ id: userId })
            },
            action: "follow"
        });
    }
    const unfollow = (userId) => {
        setUrlRequest({
            url: "/api/users/" + userId + "/unfollow", 
            request: {
                method: "DELETE",
                mode: "cors",
                headers: {
                    "content-type": "application/json",
                    "token": state.token
                }
            },
            action: "unfollow"
        });
    }


    return [state, {
        login:login, 
        logout:logout, 
        register:register, 
        getPictures:getPictures, 
        addPicture:addPicture, 
        deletePicture:deletePicture,
        addComment:addComment,
        deleteComment:deleteComment,
        addBookmark:addBookmark,
        removeBookmark:deleteBookmark,
        follow:follow,
        unfollow:unfollow,
        saveToStorage:saveToStorage,
        setError:setError
        
    }];
}