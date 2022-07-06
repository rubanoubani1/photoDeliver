//const { request, text } = require("express");
const express = require("express");
const pictureModel = require("../models/picture");
const { commentModel } = require("../models/comment");
const tagModel = require("../models/tag");
const notificationModel = require("../models/notification");
const userModel = require("../models/user");

router = express.Router();


const settingstable =[]

let usersetting1 = {
	userid: 2,
	firstname: "Matti",
	lastname: "Virtanen",
	email: "mm@mm.com",
	password: "",
	birthday: "",
	user_icon: ""
}
let usersetting2 = {
	userid: 3,
	firstname: "Antti",
	lastname: "",
	email: "",
	password: "",
	birthday:  "",
	user_icon: ""
}
settingstable.push(usersetting1);
settingstable.push(usersetting2);


//let id = 100;

//returns mapping from user ids to user data
const getUserData = (userids, callback) => {
	let query = {"_id":{"$in":userids}};
	userModel.find(query, function (err, users) {
		if (err) {
			console.log("error querying items, err: " + err);
			return callback({ error: "internal server error" },undefined);
		} 
		let userDataDict = userids
		users.forEach(user => {
			userDataDict[user._id] = user;
		});
		callback(undefined, userDataDict);
	});
}

async function addUserData(pictures, callback){
	let users = {};
	pictures.forEach(picture => {
		users[picture.owner] = picture.owner;
		picture.comments.forEach(comment => {
			users[comment.owner] = comment.owner;
		})
	});
	getUserData(Object.keys(users), (err, userData)=>{
		if(err){
			callback(err, undefined);
		}
		pictures.forEach(picture => {
			picture.owner = userData[picture.owner];
			picture.comments.forEach(comment => {
				comment.owner = userData[comment.owner];
			})
		});
		callback(undefined, pictures);
	});
}

//REST API

//get images
router.get("/pictures",function(req,res) {
	let query = {}; //{ "user": req.session.user };
	pictureModel.find(query, function (err, pictures) {
		if (err) {
			console.log("error querying pictures, err: " + err);
			return res.status(500).json({ message: "internal server error" });
		}
		addUserData(pictures, (err, pics) => {
			if (err){
				console.log("error querying items, err: "+err);
				return res.status(500).json({message:"internal server error"});
			} 
			return res.status(200).json(pics);
		});
	});
})

//get own images / get images of user
router.get("/user/:user/pictures",function(req,res){
	let query = { "owner": req.session.userid };
	pictureModel.find(query, function (err, pictures) {
		if (err) {
			console.log("error querying pictures, err: " + err);
			return res.status(500).json({ message: "internal server error" });
		}
		addUserData(pictures, (err, pics) => {
			if (err){
				console.log("error querying items, err: "+err);
				return res.status(500).json({message:"internal server error"});
			} 
			return res.status(200).json(pics);
		});
	});
})

//get images that user has bookmarked
router.get("/user/:user/bookmarks",function(req,res){
	let userquery = { "_id": req.session.userid };
	userModel.findOne(userquery, function (err, user) {
		if (err) {
			console.log("error querying user "+req.session.user+", err: " + err);
			return res.status(500).json({ message: "internal server error" });
		}
		//TODO: check that the user.bookmarked and pictures have ids that can be queried
		let query = { "_id": {"$in":user.bookmarked} };
		pictureModel.find(query, function (err, pictures) {
			if (err) {
				console.log("error querying pictures, err: " + err);
				return res.status(500).json({ message: "internal server error" });
			}
			addUserData(pictures, (err, pics) => {
				if (err){
					console.log("error querying items, err: "+err);
					return res.status(500).json({message:"internal server error"});
				} 
				return res.status(200).json(pics);
			});
		});
	});
})

//get comments of an image
router.get("/pictures/:id/comments",function(req,res){
	let query = { "_id": req.params.id };
	pictureModel.findOne(query, function (err, picture) {
		if (err) {
			console.log("error querying comments, err: " + err);
			return res.status(500).json({ message: "internal server error" });
		}
		if (!picture) {
			return res.status(404).json({ message: "Not found." });
		}
		return res.status(200).json(picture.comments);
	})

})

