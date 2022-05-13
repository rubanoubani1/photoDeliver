import DropDownMenu from "./DropDownMenu";
const NavigationBar = () => {
    return(
        <nav style={{display:"flex", backgroundColor:"#DBBAA0",justifyContent:"space-between"}}>
            <img src={require("../pdlogo.png")} alt={"logo"} style={{width:"64px",height:"64px"}}/>
            <div>
            <img src={require("../user_icon.png")} alt={"user"}  style={{width:"64px",height:"64px"}}/>   
            <DropDownMenu/>
            </div>
        </nav>
    )
}

export default NavigationBar;