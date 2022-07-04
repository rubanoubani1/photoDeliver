const { request, text } = require("express");
const express = require("express");
const pictureModel = require("../models/picture");
const { commentModel } = require("../models/comment");
const tagModel = require("../models/tag");
const notificationModel = require("../models/notification");
const userModel = require("../models/user");
const comment = require("../models/comment");

router = express.Router();

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
		bookmarked: true
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
		bookmarked: false
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
		bookmarked: false
	}
];
const settingstable =[]
const userdatabase =[];
let testuser = {
	email:'user@user.com',
	password:'user123'
}
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

userdatabase.push(testuser);

let id = 100;

//REST API

//get images
router.get("/pictures",function(req,res) {
	let query = {}; //{ "user": req.session.user };
	pictureModel.find(query, function (err, pictures) {
		if (err) {
			console.log("error querying pictures, err: " + err);
			return res.status(500).json({ message: "internal server error" });
		}
		return res.status(200).json(pictures);
	});
})

//get own images / get images of user
router.get("/user/:user/pictures",function(req,res){
	let query = { "owner": req.session.user };
	pictureModel.find(query, function (err, pictures) {
		if (err) {
			console.log("error querying pictures, err: " + err);
			return res.status(500).json({ message: "internal server error" });
		}
		return res.status(200).json(pictures);
	});
})

//get images that user has bookmarked
router.get("/user/:user/bookmarks",function(req,res){
	let userquery = { "user": req.session.user };
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
			return res.status(200).json(pictures);
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
		//if(picture)
		return res.status(200).json(picture);
	});
	
})

//post image
router.post("/pictures",function(req,res){
	if(!req.body) {
        return res.status(400).json({ message:"Bad request"});
    }
	/*let owner = {}
	if(req.body.owner){
		owner = {
			firstname: req.body.owner.firstname,
			lastname: req.body.owner.lastname,
			id: req.body.owner.id,
			urlsafe: req.body.owner.urlsafe,
			profilePictureUrl: req.body.owner.profilePictureUrl
		}
	}*/
	let picture = {
		//owner: owner,
		url: req.body.url,
		id: id,
		alt: req.body.alt,
		title: req.body.title,
		//date: req.body.date,
		comments: req.body.comments,
	}
	let userquery = { "user": req.session.user };
	userModel.findOne(userquery, function (err, user) {
		if (err) {
			console.log("error querying user " + req.session.user + ", err: " + err);
			return res.status(500).json({ message: "internal server error" });
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
		picture.owner = user;
		picture.tags = tags;
		picture.comments = [];
		picture.bookmarkedBy = [];
		let pictureM = new pictureModel(picture);
		pictureM.save(function (err) {
			if (err) {
				console.log("failed to save picture, err: " + err);
				return res.status(500).json({ message: "internal server error" });
			}
			return res.status(201).json({ message: "success" });
		})
	});
	
    /*id++;
    database.push(picture);
    return res.status(200).json(picture);*/
})

//post comment
router.post("/pictures/:photoid/comment", function(req,res){
	if (!req.body || !req.body.text) {
		return res.status(400).json({ message: "Bad request" });
	}
	let userquery = { "user": req.session.user };
	userModel.findOne(userquery, function (err, user) {
		comment = new commentModel({
			user: req.body.user,
			text: req.body.text,
		});
		comment.save(function (err) {
			if (err) {
				console.log("failed to save comment, err: " + err);
				return res.status(500).json({ message: "internal server error" });
			}
		})

		let query = { "_id": req.params.photoid };
		let update = { "$push": { comments: comment } }
		pictureModel.updateOne(query, update, function(err){
			if (err) {
				console.log("failed to update picture comments, err: " + err);
				return res.status(500).json({ message: "internal server error" });
			}
			return res.status(201).json({ message: "success" });
		});
	});
})

//add bookmark
router.post("/pictures/:id/bookmark",  function(req,res){
	let query = { "_id": req.params.id };
	let update = { "$push": { bookmarkedBy: req.session.user } }
	pictureModel.updateOne(query, update, function (err) {
		if (err) {
			console.log("failed to add bookmark, err: " + err);
			return res.status(500).json({ message: "internal server error" });
		}
		return res.status(201).json({ message: "success" });
	});
})

//follow user
router.post("/users/:id/follow", function (req, res) {
	let toBeFollowed = { "_id": req.params.id };
	let currentUser = { "_id": req.session.user };
	let follow = { "$push": { following: req.params.id } };
	let addFollower = { "$push": { followers: req.session.user } };
	userModel.updateOne(toBeFollowed, addFollower);
	userModel.updateOne(currentUser, follow, function (err) {
		if (err) {
			console.log("failed to follow user, err: " + err);
			return res.status(500).json({ message: "internal server error" });
		}
		return res.status(201).json({ message: "success" });
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
	pictureModel.deleteOne({ "_id": req.params.id, "user": req.session.user }, function (err, results) {
		if (err) {
			console.log("failed to remove item. err: " + err);
			return res.status(500).json({ message: "internal server error" });
		}
		/*if(results.numberDeleted===0){
			return res.status(404).json({message:"not found"})
		}*/
		return res.status(200).json({ message: "success" });
	});

	/*
	let tempId = parseInt(req.params.id, 10);
    for(let i = 0; i < database.length; i++){
        if(tempId === database[i].id){
            if(req.session.user !== database[i].user){
                return res.status(409).json({ message: "You are not authorized to remove this item"});
            }
            database.splice(i,1);
            return res.status(200).json({message: "Success!"});
        }
    }
    return res.status(404).json({message: "not found"}); 
	*/
})

//delete comment
router.delete("/pictures/:pictureid/comments/:id",function(req,res){
	pictureModel.findById(req.params.pictureid, function(err, picture){
		if (err) {
			console.log("failed to find picture to delete comment from. err: " + err);
			return res.status(500).json({ message: "internal server error" });
		}
		let query = { "_id": req.params.id };
		if (picture.owner._id !== req.session.user) {
			query = { 
				...query,
				"user": req.session.user 
			}
		}
		commentModel.deleteOne(query, function (err, results) {
			if (err) {
				console.log("failed to remove item. err: " + err);
				return res.status(500).json({ message: "internal server error" });
			}
			/*if(results.numberDeleted===0){
				return res.status(404).json({message:"not found"})
			}*/
			pictureModel.findByIdAndUpdate(
				req.params.pictureid, 
				{"$pull":{comments: {"_id":req.params.id}}},
				function(err, results){
					if (err) {
						console.log("failed to remove item. err: " + err);
						return res.status(500).json({ message: "internal server error" });
					}
					/*if(results.numberDeleted===0){
						return res.status(404).json({message:"not found"})
					}*/
					return res.status(200).json({ message: "success" });
				})
		});
	})
	
})

//unfollow user
router.delete("/users/:id/following/:userid",function(req,res){
	let toBeUnfollowed = { "_id": req.params.id };
	let currentUser = { "_id": req.session.user };
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
router.delete("/pictures/:id/bookmarks/:userid",function(req,res){
	let query = { "_id": req.params.id };
	let update = { "$pull": { bookmarkedBy: {"$in":[req.session.user]} } }
	pictureModel.updateOne(query, update, function (err) {
		if (err) {
			console.log("failed to add bookmark, err: " + err);
			return res.status(500).json({ message: "internal server error" });
		}
		return res.status(201).json({ message: "success" });
	});
})



module.exports = router;
