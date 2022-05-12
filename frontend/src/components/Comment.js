import ProfileImage from "./ProfileImage";

const Comment = (props) => {
    return (
        <div>
            <ProfileImage url={props.user.profilePictureUrl}/>
            <p>{props.user.firstname + " " + props.user.lastname}</p>
            <p>{props.comment.text}</p>
        </div>
        
    );
}

export default Comment;