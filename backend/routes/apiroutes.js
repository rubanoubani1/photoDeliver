
const express = require("express");
const pictureModel = require("../models/picture");
const { commentModel } = require("../models/comment");
const tagModel = require("../models/tag");
const notificationModel = require("../models/notification");
const { userModel } = require("../models/user");
const crypto = require('crypto');
const ObjectId = require('mongoose').Types.ObjectId;

require("dotenv").config();
//library for form data parsing
//const multer = require("multer");
//const upload = multer();
const fileUpload = require("express-fileupload");

//const fileUpload = multer(); //can be removed
//const FileReader = require("filereader");  //can be removed
//const streamifier = require("streamifier"); //can be removed
//const formidable = require("formidable");
//cloudinary api for uploading images
const cloudinary = require("cloudinary").v2;
// cloudinary configuration
cloudinary.config({
    cloud_name: process.env.YOUR_CLOUD_NAME,
    api_key: process.env.YOUR_API_KEY,
    api_secret: process.env.YOUR_API_SECRET
});


var router = express.Router();

router.use(fileUpload({ useTempFiles : true }));



const createToken = (bytes) => {
	let token = crypto.randomBytes(bytes);
	return token.toString("hex");
}


//let id = 100;
/*
//returns mapping from user ids to user data
const getUserData = (userids, callback) => {
	let query = {"_id":{"$in":userids}};
	let projection = {
		_id: 1,
		id:1,
		urlsafe: 1,
		firstname: 1,
		lastname: 1,
		userIconUrl: 1,
		bio: 1,
	}
	userModel.find(query, projection, function (err, users) {
		if (err) {
			console.log("error querying items, err: " + err);
			return callback({ error: "internal server error" },undefined);
		} 
		let userDataDict = {}
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
				comment.user = userData[comment.owner];
				console.log(typeof comment.user);
			})
		});
		callback(undefined, pictures);
	});
}
*/

const pictureProjection = {
	"bookmarkedBy": 0,
	"comments.picture": 0,
	"owner.following" : 0,
	"owner.followers" : 0,
	"owner.bookmarked": 0,
	"owner.user": 0,
	"comments.owner.following": 0,
	"comments.owner.followers": 0,
	"comments.owner.bookmarked": 0,
	"comments.owner.user": 0,
}

//REST API

//get images
router.get("/pictures",function(req,res) {
	let query = {}; //{ "user": req.session.user };
	pictureModel.find(query, pictureProjection, function (err, pictures) {
		if (err) {
			console.log("error querying pictures, err: " + err);
			return res.status(500).json({ message: "internal server error" });
		}
		return res.status(200).json(pictures);
		/*
		addUserData(pictures, (err, pics) => {
			if (err){
				console.log("error querying items, err: "+err);
				return res.status(500).json({message:"internal server error"});
			} 
			return res.status(200).json(pics);
		});*/
	});
})

//get own images / get images of user
router.get("/user/:userid/pictures",function(req,res){
	let query = { "owner._id": req.params.userid };
	if (!ObjectId.isValid(req.params.userid)){
		return res.status(400).json({ message: "invalid id value" });
	}
	pictureModel.find(query, pictureProjection, function (err, pictures) {
		if (err) {
			console.log("error querying pictures, err: " + err);
			return res.status(500).json({ message: "internal server error" });
		} 
		return res.status(200).json(pictures);
		/*addUserData(pictures, (err, pics) => {
			if (err){
				console.log("error querying items, err: "+err);
				return res.status(500).json({message:"internal server error"});
			} 
			return res.status(200).json(pics);
		});*/
	});
})

