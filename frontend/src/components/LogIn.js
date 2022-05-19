//import LogInForm from './LogInForm';
import {useState, useEffect} from 'react';

const LogIn =(props) => {
	const[state,setState] = useState({
		username:'',
		password:''
	})

	const onChange = (event)=>{
		setState((state)=>{
			return {
				...state,
				[event.target.name]:event.target.value
			}

		})
	}


	let funcs = props.funcs;

	const onSubmit =  (event) => {
		event.preventDefault();
		if(state.username.length < 4 || state.password.length < 8) {
			funcs.setError("Username needs to be atleast four and password eight characters long");
			return;
		}
		let user = {
			username:state.username,
			password:state.password
		}
		funcs.login(user);

	}

	

    
	return (
		<div className="container py-5 h-100" style={{color:"E5E5E5"}}>
			<div className="row d-flex justify-content-center align-items-center h-100">
		
				<div className="col-12 col-md-8 col-lg-6 col-xl-5" >
					
						<div className="card p-5 text-center" style={{backgroundColor:"#E5E5E5",borderRadius: "4rem"}}>

							<h3 style={{color:"#2F57E7"}}> Login</h3>
							<p>sign in to your account</p>
							<br />
								<p>	{state.msg}</p>
								
								<br />
							<form onSubmit={onSubmit}>
			<label htmlFor = "username">Email</label>
			<input type="text"
					name="username"
					id="username"
					onChange={onChange}
					value={state.username} />
			<br />
			<br />
			<label htmlFor = "password">Password</label>
			<input type="text"
					name="password"
					id="password"
					onChange={onChange}
					value={state.password} />
			<br />
			<br />
			<input type="submit" value="Log in"/>
		</form>


							<a href="url">forget password</a>
							<br/>
							<input type="submit"  value="create a new account"/>
							
						</div>
					
				</div>
			</div>
		</div>
			
	)
}
export default LogIn;