//get an image
router.get("/pictures/:id",function(req,res){
	let query = { "_id": req.params.id };
	pictureModel.findOne(query, function (err, picture) {
		if (err) {
			console.log("error querying pictures, err: " + err);
			return res.status(500).json({ message: "internal server error" });
		}

		if (!picture) {
			return res.status(404).json({ message: "Not found." });
		}
		addUserData([picture], (err, pics) => {
			if (err) {
				console.log("error querying items, err: " + err);
				return res.status(500).json({ message: "internal server error" });
			}
			return res.status(200).json(pics[0]);
		});
	});
	
})

//post image
router.post("/pictures",function(req,res){
	if(!req.body | !req.body.url ) {
        return res.status(400).json({ message:"Bad request"});
    }
	
	let picture = {
		owner: req.session.userid,
		url: req.body.url,
		alt: req.body.alt,
		title: req.body.title,
		description: req.body.description,
	}
	if (!req.body.description){
		req.body.description = "";
	}
	let tags = req.body.description.split(/(\s+)/).filter((token)=>{
		return token.startsWith("#")
	}).map((tag)=>{
		return {tag:tag}
	})
	tagModel.insertMany(tags, {ordered:false}, function(err, docs){
		if(err){
			console.log("error inserting tags: "+err);
		}
	});
	picture.tags = tags;
	let pictureM = new pictureModel(picture);
	pictureM.save(function (err) {
		if (err) {
			console.log("failed to save picture, err: " + err);
			return res.status(500).json({ message: "internal server error" });
		}
		return res.status(201).json({ message: "success" });
	})
	
})

//post comment
router.post("/pictures/:photoid/comments", function(req,res){
	if (!req.body || !req.body.text) {
		return res.status(400).json({ message: "Bad request" });
	}
	let comment = new commentModel({
		owner: req.session.userid,
		text: req.body.text,
	});
	
	let query = { "_id": req.params.photoid };
	let update = { "$push": { comments: comment } }
	pictureModel.updateOne(query, update, function (err, results) {
		if (err) {
			console.log("failed to update picture comments, err: " + err);
			return res.status(500).json({ message: "internal server error" });
		}
		if(results.modifiedCount>0){
			comment.save(function (err) {
				if (err) {
					console.log("failed to save comment, err: " + err);
					return res.status(500).json({ message: "internal server error" });
				}
			})
			return res.status(201).json({ message: "success" });
		}
		return res.status(404).json({message:"Not found"})
	});
})

//add bookmark
router.put("/pictures/:id/mark",  function(req,res){
	let query = { "_id": req.params.id };
	let update = { "$push": { bookmarkedBy: req.session.userid } }
	pictureModel.updateOne(query, update, function (err, results) {
		if (err) {
			console.log("failed to add bookmark, err: " + err);
			return res.status(500).json({ message: "internal server error" });
		}
		if (results.modifiedCount > 0) {
			return res.status(201).json({ message: "success" });
		}
		return res.status(404).json({ message: "Not found" });
	});
})

//follow user
router.put("/users/:id/follow", function (req, res) {
	let toBeFollowed = { "_id": req.params.id };
	let currentUser = { "_id": req.session.userid };
	let follow = { "$push": { following: req.params.id } };
	let addFollower = { "$push": { followers: req.session.userid } };
	userModel.updateOne(toBeFollowed, addFollower,(err, results)=>{
		if (results.modifiedCount > 0) {
			userModel.updateOne(currentUser, follow, function (err) {
				if (err) {
					console.log("failed to follow user, err: " + err);
					return res.status(500).json({ message: "internal server error" });
				}
				return res.status(201).json({ message: "success" });
			});
		}
		return res.status(404).json({ message: "Not found" })
	});
	
})

