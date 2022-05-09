import DropDownMenu from "./DropDownMenu";
const NavigationBar = () => {
    return(
        <nav style={{display:"flex", backgroundColor:"teal",justifyContent:"space-between"}}>
            <img src={require("../pdlogo.png")} alt={"logo"} style={{width:"80px",height:"80px"}}/>
            <DropDownMenu/>
        </nav>
    )
}

export default NavigationBar;