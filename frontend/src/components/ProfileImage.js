const ProfileImage = (props) => {
    return (
        <img src={props.url} alt="profile image" style={{ borderRadius: "50%", width: "40px", height: "40px" }} />
    );
}
export default ProfileImage;