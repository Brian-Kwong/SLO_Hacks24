import express from "express";
import { getFoodFacts, postImage } from "./api/images.js";
import multer from "multer";
import { connect } from './services/mongo.js';
import { addRoutes } from './route.js';
import { addAuthRoutes } from './authroutes.js';
import serverless from "serverless-http";
import dot from "dotenv";


// Set port
dot.config();
const port = process.env.PORT || 3000;

const app = express();
const router = express.Router();
// Add json middleware
app.use(express.json({limit: "50mb"}));

addRoutes(app);
addAuthRoutes(router);
const storage = multer.memoryStorage();
const multerServer = multer({ storage: storage });

app.use("/auth", router);

// Connect to mongo DB
connect("test");


// Binds socket to port
const server = async () =>
    app.listen(port, () => {
        console.log(`REST API  is listening at ${port}`);
    });

// Starts server
server();

// Lambda handler
const handler = serverless(app);
export async function handleStart(context, req) {
    const res = await handler(context, req);
    return res;
}
