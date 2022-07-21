import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login, loginFailed } from '../actions/loginActions';

const LogInForm = (props)=>{

	const dispatch = useDispatch();

	const [state, setState] = useState({
		email:"",
		password:""
	})

	const onChange = (event)=>{
		setState((state)=>{
			return {
				...state,
				[event.target.name]:event.target.value
			}

		})
	}


	const onSubmit =  (event) => {
		event.preventDefault();

		let data = {
			...state
		}
		dispatch(login(data));

	}



	return(
		<form onSubmit={onSubmit}>
			<label htmlFor = "email">Email</label>
			<input type="text"
					name="email"
					id="name"
					onChange={onChange}
					value={state.email} />
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

	)


}

export default LogInForm;