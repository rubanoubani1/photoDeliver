const ProfileImage = (props) => {

    let size = "40px";
    if(props.size){
        size = props.size;
    }
    
    return (
        <>
        { (props.url==="") 
                ? <img src={props.url} alt="user icon" style={{ borderRadius: "50%", width: size, height: size }} />
                : <img src={require("../user_icon.png")} alt={"user icon"} style={{ borderRadius: "50%", width: size, height: size }} />   
        }
        </>
    );
}
export default ProfileImage;