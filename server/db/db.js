const mongoose = require('mongoose');

const connectDb = async () => {
    try {
       await mongoose.connect(process.env.MONGO)

        console.log("connected to database!");
    }

    catch (error) {
        console.log("error connecting to the db!");
    }
}

module.exports = connectDb