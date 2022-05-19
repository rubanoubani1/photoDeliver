import DropDownMenu from "./DropDownMenu";
import { useSelector } from 'react-redux';
import ProfileImage from "./ProfileImage";

const NavigationBar = () => {

    const state = useSelector(state=>state.login);

    let conditionalPicture = [];
    if (state.isLogged){
        conditionalPicture = [<ProfileImage key="profileimage" url={state.user.profilePictureUrl}/>]
    }

    return(
        <nav style={{display:"flex", backgroundColor:"#DBBAA0",justifyContent:"space-between"}}>
            <img src={require("../pdlogo.png")} alt={"logo"} style={{width:"64px",height:"64px"}}/>
            <div>
                {conditionalPicture}
            <DropDownMenu/>
            </div>
        </nav>
    )
}

export default NavigationBar;