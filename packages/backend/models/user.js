import mongoose, { model, Schema } from "mongoose"
import { foodModel } from "./food";


const userSchema = new Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    images: [{type: mongoose.Types.ObjectId, required: true, ref: foodModel.modelName}]
})

export const userModel = model("User", userSchema);