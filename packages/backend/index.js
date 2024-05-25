import express from "express";
import { getFoodFacts, postImage } from "./images.js";
import multer from "multer";
import { connect } from './services/mongo.js';
import { addRoutes } from './route.js';
import { addAuthRoutes } from './authroutes.js';

const app = express();
const router = express.Router();
// Add json middleware
app.use(express.json());
addRoutes(app);
addAuthRoutes(router);
const storage = multer.memoryStorage();
const multerServer = multer({ storage: storage });

app.post("/image", multerServer.single("image"), postImage);
app.get("/images");
app.get("/foodFacts", getFoodFacts);
app.use("/auth", router);

// Connect to mongo DB
connect("test");


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
