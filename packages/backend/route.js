import { submitFood } from "./api/foodHandler.js";
import { authenticateUser } from "./api/authHandler.js";
import { getFoodFacts, getImages, postImage } from "./api/images.js";

export function addRoutes(app){
    app.post("/image", authenticateUser, postImage, submitFood);
    app.get("/image", authenticateUser, getImages);
    app.get("/foodFacts", getFoodFacts);
}