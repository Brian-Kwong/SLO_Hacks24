import dotenv from "dotenv";

dotenv.config();
const FDA_API_KEY = process.env.FDA_API_KEY;
const FDA_URL = "https://api.nal.usda.gov/fdc/v1/foods/search?query=";
import { GoogleGenerativeAI } from "@google/generative-ai";

let genaiClient = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
genaiClient = genaiClient.getGenerativeModel({
    model: "gemini-1.5-flash-latest",
});

export async function postImage(req, res) {
    const image = req.file.buffer;
    console.log(image);
    const prompt =
        "Given the following image can you tell me what type of give as specific descriptive name as possible for what dish is,  its ingredients, and the serving size you observe in the image, and put the output in JSON";
    const request = genaiClient
        .generateContent([prompt, {
            inlineData: {
                data: image.toString("base64"),
                mimeType: "image/jpeg",
            },
        }])
        .then((response) => {
            let data = response.response.candidates[0].content.parts[0].text;
            data = data.substring(7, data.length - 3);
            res.send(JSON.parse(data));
        })
        .catch((error) => {
            console.log(error);
            res.status(500).send("Internal Server Error");
        });
}

export async function getFoodFacts(req, res) {
    const food = req.query.foodName;
    console;
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
                    let foodData = data.foods[0];
                    foodData = {
                        name: food,
                        description: foodData.description,
                        foodCategory: foodData.foodCategory,
                        ingredients: foodData.ingredients,
                        nutrients: foodData.foodNutrients.map((nutrient) => {
                            return {
                                name: nutrient.nutrientName,
                                unit: nutrient.unitName,
                                value: nutrient.value,
                                dailyValue: nutrient.dailyValue,
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
