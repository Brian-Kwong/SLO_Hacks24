import mongoose, { model, Schema } from "mongoose"


const foodSchema = new Schema({
    name: {type: String, required: true},
    image: {type: mongoose.Types.Buffer},
    description: {type: String},
    foodCategory: {type: String},
    ingredients: [{type: String}],
    nutrients: [{_id: {type: mongoose.Types.ObjectId, required: true}, name: {type: String, required: true}, unit: {type: Number}, value: {type: Number}, dailyValue: {type: Number}}]
})

export const foodModel = model("Food", foodSchema);