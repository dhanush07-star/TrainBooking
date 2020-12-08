const express = require("express");
const app = express();
app.use(express.json());
const { Mongoose } = require('mongoose');
const mongoose = require('mongoose');
require("./Train")
const Train =mongoose.model("Train");

mongoose.connect("mongodb+srv://WorkSpace:qwerty@12345@cluster0.wq4v4.mongodb.net/<dbname>?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true});
const connection = mongoose.connection;
connection.once('open',() =>
{
    console.log("MongoDb add train database connection established successfully");
});
app.get('/',(req,res) =>
{
    res.send("This is our point");
});

app.post('/train',(req,res) =>
{
     var newTrain ={
         trainName:req.body.trainName,
         trainNumber: req.body.trainNumber,
    //     //trainDate : req.body.trainDate
     }

     var train = new Train(newTrain);

     train.save().then(() => {console.log("new train created!")}).catch((err) =>{if(err){throw err;}})
     res.send("A new Train is created!")
    // //res.send("testing our book route!")
   });
app.get("/trains",(req,res) =>
{
    Train.find().then((trains) =>
    {
        res.json(trains)
    }).catch(err =>
        {
            if(err){
                throw err;
            }
        })
})

app.get("/train/:id",(req,res) =>
{
    Train.findById(req.params.id).then((train) =>
    {
        if(train){
            res.json(train)
        }else{
            res.sendStatus(404);
        }
    }).catch(err =>{
        if(err){
            throw err
        }
    })
})

app.delete("/train/:id",(req,res) =>{
    train.findOneAndRemove(req.params.id).then(() =>
    {
        res.send("Train removed with success")
    }).catch(err =>
        {
            if(err){
                throw err;
            }
        })
})
app.listen(5000,() =>
{
    console.log("up and running -- this is our trains service")
});