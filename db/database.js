const mongoose = require('mongoose');
require('dotenv').config();


const connectDB = async() => {

        await mongoose.connect(process.env.MONGO_URL).then(() => {
            console.log("db connected");
        }).catch((err) => {
            console.log("Db connection failed");
            console.error('Error connecting to the database:', err);
            process.exit(1);
        })
      
}

module.exports = connectDB;