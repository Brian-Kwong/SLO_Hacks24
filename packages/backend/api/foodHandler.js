import { foodModel } from "../models/food.js";
import { userModel } from "../models/user.js";

export async function submitFood(req, res){
    const username = res.locals.username;
    const encodedImage = res.locals.encodedImage;
    const desc = res.locals.desc;

    // used if an image is given
    const imgData = res.locals.imgData;
    
    // only used if no image is given and only the name
    const foodName = res.locals.foodName;

    if (imgData == undefined && foodName == undefined){
        res.sendStatus(400).end();
        return;
    }

    const foodFacts = await fetch(`http://localhost:3000/foodFacts?foodName=${imgData ? imgData.dish : foodName}`, {method: "GET"}).then((response) => {return response.json()});

    try {
        const newFoodItem = await new foodModel({
            name: imgData ? imgData.dish : foodName,
            image: encodedImage,
            description: desc,
            foodCategory: foodFacts.foodCategory,
            ingredients: foodFacts.ingredients.split(" ")
        }).save();
        
        // add to nutrient array
        foodFacts.nutrients.map(async (nutrient) => {
            await foodModel.findOneAndUpdate({_id: newFoodItem._id}, {$push: {"nutrients": {name: nutrient.name, unit: nutrient.unit, value: Number(nutrient.value)}}})
        })

        const updatedUser = await userModel.findOneAndUpdate({username: username}, {$push: {"images": newFoodItem._id }}).exec();

        if (!updatedUser){
            res.sendStatus(404).end();
        }

        res.status(201).send(newFoodItem);
    }
    catch(error){
        console.error(error);
        res.send(error);
    }

}