import ProfileImage from "./ProfileImage";
import { useDispatch, useSelector } from "react-redux";
import { removeComment } from "../actions/pictureActions";

const Comment = (props) => {

    const dispatch = useDispatch();
    const state = useSelector(state => ({
        token:state.login.token,
        user:state.login.user
    }));

    let controlButton = <button key="delete" onClick={() => dispatch(removeComment(state.token, props.image_id, props.id))} className="btn btn-primary" style={{float:"right"}}>Remove</button>;
    if (state.user.id !== props.comment.owner.id && state.user.id !== props.owner_id) {
        controlButton = <></>; // render nothing if user is not the commenter nor the picture owner
    }
    console.log(props.comment.owner);
    console.log(props.comment.owner.urlsafe);

    return (
        <div>
            <div style={{display:"flex"}}>
                <ProfileImage url={props.comment.owner.userIconUrl} size="30px"/>
                <p>{props.comment.owner.firstname + " " + props.comment.owner.lastname}</p>
            </div>
            <div style={{ display: "flex", justifyContent:"space-between" }}>
            <p>{props.comment.text}</p>
            {controlButton}
            </div>
        </div>
        
    );
}

export default Comment;