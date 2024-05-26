import mongoose, { model, Schema } from "mongoose"


const foodSchema = new Schema({
    name: {type: String, required: true},
    image: {type: Buffer},
    description: {type: String},
    foodCategory: {type: String},
    ingredients: [{type: String}],
    nutrients: [{name: {type: String, required: true}, unit: {type: String}, value: {type: Number}, dailyValue: {type: Number}}]
})

export const foodModel = model("Food", foodSchema);