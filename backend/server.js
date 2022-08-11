const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();


const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
// mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true}
//     ); 
// const connection = mongoose.connection;




// connection.once('open' , () => {
//     console.log("MongoDB database connection established successfully");
// })   (OLDIES)

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(uri);
        console.log(`MONGODB connected: ${conn.connection.host}`);
    } catch(err) {
        console.log(`Error: ${err}`);
    }
}

connectDB();

const exercisesRouter =  require('./routes/exercises');
const usersRouter = require('./routes/users');

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);



app.listen(port, () => {
    console.log(`server is running on port: ${port}`);
});