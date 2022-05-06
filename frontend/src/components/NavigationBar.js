const NavigationBar = () => {
    return(
        <nav style={{display:"flex", backgroundColor:"teal",justifyContent:"space-between"}}>
            <img src={require("../pdlogo.png")} alt={"logo"} style={{width:"80px",height:"80px"}}/>
            <button>User@user.com</button>
        </nav>
    )
}

export default NavigationBar;