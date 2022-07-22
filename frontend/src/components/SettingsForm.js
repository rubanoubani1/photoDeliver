const SettingsForm = () => {

    const onSubmit = async (event) => {
        event.preventDefault();
        let result = await fetch("/api/settings/3");
        if(result.ok){

        }else{

        }
    }
    const onChange = (event) => {
        var selectedFile = event.target.files[0];
        var reader = new FileReader();
        var imgtag = document.getElementById("user_picture");

        imgtag.title = selectedFile.name;
        reader.onload = function(event) {
            imgtag.src = event.target.result;
        };   
        reader.readAsDataURL(selectedFile);
    }
    return (
        <form onSubmit={onSubmit} className="mb-3">
            <div style={{display:"flex"}}>
                
            <input type="text" 
                id="firstname"
                name="firstname"
                placeholder="First Name"
                className="form-control"
                onChange={onChange}
                value=""></input>
            <span style={{width:"10px"}}></span>
            <input type="text"
                id="lastname"
                name="lastname"
                placeholder="Last Name"
                className="form-control"
                onChange={onChange}
                value=""></input>

            </div>
            <br />
            <input type="email"
                id="email"
                name="email"
                placeholder="Email"
                className="form-control"
                onChange={onChange}
                value=""></input>
            <br />
            
            <input type="password"
                id="password"
                name="password"
                placeholder="Password"
                className="form-control"
                onChange={onChange}
                value=""></input>
            
            <input type="password"
                id="password2"
                name="password2"
                placeholder="Confirm password"
                className="form-control"
                onChange={onChange}
                value=""></input>
            <label htmlFor="birthday" className="form-label">Birthday</label>
            <input type="date"
                id="birthday"
                name="birthday"
                className="form-control"
                onChange={onChange}
                ></input>
            
            
            <div class="input-group">
                <div class="input-group-prepend">
                    <img src={require("../user_icon.png")} id="user_picture" alt="user_icon" style={{ width: "64px", height: "64px" }} />
                </div>
                <div class="custom-file">
                    <input type="file" class="custom-file-input" id="user_icon" name="user_icon" aria-describedby="inputGroupFileAddon01" onChange={onChange} />
                    <label class="custom-file-label" for="user_icon">Choose file</label>
                </div>
                
                
            </div>
            <br />
            <input type="submit"
                className="btn btn-primary"
                value="Change settings"
                style={{backgroundColor: "#3A808A"}} ></input>
           
        </form>
    );
} 
export default SettingsForm;