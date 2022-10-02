import mongoose from "mongoose";


mongoose.connect('mongodb://localhost:27017/fruitsDB');
const elementSchema = mongoose.Schema({
    _id: Number,
    name: String,
    rating: Number
}) 
const Fruit = mongoose.model("Fruit", elementSchema);

export async function getDataFromDatabase(idNameElement){
    const infoElement = await consultDatabase(idNameElement);
    return infoElement;
}

const consultDatabase = (idNameElement) =>{
    return new Promise((resolve, reject)=>{
        Fruit.findOne({name: idNameElement}, function(err, elementFetched){
            if(err){
                console.log(err);
            }
            else{
                mongoose.connection.close();
                resolve(elementFetched);
            }
        })
    })
}