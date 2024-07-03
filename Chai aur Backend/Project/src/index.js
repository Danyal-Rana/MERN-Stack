// require("dotenv").config({path: './env'});
import dotenv from "dotenv";
import connectDB from "./db/index.js";
import app from "./app.js";

dotenv.config({path: './.env'}); //.env

connectDB()
.then( () => {
    const myPort = process.env.PORT || 8001;
    app.listen(myPort, () => {
        console.log(`Server is running on port: ${myPort}`)
    });
})
.catch ((err) => {
    console.log(`DB connection failed !!! ${err}`);
});