const express = require("express");

const app = express();

app.use(express.json());

//DATABASE

const database = [];
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

//REST API

app.get("/api/pictures",function(req,res) {
    return res.status(200).json(database);
})


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


app.listen(port);

console.log("Runnning on port ", port);