//get images that user has bookmarked
router.get("/user/:userid/bookmarks",function(req,res){
	let userquery = { 
		"_id": req.params.userid, 
	};
	userModel.findOne(userquery, function (err, user) {
		if (err) {
			console.log("error querying user "+req.session.user+", err: " + err);
			return res.status(500).json({ message: "internal server error" });
		}
		//TODO: check that the user.bookmarked and pictures have ids that can be queried
		let query = { "_id": {"$in":user.bookmarked} };
		pictureModel.find(query, pictureProjection, function (err, pictures) {
			if (err) {
				console.log("error querying pictures, err: " + err);
				return res.status(500).json({ message: "internal server error" });
			}
			return res.status(200).json(pictures);
			/*addUserData(pictures, (err, pics) => {
				if (err){
					console.log("error querying items, err: "+err);
					return res.status(500).json({message:"internal server error"});
				} 
				return res.status(200).json(pics);
			});*/
		});
	});
})
/*
//get comments of an image
router.get("/pictures/:id/comments",function(req,res){
	let query = { "_id": req.params.id };
	pictureModel.findOne(query, {"comments":1}, function (err, picture) {
		if (err) {
			console.log("error querying comments, err: " + err);
			return res.status(500).json({ message: "internal server error" });
		}
		if (!picture) {
			return res.status(404).json({ message: "Not found." });
		}
		return res.status(200).json(picture.comments);
	});

});*/

//get an image
router.get("/pictures/:id",function(req,res){
	let query = { "_id": req.params.id };
	pictureModel.findOne(query, pictureProjection, function (err, picture) {
		if (err) {
			console.log("error querying pictures, err: " + err);
			return res.status(500).json({ message: "internal server error" });
		}

		if (!picture) {
			return res.status(404).json({ message: "Not found." });
		}
		return res.status(200).json(picture);
		/*addUserData([picture], (err, pics) => {
			if (err) {
				console.log("error querying items, err: " + err);
				return res.status(500).json({ message: "internal server error" });
			}
			return res.status(200).json(pics[0]);
		});*/
	});
	
})


//POST

//post image
router.post("/pictures",function(req,res){
	if( !req.body ) {
        return res.status(400).json({ message:"Bad request"});
    }
	if (!req.files || !req.files.file || !req.files.file.tempFilePath) {
		console.log("no picture in request");
		console.log(req.files);
		return res.status(400).json({ message: "No picture in request" });
	}
	userModel.findById(req.session.userid, (err, user) => {
		if (err) {
			console.log("error querying user, err: " + err);
			return res.status(500).json({ message: "internal server error" });
		}
		console.log("Uploading to cloudinary");
		cloudinary.uploader.upload(req.files.file.tempFilePath,
			function (error, result) {
				if (error) {
					console.log("Failed to save image to cloudinary: ", error);
					return res.status(500).json({ message: "internal server error" });
				}
				console.log("Upload successful.");
				let picture = {
					owner: user,
					url: result.secure_url,
					urlsafe: createToken(32), //this might have collisions if there are millions of users
					alt: req.body.alt,
					title: req.body.title,
					description: req.body.description,
					bookmarkedBy: [],
					comments: [],
				}
				if (!req.body.description) {
					req.body.description = "";
				}
				let tags = req.body.description.split(/(\s+)/).filter((token) => {
					return token.startsWith("#")
				}).map((tag) => {
					return { tag: tag }
				})
				tagModel.insertMany(tags, { ordered: false }, function (err, docs) {
					if (err) {
						console.log("error inserting tags: " + err);
					}
				});
				picture.tags = tags;
				let pictureM = new pictureModel(picture);
				pictureM.save(function (err) {
					if (err) {
						console.log("failed to save picture, err: " + err);
						return res.status(500).json({ message: "internal server error" });
					}
					return res.status(201).json(pictureM);
				});

			});	
	});
	
	
	
	
})

//post comment
router.post("/pictures/:photoid/comments", function(req,res){
	if (!req.body || !req.body.comment) {
		return res.status(400).json({ message: "Bad request" });
	}
	userModel.findById(req.session.userid, (err, user) => {
		if (err) {
			console.log("error querying user, err: " + err);
			return res.status(500).json({ message: "internal server error" });
		}
		let comment = new commentModel({
			owner: user,
			picture: req.params.photoid,
			text: req.body.comment,
		});

		let query = { "_id": req.params.photoid };
		let update = { "$push": { comments: comment } }
		pictureModel.updateOne(query, update, function (err, results) {
			if (err) {
				console.log("failed to update picture comments, err: " + err);
				return res.status(500).json({ message: "internal server error" });
			}

			if (results.modifiedCount > 0) {
				comment.save(function (err) {
					/*if (err) { //this could cause res.status to be set twice 
						console.log("failed to save comment, err: " + err);
						return res.status(500).json({ message: "internal server error" });
					}*/
				})
				return res.status(201).json({ message: "success" });
			}
			return res.status(404).json({ message: "Not found" });
		});
	});

	

})

