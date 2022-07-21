import { useDispatch, useSelector } from "react-redux";
import { removeImage, addBookmark, removeBookmark } from "../actions/pictureActions";

const ImageControlButtons = (props) => {

    const dispatch = useDispatch();
    const state = useSelector(state=>state.login);

    let buttons = []
    if (state.user.id === props.owner_id) {
        buttons.push(<button 
            key="delete" 
            className="btn btn-primary"
            onClick={()=>dispatch(removeImage(state.token, props.image_id))}>Delete picture</button>)
    }
    else if(state.isLogged) {
        if (!props.bookmarked){
            buttons.push(<button 
                key="save" 
                className="btn btn-primary"
                onClick={() => dispatch(addBookmark(state.token, props.image_id, state.user.id)) }>Save picture</button>);
        } else {
            buttons.push(<button 
                key="unsave" 
                className="btn btn-primary"
                onClick={() => dispatch(removeBookmark(state.token, props.image_id, state.user.id))}>Unsave picture</button>);
        }
        
    }

    return (
        <div>
            {buttons}
        </div>
    );
}
export default ImageControlButtons;