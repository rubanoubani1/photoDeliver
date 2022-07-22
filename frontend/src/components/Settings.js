import NavigationBar from "./NavigationBar";
import SettingsForm from "./SettingsForm";

const Settings = () => {
    const changeSettings = () => {
        console.log("changeSettings has been called");
    }
	//style={{color:"E5E5E5", backgroundColor:"#FFE6D4"}}
    return (
		<div className="base">
            <NavigationBar />
			<div className="row d-flex justify-content-center align-items-center h-100 input-group">

		
				<div className="col-12 col-md-8 col-lg-6 col-xl-5" >
					
						<div className="card p-5 text-center" style={{backgroundColor:"#8F715A",borderRadius: "4rem"}}>

							<h2 className="font-border">Settings</h2>
							
							<br />
							<hr />	
							<SettingsForm changeSettings={changeSettings}/>

							
						</div>
					
				</div>
			</div>
		</div>		
	)
}
export default Settings;