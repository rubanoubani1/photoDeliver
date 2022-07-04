
const express = require("express");

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
    api_key: process.env.YOUR_API_NAME,
    api_secret: process.env.YOUR_API_SECRET
});


var router = express.Router();

router.use(fileUpload({ useTempFiles : true }));


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
    return res.status(200).json(database);
})
//get own images / get images of user
router.get("/user/pictures/:user",function(req,res){
	let userid = parseInt(req.params.user, 10);
	let tempdatabase = [];
	for(let i=0; i<database.length;i++){
		if(userid === database[i].owner.id && database[i].bookmarked === false){
				tempdatabase.push(database[i]);
		}
	}
	return res.status(200).json(tempdatabase);
})
//get images that user has bookmarked
router.get("/user/bookmarks/:user",function(req,res){
	let userid = parseInt(req.params.user, 10);
	let tempdatabase = [];
	for(let i=0; i<database.length;i++){
		if(userid === database[i].owner.id && database[i].bookmarked === true){
				tempdatabase.push(database[i]);
		}
	}
	return res.status(200).json(tempdatabase);
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
	let pictureid = parseInt(req.params.id, 10);
	let picture = {};
	for(let i=0; i<database.length;i++){
		if(pictureid === database[i].id){
				picture=database[i];
				return res.status(200).json(picture);
		}
	}
	return res.status(404).json({message: "not found"}); 
})
router.post('/pictures', function(req, res) {
	console.log(req.files.file);
	cloudinary.uploader.upload(req.files.file.tempFilePath, function(error, result) {console.log(result, error); });
	//cloudinary.v2.uploader.upload(req.file, options, callback);
	/*
	cloudinary.uploader.upload(
		(error, result) => {
			console.log(result, error);
	})*/
	let picture ={				
		owner: {
			firstname: "Joe",//req.body.owner.firstname,
			lastname: "Doe",//req.body.owner.lastname,
			id: 222,//req.session.userid,
			urlsafe: "",
			//profilePictureUrl: req.body.owner.profilePictureUrl
		},
		url: "",
		id: id,
		//alt: req.body.alt,
		title: req.body.title,
		date: Date.now(),
		bookmarked: false
	}
	//console.log(req);
	id++;
	database.push(picture);
	return res.status(200).json(picture);
});
/*
//post image
//client sending multipart/form-data saving image to buffer and  sending it to cloudinary
router.post('/pictures', fileUpload.single('image'), function (req, res, next) {
    let streamUpload = (req) => {
        return new Promise((resolve, reject) => {
            let stream = cloudinary.uploader.upload_stream(
              (error, result) => {
                if (result) {
                  resolve(result);
                } else {
                  reject(error);
                }
              }
            );

          streamifier.createReadStream(req.file.buffer).pipe(stream);
        });
    };
/*
    async function upload(req) {
        let result = await streamUpload(req);
		let picture ={				
			owner: {
				firstname: "Joe",//req.body.owner.firstname,
				lastname: "Doe",//req.body.owner.lastname,
				id: 222,//req.session.userid,
				urlsafe: result.urlsafe,
				//profilePictureUrl: req.body.owner.profilePictureUrl
			},
			url: result.url,
			id: id,
			//alt: req.body.alt,
			title: req.body.title,
			date: Date.now(),
			bookmarked: false
		}
		id++;
		database.push(picture);
        console.log(result);
		return res.status(200).json(picture);
    }

    
});
*//*
const getBase64FromUrl = async (blob) => {
   
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        const base64data = reader.result;
        resolve(base64data)
      };
    });
}
const toDataUrl = function(cover, callback) {
	const xhr = new XMLHttpRequest();
	xhr.responseType = 'blob';
	xhr.onload = function() {
	   var reader = new FileReader();
	   reader.onloadend = function() {
		 callback(reader.result);
	   }
	   reader.readAsDataURL(xhr.response);
	};
	xhr.open('GET', cover);
	xhr.send();
}
   
router.post("/pictures",function(req,res){
	if(!req.body) {
        return res.status(400).json({ message:"Bad request"});
    }      
	toDataUrl (req.body.image, function( base64Img ) {
        cloudinary.uploader( base64Img,{
          folder: 'testi',
           resource_type: 'raw',
         },function(err, res){ 
            if (err){ 
              console.log(err); 
            } else { 
              console.log(res);
			  let picture ={				
				owner: {
					firstname: "Joe",//req.body.owner.firstname,
					lastname: "Doe",//req.body.owner.lastname,
					id: 222,//req.session.userid,
					urlsafe: result.urlsafe,
				//profilePictureUrl: req.body.owner.profilePictureUrl
			  	},
			  	url: result.url,
			  	id: id,
			  	//alt: req.body.alt,
			  	title: req.body.title,
			  	date: Date.now(),
			  	bookmarked: false
			  }
			  id++;
			  database.push(picture);
			  return res.status(200).json(picture);
            } 
        });
    })
	
	
//	});
});*/
//post comment
router.post("/comment/:photoid", function(req,res){
	/*let pictureid = parseInt(req.params.photoid, 10);
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
	}*/
	return res.status(201).json({message:"successful"});
})
/*
router.post("/pictures",async function(req,res){
	if(!req.body) {
        return res.status(400).json({ message:"Bad request"});
    }      

	// Find Cloudinary documentation using the link below
	// https://cloudinary.com/documentation/upload_images
	console.log(typeof req.body.image)
	console.log(req.body);
	//const photourl = await getBase64FromUrl(req.body.image);
	//cloudinary.uploader.upload(photourl, (err,result) => {
	let picture ={				
					owner: {
					firstname: "Joe",//req.body.owner.firstname,
					lastname: "Doe",//req.body.owner.lastname,
					id: 222,//req.session.userid,
					urlsafe: result.urlsafe,
					//profilePictureUrl: req.body.owner.profilePictureUrl
				},
				url: result.url,
				id: id,
				//alt: req.body.alt,
				title: req.body.title,
				date: Date.now(),
				bookmarked: false
		}
		id++;
		database.push(picture);
		return res.status(200).json(picture);
//	});
});*/
//post comment
router.post("/comment/:photoid", function(req,res){
	/*let pictureid = parseInt(req.params.photoid, 10);
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
	}*/
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
	// parse a file upload
	//const form = Formidable();
	//form.parse(req, (err, fields, files) => {
		// Find Cloudinary documentation using the link below
		// https://cloudinary.com/documentation/upload_images
		cloudinary.uploader.upload(req.image, result => {
			console.log(result);
			let settings = {
				userid: tempId,
				firstname: req.body.firstname,
				lastname: req.body.lastname,
				email: req.body.email,
				password: req.body.password,
				birthday: req.body.birthday,
				user_icon: result.url
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
	})
//})

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
			//cloudinary.uploader.destroy(database[i].id, function(result) { console.log(result) });
            database.splice(i,1);
            return res.status(200).json({message: "Success!"});
        }
    }
    return res.status(404).json({message: "not found"}); 
})
//delete comment
router.delete("/comments/:id",function(req,res){	
	return res.status(200).json({message: "Success!"});
		
})
//unfollow user
router.delete("/api/follow/:id",function(req,res){

})
//remove bookmark
router.delete("/api/bookmark/:id",function(req,res){

})


module.exports = router;
