import { login, register } from "./api/authHandler.js";

export function addAuthRoutes(router){
    router.post("/register", register);
    router.post("/login", login)
}