//add bookmark
router.put("/pictures/:id/mark", function (req, res) {
	
	let query = {
		"_id": req.params.id,
		//"bookmarkedBy": { "$nin": [req.session.userid] },
	};
	let update = { "$addToSet": { bookmarkedBy: req.session.userid } }
	pictureModel.updateOne(query, update, function (err, picResults) {
		if (err) {
			console.log("failed to add bookmark, err: " + err);
			return res.status(500).json({ message: "internal server error" });
		}
		if (picResults.modifiedCount > 0) {
			let userQuery = {
				"_id": req.session.userid,
			};
			let userUpdate = { "$addToSet": { bookmarked: req.params.id } };
			userModel.updateOne(userQuery, userUpdate, function (err, userResults) {
				if (err) {
					console.log("failed to add bookmark, err: " + err);
					return res.status(500).json({ message: "internal server error" });
				}
				if (userResults.modifiedCount > 0) {
					return res.status(200).json({ message: "success" });
				}
				if (userResults.matchedCount > 0) {
					return res.status(200).json({ message: "Already bookmarked." });
				}
				return res.status(404).json({ message: "Not Found." });
			});
		} else {
			if (matchedCount > 0) {
				return res.status(200).json({ message: "Already bookmarked." });
			}
			return res.status(404).json({ message: "Not Found." });
		}
		
	});
})

//follow user
router.put("/users/:id/follow", function (req, res) {
	let toBeFollowed = { "_id": req.params.id };
	let currentUser = { "_id": req.session.userid };
	let follow = { "$addToSet": { following: req.params.id } };
	let addFollower = { "$addToSet": { followers: req.session.userid } };

	userModel.bulkWrite([
		{
			updateOne: {
				filter: toBeFollowed,
				update: addFollower
			}
		},
		{
			updateOne: {
				filter: currentUser,
				update: follow
			}
		},
	], function (err, results) {
		if (err) {
			console.log("failed to follow user, err: " + err);
			return res.status(500).json({ message: "internal server error" });
		}
		if (results && results.nModified > 0) {
			return res.status(200).json({ message: "Success" });
		}
		if (results && results.nMatched > 0) {
			return res.status(200).json({ message: "User was already followed" });
		}
		return res.status(404).json({ message: "Not Found" });
	});
	
})


//edit user settings
router.put("/settings",function(req,res){
	if (!req.body ) {
		return res.status(400).json({ message: "Bad request" });
	}
	let query = {"_id":req.session.userid};
	let settings = {
		//urlsafe: req.body.urlsafe,
		bio: req.body.bio,
		firstname: req.body.firstname,
		lastname: req.body.lastname,
		//email: req.body.email, //email changing should be separate endpoint
		//password: req.body.password, //password changing should be separate endpoint
		birthday: req.body.birthday,
		userIconUrl: req.body.userIconUrl
	};
	if(req.image){
		// Find Cloudinary documentation using the link below
		// https://cloudinary.com/documentation/upload_images
		cloudinary.uploader.upload(req.image, result => {
			console.log("user icon post result:", result);
			settings.userIconUrl = result.url;
			userModel.updateOne(query, { "$set": {...settings} }, function (err) {
				if (err) {
					console.log("failed to follow user, err: " + err);
					return res.status(500).json({ message: "Internal server error" });
				}
				return res.status(200).json({ message: "Success" });
			});
		})	
	} else {
		userModel.updateOne(query, { "$set": settings }, function (err) {
			if (err) {
				console.log("failed to follow user, err: " + err);
				return res.status(500).json({ message: "Internal server error" });
			}
			return res.status(200).json({ message: "Success" });
		});
	}
	
});


//delete user
/* router.delete("/user/:id",function(req,res)){

}*/

