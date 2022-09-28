import mongoose from "mongoose";

async function fin(){
    const ex = await Fruit.findOne({name: "Apple"}).exec();
    mongoose.connection.close();
    console.log(ex.name);
}

fin();

mongoose.connect("mongodb://localhost:27017/tablePeriodicDB");

export function getDataFromDataBase(elementName){

    const elementSchema = new mongoose.Schema({
        _id: Number,
        nombre: String,
        familia: String,
        descripcion: String
    });

    const Element = mongoose.model("Element", elementSchema);

    let elementData


    Element.findOne({name: elementName}, (err, element)=>{
        err ? console.log(err) : elementData = element;
    })

    mongoose.disconnect();
    
    return elementData;
}

export function setDataInDataBase(){
    
}