const express = require("express");
const app = express();
const { Mongoose } = require('mongoose');
const mongoose = require('mongoose');

app.use(express.json());

mongoose.connect("mongodb+srv://passengers:qwerty@67890@cluster0.wq4v4.mongodb.net/passengersData?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true});
const connection = mongoose.connection;
connection.once('open',() =>
{
    console.log("MongoDb add passengers database connection established successfully");
});

require("./Passenger")
const Passenger = mongoose.model("Passenger")

app.post("/passenger",(req,res) =>
{
    var newPassenger = {
        name: mongoose.Types.ObjectId(req.body.name),
        age: mongoose.Types.ObjectId(req.body.age),
        address:req.body.address
    }

    var passenger = new Passenger(newPassenger)

    passenger.save().then(() =>
    {
        res.send("PAssenger created")
    }).catch((err) =>
    {
        if(err){
            throw err
        }
    })

})
app.get("/passengers",(req,res) =>
{
    Passenger.find().then((passengers) =>
    {
        res.json(passengers)
    }).catch((err) =>
    {
        if(err){
            throw err
        }
    })
})

app.get("/passenger/:id",(req,res) =>
{
    Passenger.findById(req.params.id).then((passenger) =>
    {
        if(passenger)
        {
            res.json(passenger)
        }else{
            res.send("Invalid ID!")
        }
    }).catch((err) =>
    {
        if(err){
            throw err
        }
    })
})

app.listen(4545,() =>
{
    console.log("up and running! ==> passengers service");
})