import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

// major configs

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

// app.use(express.json());
app.use(express.json({limit: "16kb"})); // it means max 16kb data of json can be sent //parses json data/bodies


// app.use(express.urlencoded());
app.use(express.urlencoded({extended: true})); // extended means that the object can be of any type (true) or just a string (false), objects can be nested

app.use(express.static("public")); // to serve/store static files like pdf images etc

app.use(cookieParser()); // to access and set the cookies of client

export default app;