//edit user settings
router.put("/settings/:userid",function(req,res){
	if (!req.body || !req.body.email ) {
		return res.status(400).json({ message: "Bad request" });
	}
	//TODO: add settings to mongo
	
	let tempId = parseInt(req.params.userid, 10);

    if(!req.body) {
        return res.status(400).json({message:"Bad request"});
    }
	if(!req.body.email) {
        return res.status(400).json({message:"Bad request"});
    }
	let settings = {
		userid: req.params.userid,
		firstname: req.body.firstname,
		lastname: req.body.lastname,
		email: req.body.email,
		password: req.body.password,
		birthday: req.body.birthday,
		user_icon: req.body.user_icon
	}
	for(i=0; i<settingstable.length; i++){
		if(tempId === settingstable[i].userid){
			if(req.session.user !== settingstable[i].user){
                return res.status(409).json({ message: "You are not authorized to edit these settings"});
			}
			settingstable.splice(i,1, settings);
			return res.status(200).json({message: "Success!"});
		}
	}	
	return res.status(404).json({message: "not found"}); 
})

//delete user
/* router.delete("/user/:id",function(req,res)){

}*/

//delete own picture
router.delete("/pictures/:id",function(req,res){
	pictureModel.findOneAndDelete({ "_id": req.params.id, "owner": req.session.userid }, function (err, picture) {
		if (err) {
			console.log("failed to remove item. err: " + err);
			return res.status(500).json({ message: "internal server error" });
		}
		if (picture) {
			let commentQuery = { "_id": { "$in": picture.comments.map((comment) => comment._id) } };
			commentModel.deleteMany(commentQuery);
			return res.status(200).json({ message: "success" });
		}
		return res.status(404).json({ message: "Not found" })
	});
})

//delete comment
router.delete("/pictures/:pictureid/comments/:id",function(req,res){
	pictureModel.findById(req.params.pictureid, function(err, picture){
		if (err) {
			console.log("failed to find picture to delete comment from. err: " + err);
			return res.status(500).json({ message: "internal server error" });
		}
		if (!picture){
			return res.status(404).json({ message: "Not found." });
		}
		let query = { "_id": req.params.id };
		if (picture.owner !== req.session.userid) {
			query = { 
				...query,
				"owner": req.session.userid
			}
		}
		commentModel.findOneAndDelete(query, function (err, comment) {
			if (err) {
				console.log("failed to remove item. err: " + err);
				return res.status(500).json({ message: "internal server error" });
			}
			if (!comment) {
				return res.status(404).json({ message: "Not found." });
			}
			pictureModel.findByIdAndUpdate(
				req.params.pictureid, 
				{"$pull":{comments: {"_id":req.params.id}}},
				function(err, results){
					if (err) {
						console.log("failed to remove item. err: " + err);
						return res.status(500).json({ message: "internal server error" });
					}
					return res.status(200).json({ message: "success" });
				})
		});
	})
	
})

//unfollow user
router.put("/users/:id/unfollow",function(req,res){
	let toBeUnfollowed = { "_id": req.params.id };
	let currentUser = { "_id": req.session.userid };
	let unfollow = { "$pull": { following: {$in:[req.params.id]} } };
	let removeFollower = { "$pull": { followers: {$in:[req.session.user]} } };
	userModel.updateOne(toBeUnfollowed, removeFollower,function(err){
		if (err) {
			console.log("failed to unfollow user, err: " + err);
			return res.status(500).json({ message: "internal server error" });
		}
		userModel.updateOne(currentUser, unfollow, function (err) {
			if (err) {
				console.log("failed to unfollow user, err: " + err);
				return res.status(500).json({ message: "internal server error" });
			}
			return res.status(201).json({ message: "success" });
		});
	});
	
})

//remove bookmark
router.put("/pictures/:id/unmark",function(req,res){
	let query = { "_id": req.params.id };
	let update = { "$pull": { bookmarkedBy: {"$in":[req.session.userid]} } }
	pictureModel.updateOne(query, update, function (err) {
		if (err) {
			console.log("failed to add bookmark, err: " + err);
			return res.status(500).json({ message: "internal server error" });
		}
		return res.status(201).json({ message: "success" });
	});
})



module.exports = router;
