const express = require("express");
const apiroutes = require("./routes/apiroutes.js");
require("dotenv").config()

const app = express();

app.use(express.json());
//DATABASE
const userdatabase =[];
let testuser = {
	email:'user@user.com',
	password:'user123'
}
userdatabase.push(testuser);
console.log(userdatabase);
let id = 100;

//HELPERS
const port = process.env.port || 3001;



//Login
app.post("/api/login",function(req,res) {
	if(!req.body) {
		return res.status(400).json({message:"Bad request"});
	}
	/*if(!req.body.email||!req.body.password) {
		return res.status(400).json({message:"Bad request"});
	}*/

	
	let email=req.body.email;
	let password = req.body.password;
	if(!password||!email) {
		return [];
	}
	
	let user = userdatabase.filter(data=> {return (data.email==email)&&(data.password==password)});

	if(user.length==0){
		return res.status(200).json(false);
		
	}else{
		return res.status(200).json(true);;
			
	}

});

app.use("/api",apiroutes);

app.listen(port);

console.log("Runnning on port ", port);