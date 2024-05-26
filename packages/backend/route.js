import { submitFood } from "./api/foodHandler.js";
import { authenticateUser } from "./api/authHandler.js";
import { getFoodFacts, postImage } from "./api/images.js";

export function addRoutes(app){
    app.post("/image", authenticateUser, postImage, submitFood);
    app.get("/image");
    app.get("/foodFacts", getFoodFacts);
}