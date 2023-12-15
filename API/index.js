var Express = require("express") ;
var mongClient = require("mongodb").MongoClient ;
var cors = require("cors") ;
const multer = require("multer") ; 
const { MongoClient } = require("mongodb");

var app = Express() ;

app.use(cors()) ; 

var mongourl = "mongodb+srv://smb:M5DOK43ioDRQiUgB@cluster0.rylmxfi.mongodb.net/?retryWrites=true&w=majority"


















var databasename = "todoapp" ;
var database;
app.listen(5050,() => {
    MongoClient.connect(mongourl, (error,client) => {
        database = client.db(databasename) ;
        console.log("MongoDB connection successful!");
    });
})

app.get('/api/todoapp/GetNotes', (req, res) => {
    database.collection("todocollections").find({}).toArray((error,result) => {
        res.send(result) ;
    });
})

app.post('/api/todoapp/AddNotes', multer().none() ,(req,res) => {
    database.collection("todocollections").count({},function(error, numOfDocs) {
        database.collection("todocollections").insertOne({
            id:(numOfDocs+1).toString() ,
            description: req.body.newNotes
        }) ;

        res.json("added successfully !")
    })

app.delete('/api/todoapp/DeletedNotes' , (req,res) => {
    database.collection("todocollections").deleteOne({
        id:request.query.id 
    });

    res.json("Deleted Successfully !")
})
})