import LogInForm from './LogInForm';
import {useState, useEffect} from 'react';
import Home from "./Home";
import {Routes,Route,Link} from 'react-router-dom';


const LogIn =() => {
	const[state,setState] = useState({
		user:[],
		msg:''
	})
	
	const[urlRequest, setUrlRequest] = useState({
			url:"",
			request:{},
			action:''
	})

	useEffect(()=>{
		
		const fetchData = async() =>{
			if(!urlRequest.url){
				return;
			}
	
			
			if(urlRequest.action == "checkUser")	{
				
				let response = await fetch(urlRequest.url,urlRequest.request);
				
				if(response.ok) {
					let data= await response.json();  
					

					if(data) {
							
						setState({
							msg:''
						})
						
						return(
								<Routes>
								
						<Route  path="/" element={<Home/>} />
						 </Routes>)
						 
						
					}else{
						
						setState({
							msg:'email or password not correct'						})
						
					}

				}else {
					
					return
				}
			}else {
				
				return
			}
			
		}

		fetchData();
	},[urlRequest.url,urlRequest.request]);

	const getLogin = (data) =>{
		setUrlRequest({
			url:"/api/login",
			request:{
				method:"POST",
				mode:"cors",
				headers:{"Content-type":"application/json"},
				body:JSON.stringify(data)
			},
			action:"checkUser"
		})
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
							<LogInForm getLogin={getLogin}/>

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