const express = require("express");

const app = express();

app.use(express.json());

//DATABASE

const database = [];
let id = 100;

//HELPERS
const port = process.env.port || 3001;

//REST API

app.get("/api/pictures",function(req,res) {
    return res.status(200).json(database);
})




app.listen(port);

console.log("Runnning on port ", port);