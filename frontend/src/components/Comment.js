import ProfileImage from "./ProfileImage";

const Comment = (props) => {

    let controlButton = [<button key="delete" onClick={props.deleteComment} className="btn btn-primary" style={{float:"right"}}>Remove</button>];
    if (props.user_id !== props.user.id && props.user_id !== props.owner_id) {
        controlButton = []; // render nothing if user is not the commenter nor the picture owner
    }

    return (
        <div>
            <div style={{display:"flex"}}>
                <ProfileImage url={props.user.profilePictureUrl} />
                <p>{props.user.firstname + " " + props.user.lastname}</p>
            </div>
            <div style={{ display: "flex", justifyContent:"space-between" }}>
            <p>{props.comment.text}</p>
            {controlButton}
            </div>
        </div>
        
    );
}

export default Comment;