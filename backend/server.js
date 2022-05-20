const express = require("express");
const apiroutes = require("./routes/apiroutes");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const mongoose = require('mongoose');
const userModel = require('./models/loginuser');
const userdataModel = require('./models/user');
const sessionModel = require('./models/session');

const app = express();

app.use(express.json());

// ENVIRONMENT VARIABLES
const port = process.env.PORT || 3001;
const mongo_user = process.env.MONGODB_USER;
const mongo_pw = process.env.MONGODB_PASSWORD;
const mongo_url = process.env.MONGODB_URL;
const mongo_db = "photoDeliverDatabase"
const time_to_live_diff = 3600000;

//MONGOOSE CONNECTION
const connection_url = "mongodb+srv://" + mongo_user + ":" + mongo_pw + "@" + mongo_url + "/" + mongo_db + "?retryWrites=true&w=majority";

mongoose.connect(connection_url).then(
	() => console.log("successfully connected"),
	(error) => console.log("failed to connect, error: " + error)
)

mongoose.set("toJSON", { virtuals: true });

const createToken=() =>{
	let token = crypto.randomBytes(128);
	return token.toString("hex");
}

isUserLogged = (req,res,next)=>{

	if(!req.headers.token) {
		return res.status(403).json({message:"Forbidden!"});
	}
	
	sessionModel.findOne({ "token": req.headers.token }, function (err, session) {
		if (err) {
			console.log("failed to find session while in filter, err: " + err);
			return res.status(403).json({ message: "Forbidden" });
		}
		if (!session) {
			return res.status(403).json({ message: "Forbidden" });
		}
		let now = Date.now();
		if (now > session.ttl) {
			sessionModel.deleteOne({ "_id": session._id }, function (err) {
				if (err) {
					console.log("failed to remove expired session, err: " + err);
				}
				return res.status(403).json({ message: "Forbidden" });
			});
		} else {
			req.session = {};
			req.session.user = session.user;
			session.ttl = now + time_to_live_diff;
			session.save(function (err) {
				if (err) {
					console.log("failed to update session, err: " + err)
				}
				return next();//res.status(403).json({ message: "forbidden" });
			})

		}
	})
}



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
	
	bcrypt.hash(req.body.password, 14, function (err, hash) {
		if (err) {
			return res.status(500).json({ message: "internal server error" });
		}
		let user = new userModel({
			username: req.body.username,
			password: hash
		});
		let userdata = new userdataModel({
			user: req.body.username,
			urlsafe: req.body.username,
			firstname: "",
			lastname: "",
			profilePictureUrl: "",
			bio: "",
			following: [],
			followed: [],
			bookmarked: []
		});
		userdata.save(function (err, userdata) {
			if (err) {
				console.log("Failed to save new user, error: " + err);
				if (err.code === 11000) {
					return res.status(409).json({ message: "username alreasy in use" });
				}
				return res.status(500).json({ message: "internal server error" });
			}
			user.save(function (err, user) {
				if (err) {
					console.log("Failed to save new user, error: " + err);
					if (err.code === 11000) {
						return res.status(409).json({ message: "username alreasy in use" });
					}
					return res.status(500).json({ message: "internal server error" });
				}
				return res.status(201).json({ message: "user registered" });
			})
		})
	})

	
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
	userModel.findOne({ 'username': req.body.username }, function (err, user) {
		if (err) {
			console.log("error finding user, reason: " + err);
			return res.status(500).json({ message: "Internal server error" });
		}
		if (!user) {
			//TODO: wait 2 seconds for safety
			return res.status(401).json({ message: "unauthorized" });
		}
		bcrypt.compare(req.body.password, user.password, function (err, success) {
			if (err) {
				console.log("Error comparing passwrds, err: " + err);
				return res.status(500).json({ message: "Internal server error" });
			}
			if (!success) {
				return res.status(401).json({ message: "unauthorized" });
			}
			const token = createToken();
			let now = Date.now();
			let session = new sessionModel({
				user: req.body.username,
				ttl: now + time_to_live_diff,
				token: token
			});
			session.save(function (err) {
				if (err) {
					console.log("failed to save session in login, err: " + err);
					return res.status(500).json({ message: "internal server error" });
				}
				return res.status(200).json({ token: token });
			});
		});
	});
});

app.post("/logout",function(req,res) {
	if(!req.headers.token){
		return res.status(404).json({message:"Not found"})
	}
	
	sessionModel.deleteOne({ token: req.headers.token }, function (err, _results) {
		if (err) {
			console.log("failed to remove session, err: " + err);
		}
		return res.status(200).json({ message: "success" });
	});
})


app.use("/api",isUserLogged,apiroutes);

app.listen(port);

console.log("Runnning on port ", port);