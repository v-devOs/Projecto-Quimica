import mongoose from "mongoose"

const elementSchema = mongoose.Schema({
    _id: String,
    nameElement: String,
    family: Number,
    typeElement: String,
    info: String
}) 
export const Element = mongoose.model("Element", elementSchema)