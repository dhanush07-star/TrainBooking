const mongoose =require('mongoose')

mongoose.model("Booking",{
    PassengerID:{
        type:mongoose.SchemaTypes.ObjectId,
        required:true
    },
    TrainID:{
        type:mongoose.SchemaTypes.ObjectId,
        required:true
    },
    JouneyDate:{
        type:Date,
        required:true
    }
})