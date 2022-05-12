const SettingsForm = () => {
    const onSubmit = () => {

    }
    const onChange = () => {

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
                //</form>value=""
                ></input>
            <br />
            <input type="submit"
                className="btn btn-primary"
                value="Change settings"></input>
        </form>
    );
} 

}
export default SettingsForm;