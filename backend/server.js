const express = require("express");
const apiroutes = require("./routes/apiroutes");
const bcrypt = require("bcrypt");
const crypto = require ("crypto");

const app = express();

app.use(express.json());
//DATABASE

const database = [
	{
		owner: {
			firstname: "John",
			lastname: "Doe",
			id: 204,
			urlsafe: "johndoe",
			profilePictureUrl: "https://images.dog.ceo/breeds/terrier-border/n02093754_4072.jpg"
		},
		url: "https://images.dog.ceo/breeds/terrier-border/n02093754_4072.jpg",
		id: 102,
		alt: "dog",
		title: "Random dog picture",
		date: "13 April 2022",
		comments: [
			{
				user: {
					firstname: "Jane",
					lastname: "Doe",
					id: 205,
					urlsafe: "janedoe",
					profilePictureUrl: "https://images.dog.ceo/breeds/terrier-border/n02093754_4072.jpg"
				},
				id: 123,
				text: "such a cute dog!",
				date: "13 April 2022"
			}
		],
		bookmarked: "true"
	},
	{
		owner: {
			firstname: "John",
			lastname: "Doe",
			id: 204,
			urlsafe: "johndoe",
			profilePictureUrl: "https://images.dog.ceo/breeds/terrier-border/n02093754_4072.jpg"
		},
		url: "https://images.dog.ceo/breeds/terrier-border/n02093754_4072.jpg",
		id: 103,
		alt: "dog",
		title: "Random dog picture 2",
		date: "14 April 2022",
		comments: [],
		bookmarked: "false"
	},
	{
		owner: {
			firstname: "John",
			lastname: "Doe",
			id: 204,
			urlsafe: "johndoe",
			profilePictureUrl: "https://images.dog.ceo/breeds/terrier-border/n02093754_4072.jpg"
		},
		url: "https://images.dog.ceo/breeds/terrier-border/n02093754_4072.jpg",
		id: 104,
		alt: "dog",
		title: "Random dog picture 3",
		date: "15 April 2022",
		comments: [
			{
				user: {
					firstname: "Jane",
					lastname: "Doe",
					id: 205,
					urlsafe: "janedoe",
					profilePictureUrl: "https://images.dog.ceo/breeds/terrier-border/n02093754_4072.jpg"
				},
				id: 124,
				text: "that's the third time you've posted that picture",
				date: "15 April 2022"
			},
			{
				user: {
					firstname: "John",
					lastname: "Doe",
					id: 204,
					urlsafe: "johndoe",
					profilePictureUrl: "https://images.dog.ceo/breeds/terrier-border/n02093754_4072.jpg"
				},
				id: 125,
				text: "It's the only one I have...",
				date: "15 April 2022"
			},
			{
				user: {
					firstname: "Jane",
					lastname: "Doe",
					id: 205,
					urlsafe: "janedoe",
					profilePictureUrl: "https://images.dog.ceo/breeds/terrier-border/n02093754_4072.jpg"
				},
				id: 126,
				text: "can't you take new photos?",
				date: "15 April 2022"
			},
			{
				user: {
					firstname: "John",
					lastname: "Doe",
					id: 204,
					urlsafe: "johndoe",
					profilePictureUrl: "https://images.dog.ceo/breeds/terrier-border/n02093754_4072.jpg"
				},
				id: 127,
				text: "My house burned and everything I own was destroyed so the only picture I have left is this one I had as my profile picture. Oh, poor Doge the third... If only I hadn't left the candles burning again while going to work.",
				date: "15 April 2022"
			},
			{
				user: {
					firstname: "Jane",
					lastname: "Doe",
					id: 205,
					urlsafe: "janedoe",
					profilePictureUrl: "https://images.dog.ceo/breeds/terrier-border/n02093754_4072.jpg"
				},
				id: 128,
				text: "wow that got dark fast",
				date: "15 April 2022"
			}
		],
		bookmarked: "false"
	}
];

//LOGIN DATABASE
let registeredUsers = [];
let loggedSessions = [];
let time_to_life_diff = 3600000;


let testuser = {
	email:'jane.doe@gmail.com',
	password:'$2b$14$VuwxX7g049MbNc64V7ue2.q5TNiqtgnJFqtpxRDlGLG3f0E2I7Ol2'
}

registeredUsers.push(testuser);



const createToken=() =>{
	let token = crypto.randomBytes(128);
	return token.toString("hex");
}

isUserLogged = (req,res,next)=>{

	if(!req.headers.token) {
		return res.status(403).json({message:"Forbidden!"});
	}
	for(let i=0; i<loggedSessions.length;i++){
		if(req.headers.token===loggedSessions[i].token){
			let now= Date.now();
			if(now>loggedSessions[i].ttl){
				loggedSessions.splice(i,1);
				return res.status(403).json({message:"Forbidden!"});
			}
			loggedSessions[i].ttl=now+time_to_life_diff; // plus another hour
			req.session = {};
			req.session.user = loggedSessions[i].user;
			return next();
		}
	}
	return res.status(403).json({message:"Forbidden!"});
}



//HELPERS
const port = process.env.port || 3001;



//Register
app.post("/register", function(req,res) {
	if(!req.body){
		return res.status(400).json({message:"Please Provide proper credentials"});
	} 
	
	if(!req.body.username||!req.body.password){
		return res.status(400).json({message:"Please Provide proper credentails"});
	}

	if(req.body.username.length<4|| req.body.password.length<8) {
		return res.status(400).json({message:"Please provide proper credentails"});
	}
	for(let i =0;i<registeredUsers.length;i++){
		if(req.body.username===registeredUsers[i].username){
			return res.status(409).json({message:"User already in use"});
		}
	}

	bcrypt.hash(req.body.password,14 , function (err, hash){
		if(err){
			return res.status(500).json({message:"Internal server error"});
		}
		let user = {
			username:req.body.username,
			password:hash
		}
			
		registeredUsers.push(user);
		
		return res.status(201).json({message:"Register Success"});
	});

	
})

app.post("/login", function(req,res) {
	
	if(!req.body){
		return res.status(400).json({message:"Please Provide proper credentials"});
	} 
	
	if(!req.body.username||!req.body.password){
		return res.status(400).json({message:"Please Provide proper credentails"});
	}

	if(req.body.username.length<4|| req.body.password.length<8) {
		return res.status(400).json({message:"Please provide proper credentails"});
	}
	for(let i = 0;i<registeredUsers.length;i++){
		
		if(req.body.username===registeredUsers[i].email){
		
			bcrypt.compare(req.body.password, registeredUsers[i].password,function(err, success){
				
			if(err){
					return res.status(500).json({message:"Internal server error"});
				}
				if(!success){
					return res.status(401).json({message:"Unauthrized!"});
				}
				
				let token = createToken();
			
				let now = Date.now();
				let session = {
					user:req.body.username,
					token:token,
					ttl:now+time_to_life_diff
				}
				loggedSessions.push(session);
				return res.status(200).json({"token":token});
			})

			return;
		}
	}
	return res.status(401).json({message:"Unauthrized!"});
});

app.post("/logout",function(req,res) {
	if(!req.headers.token){
		return res.status(404).json({message:"not found"})
	}
	for(let i =0;i<loggedSessions.length;i++){
		if(req.headers.token===loggedSessions[i].token){
			loggedSessions.splice(i,1);
			return res.status(200).json({message:"succes"})
		}
	}
	return res.status(404).json({message:"not found"})
})


//app.use("/api",isUserLogged,apiroutes);
app.use("/api",apiroutes);
app.listen(port);

console.log("Runnning on port ", port);