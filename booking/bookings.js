const express = require("express")
const app = express()

const { Mongoose } = require('mongoose');
const mongoose = require('mongoose');
const axios = require("axios");
const { response } = require("express");

app.use(express.json());

mongoose.connect("mongodb+srv://bookings:qwerty@2468@cluster0.wq4v4.mongodb.net/bookingsData?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true});
const connection = mongoose.connection;
connection.once('open',() =>
{
    console.log("MongoDb add bookings database connection established successfully");
});
require("./Booking")
const Booking = mongoose.model("Booking")

app.post("/booking",(req,res) =>
{
    var newBooking = {
        PassengerID:req.body.PassengerID,
        TrainID:req.body.TrainID,
        JouneyDate:req.body.JouneyDate
    }

    var booking = new Booking(newBooking)

    booking.save().then(()=>
    {
       res.send("Booking create with success!")
    }).catch((err) =>
    {
        if(err) {
        throw err
        }
    })
})

app.get("/bookings",(req,res) =>
{
    Booking.find().then((bookings) =>
    {
        res.json(bookings)
    }).catch(err =>
        {
            if(err){
                throw err;
            }
        })
})


app.get("/booking/:id",(req,res) =>
{
    Booking.findById(req.params.id).then((booking) =>
    {
        if(booking){
            axios.get("http://localhost:4545/passenger/"+ booking.PassengerID).then((response) =>
            {
                var bookingObject = {passengerName:response.data.name,trainTitle: ' '}
                axios.get("http://localhost:5000/train/"+booking.TrainID).then((response) =>
                {
                    bookingObject.trainTitle = response.data.name
                    res.json(bookingObject)
                })
            })
        }else{
            res.send("Invalid Booking")
        }
    })
})



app.listen(7777,() =>
{
    console.log("up and running! == booking service!!")
} )