const mongoose = require("mongoose");

mongoose.model("Train",{
    trainName: {
        type: String,
        require: true
    },
    trainNumber: {
        type: Number,
        require: true
    },
    // trainDate: {
    //     type: Date,
    //     require: true
    //  },
});