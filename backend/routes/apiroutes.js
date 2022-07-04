const { request, text } = require("express");
const express = require("express");
const pictureModel = require("../models/picture");
const { commentModel } = require("../models/comment");
const tagModel = require("../models/tag");
const notificationModel = require("../models/notification");
const userModel = require("../models/user");

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
    //return res.status(200).json(database);
})
//get own images / get images of user
router.get("/user/pictures/:user",function(req,res){
	/*let userid = parseInt(req.params.user, 10);
	let tempdatabase = [];
	for(let i=0; i<database.length;i++){
		if(userid === database[i].owner.id && database[i].bookmarked === false){
				tempdatabase.push(database[i]);
		}
	}
	return res.status(200).json(tempdatabase);*/
	let query = { "owner": req.params.user };
	pictureModel.find(query, function (err, pictures) {
		if (err) {
			console.log("error querying pictures, err: " + err);
			return res.status(500).json({ message: "internal server error" });
		}
		return res.status(200).json(pictures);
	});
})
//get images that user has bookmarked
router.get("/user/bookmarks/:user",function(req,res){
	let userquery = { "user": req.params.user };
	userModel.findOne(userquery, function (err, user) {
		if (err) {
			console.log("error querying user "+req.params.user+", err: " + err);
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
	/*let userid = parseInt(req.params.user, 10);
	let tempdatabase = [];
	for(let i=0; i<database.length;i++){
		if(userid === database[i].owner.id && database[i].bookmarked === true){
				tempdatabase.push(database[i]);
		}
	}
	return res.status(200).json(tempdatabase);*/
})
//get comments of an image
router.get("/pictures/:id/comments",function(req,res){
	let pictureid = parseInt(req.params.id, 10);
	comments= [];
	for(let i=0; i<database.length;i++){
		if(pictureid === database[i].id){
				comments=database[i].comments;
				return res.status(200).json(comments);
		}
	}
	return res.status(404).json({message: "not found"}); 
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
		return res.status(200).json(pictures);
	});
	/*let pictureid = parseInt(req.params.id, 10);
	let picture = {};
	for(let i=0; i<database.length;i++){
		if(pictureid === database[i].id){
				picture=database[i];
				return res.status(200).json(picture);
		}
	}
	return res.status(404).json({message: "not found"}); */
})
//post image
router.post("/pictures",function(req,res){
	if(!req.body) {
        return res.status(400).json({ message:"Bad request"});
    }
	let owner = {}
	if(req.body.owner){
		owner = {
			firstname: req.body.owner.firstname,
			lastname: req.body.owner.lastname,
			id: req.body.owner.id,
			urlsafe: req.body.owner.urlsafe,
			profilePictureUrl: req.body.owner.profilePictureUrl
		}
	}
    let tempicture = { 
        id:id,
        owner:req.session.userid,
        url:req.body.url,
		title:req.body.title,
        description:req.body.description,
		tags:request.body.tags,
        date:req.body.date
    }
	let picture = {
		owner: owner,
		url: req.body.url,
		id: id,
		alt: req.body.alt,
		title: req.body.title,
		date: req.body.date,
		comments: req.body.comments,
		bookmarked: false
	}
	let userquery = { "user": req.session.user };
	userModel.findOne(userquery, function (err, user) {
		if (err) {
			console.log("error querying user " + req.params.user + ", err: " + err);
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
	
    id++;
    database.push(picture);
    return res.status(200).json(picture);
})
//post comment
router.post("/comment/:photoid", function(req,res){
	let pictureid = parseInt(req.params.photoid, 10);
	comment = {
		user: req.body.user,
		id: req.body.id,
		text: req.body.text,
		date: req.body.date
	}
	for(let i=0; i<database.length;i++){
		if(pictureid === database[i].id){
				database[i].comments.push(comment);
				return res.status(200).json({message:"successful"});
		}
	}
	return res.status(201).json({message:"successful"});
})
//add bookmark
router.post("/bookmark/:id",  function(req,res){
	return res.status(200).json({message:"successful"});
})
//follow user
router.post("/follow/:id", function(req,res){
	return res.status(200).json({message:"successful"});
})
//edit user settings
router.put("/settings/:userid",function(req,res){
	let tempId = parseInt(req.params.userid, 10);

    if(!req.body) {
        return res.status(400).json({message:"Bad request"});
    }
	if(!req.body.email) {
        return res.status(400).json({message:"Bad request"});
    }
	let settings = {
		userid: userid,
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
})
//delete comment
router.delete("/comments/:id",function(req,res){

})
//unfollow user
router.delete("/api/follow/:id",function(req,res){

})
//remove bookmark
router.delete("/api/bookmark/:id",function(req,res){

})



module.exports = router;
