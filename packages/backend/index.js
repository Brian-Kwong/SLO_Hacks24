import express from "express";
import { getFoodFacts, postImage } from "./api/images.js";
import multer from "multer";
import { connect } from './services/mongo.js';
import { addRoutes } from './route.js';
import { addAuthRoutes } from './authroutes.js';
import cors from "cors";

const app = express();
app.use(cors());
const router = express.Router();
// Add json middleware
app.use(express.json({limit: "50mb"}));
const PORT=process.env.PORT;

addRoutes(app);
addAuthRoutes(router);
const storage = multer.memoryStorage();
const multerServer = multer({ storage: storage });

app.use("/auth", router);

// Connect to mongo DB
connect("test");

app.listen(PORT, () => {
    console.log('Server is running on port ', PORT);
});
