import ProfileImage from "./ProfileImage";

const ImageHeader = (props) => {
    return (
        <div>
            <h3 style={{ margin: "5px" }}>
                <ProfileImage url={props.user.profilePictureUrl} />
                <p>{props.user.firstname + " " + props.user.lastname}</p>
            </h3>
            <br />
            <span style={{ fontWeight: "normal" }}>{props.date}</span>
        </div>
        
    );
}

export default ImageHeader;