//delete own picture
router.delete("/pictures/:id",function(req,res){
	pictureModel.findOneAndDelete({ "_id": req.params.id, "owner._id": req.session.userid }, function (err, picture) {
		if (err) {
			console.log("failed to remove item. err: " + err);
			return res.status(500).json({ message: "internal server error" });
		}
		if (picture) {
			let commentQuery = { "_id": { "$in": picture.comments.map((comment) => comment._id) } };
			commentModel.deleteMany(commentQuery);
			//TODO: cloudinary.uploader.destroy(database[i].public_id, function(result) { console.log(result) });
			return res.status(200).json({ message: "success" });
		}
		return res.status(404).json({ message: "Not found" });
	});
});

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
		if (picture.owner._id !== req.session.userid) {
			query = { 
				...query,
				"owner._id": req.session.userid
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
	});
});

//unfollow user
router.put("/users/:id/unfollow",function(req,res){
	let toBeUnfollowed = { "_id": req.params.id };
	let currentUser = { "_id": req.session.userid };
	let unfollow       = { "$pullAll": { following: [req.params.id] } };
	let removeFollower = { "$pullAll": { followers: [req.session.userid] } };
	userModel.bulkWrite([
		{ 
			updateOne: {
				filter: toBeUnfollowed,
				update: removeFollower
			}
		},
		{
			updateOne: {
				filter: currentUser,
				update: unfollow
			}
		},
	],function(err,results){
		if (err) {
			console.log("failed to unfollow user, err: " + err);
			return res.status(500).json({ message: "internal server error" });
		}
		if (results && results.nModified > 0){
			return res.status(200).json({ message: "Success" });
		}
		if (results && results.nMatched > 0) {
			return res.status(200).json({ message: "User was already unfollowed" });
		}
		return res.status(404).json({ message: "Not Found" });
	});
	
})

//remove bookmark
router.put("/pictures/:id/unmark",function(req,res){
	let query = { "_id": req.params.id };
	let update = { "$pullAll": { bookmarkedBy: [req.session.userid] } }
	
	pictureModel.updateOne(query, update, function (err, results) {
		if (err) {
			console.log("failed to add bookmark, err: " + err);
			return res.status(500).json({ message: "internal server error" });
		}
		if (results.modifiedCount > 0) {
			let userQuery = {
				"_id": req.session.userid,
				//"bookmarked": { "$nin": [req.params.id] },
			};
			let userUpdate = { "$pullAll": { bookmarked: [req.params.id] } };
			userModel.updateOne(userQuery, userUpdate, function (err, userResults) {
				if (err) {
					console.log("failed to add bookmark, err: " + err);
					return res.status(500).json({ message: "internal server error" });
				}
				if (userResults.modifiedCount > 0) {
					return res.status(200).json({ message: "success" });
				}
				if (userResults.matchedCount > 0) {
					return res.status(200).json({ message: "Already not bookmarked" });
				}
				return res.status(404).json({ message: "Not found" });
			});
		} else {
			if (results.matchedCount > 0) {
				return res.status(200).json({ message: "Picture was already not bookmarked" });
			}
			return res.status(404).json({ message: "Not found" });
		}
		
	});
})


module.exports = router;

/**
 * 
 * //get images
router.get("/pictures",function(req,res) {
	

//get own images / get images of user
router.get("/user/:user/pictures",function(req,res){
	

//get images that user has bookmarked
router.get("/user/:user/bookmarks",function(req,res){
	

//get comments of an image
router.get("/pictures/:id/comments",function(req,res){
	

//get an image
router.get("/pictures/:id",function(req,res){
	

//POST

//post image
router.post("/pictures",function(req,res){
	

//post comment
router.post("/pictures/:photoid/comments", function(req,res){


//add bookmark
router.put("/pictures/:id/mark", function (req, res) {

//follow user
router.put("/users/:id/follow", function (req, res) {
   

//edit user settings
router.put("/settings", function (req, res) {
   

//delete own picture
router.delete("/pictures/:id", function (req, res) {
   
//delete comment
router.delete("/pictures/:pictureid/comments/:id", function (req, res) {
   

//unfollow user
router.put("/users/:id/unfollow", function (req, res) {
   

//remove bookmark
router.put("/pictures/:id/unmark", function (req, res) {
  
 * 
 */