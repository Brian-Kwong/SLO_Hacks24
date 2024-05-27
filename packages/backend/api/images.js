import dotenv from "dotenv";
import * as changeCase from "change-case";

dotenv.config();
const FDA_API_KEY = process.env.FDA_API_KEY;
const FDA_URL = "https://api.nal.usda.gov/fdc/v1/foods/search?query=";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { userModel } from "../models/user.js";
import { foodModel } from "../models/food.js";

let genaiClient = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
genaiClient = genaiClient.getGenerativeModel({
    model: "gemini-1.5-flash-latest",
});

export async function postImage(req, res, next) {
    console.log("POST /image", req.body);
    const image = req.body.image;
    const foodName = req.body.foodName;
    const ingredients = req.body.ingredients;
    const description = req.body.description;
    res.locals.desc = req.body.description;
    let basePrompt =
        "Given the following can you tell me what type of give as specific descriptive name as possible for what dish is,  its ingredients, and the serving size you observe in the image, and put the output in JSON";
    var prompt = [basePrompt];
    if(foodName !== undefined || ingredients !== undefined || description !== undefined){
        prompt[0] += "Additionally I know the following about the dish:" 
        if(foodName !== undefined) {prompt[0]+=`Food name : ${foodName}`}
        if(ingredients !== undefined) {prompt[0]+=`Ingredients : ${ingredients}`}
        if(description !== undefined) {prompt[0]+=`Description : ${description}`}
    }
    if(image !== undefined){
        prompt[0]+= "Attached is a image of the food item:"
        prompt.push({
            inlineData: {
                data: image,
                mimeType: "image/jpeg",
            },
        })
        await genaiClient
        .generateContent(prompt)
        .then((response) => {
            let data = response.response.candidates[0].content.parts[0].text;
            data = data.substring(7, data.length - 3);
            data = JSON.parse(data);        
            req.query = {
                foodName: data.dish,
                foodServingSize: data.serving_size,
            };
            res.locals.imgData = data;
            res.locals.encodedImage = req.body.image;
            next();
        })
        .catch((error) => {
            console.log(error);
            res.status(500).send("Internal Server Error");
        });
    }
    else{
        if(foodName !== undefined){
        res.locals.foodName = foodName;
        next();
        }
        else{
            res.status(400).send("Please provide an image or food name");
        }
    }
}

export async function getFoodFacts(req, res) {
    const food = req.query.foodName;
    const foodServingSize = req.query.foodServingSize;
    if (food === undefined) {
        res.status(400).send("Please provide a food name");
    } else {
        const request = fetch(`${FDA_URL}${food}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "X-Api-Key": process.env.FDA_API_KEY,
            },
        });
        await request.then((response) => {
            if (response.status === 200) {
                response.json().then((data) => {
                    console.log(data);
                    let foodData = data.foods[0];
                    foodData = {
                        name: food,
                        description: (foodData.description === undefined) ? "Unknown": changeCase.capitalCase(foodData.description),
                        foodCategory: (foodData.foodCategory === undefined) ? "Unknown": changeCase.capitalCase(foodData.foodCategory),
                        ingredients: (foodData.ingredients === undefined) ? "Unknown" : changeCase.capitalCase(foodData.ingredients),
                        nutrients: foodData.foodNutrients.map((nutrient) => {
                            return {
                                name: nutrient.nutrientName,
                                unit: nutrient.unitName,
                                value: nutrient.value,
                                dailyValue: nutrient.percentDailyValue,
                            };
                        }),
                        image: null,
                    };
                    res.send(foodData);
                });
            } else {
                res.status(response.status).send("Error");
            }
        });
    }
}

export async function getImages(req, res){
    const username = res.locals.username
    try{
        const foundUser = await userModel.findOne({username: username}).populate("images").exec();
        
        if (!foundUser){
            res.sendStatus(404).end();
        }
        
        res.send(foundUser.images).status(200);
    }
    catch(error){
        console.error(error);
        res.send(error);
    }
}
