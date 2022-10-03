import mongoose from "mongoose";


mongoose.connect('mongodb://localhost:27017/fruitsDB');
const elementSchema = mongoose.Schema({
    _id: Number,
    name: String,
    rating: Number
}) 
const Fruit = mongoose.model("Fruit", elementSchema);

export async function getDataFromDatabase(idNameElementOne, idNameElementTwo){
    const infoElementOne = await consultDatabase(idNameElementOne);
    const infoElementTwo = await consultDatabase(idNameElementTwo);
    const infoFethed = [infoElementOne, infoElementTwo];
    mongoose.connection.close();
    return infoFethed;
}
const consultDatabase = (idNameElementOne) =>{
    return new Promise((resolve, reject)=>{
        Fruit.findOne({name: idNameElementOne}, function(err, elementFetched){
            err ? console.log(err) : resolve(elementFetched);
        })
    })
}

export function getTypeLinkElements(elementOne, elementTwo){
    if(elementOne.typeElement === "Metal Transiscion" && elementTwo.typeElement === "Metal Transicion"){
        return "Metalico";
    }
    else if(elementOne.typeElement === "Metal" && elementTwo.typeElement === "No metal"){
        return "Ionico";
    }
    else if(elementOne.typeElement === "Metal" && elementTwo.typeElement === "No metal"){
        return "Covalente"
    }
}

export function setInfoTypeLink(typeLink){
    if(typeLink === "Covalente"){
        return "Info enlace Covalente";
    }
    else if(typeLink === "Metalico"){
        return "Info Enlace Metalico";
    }
    else if(typeLink === "Ionico"){
        return "Info enlace Ionico";
    }
    else{
        return "No hay info sobre este tipo de enlace";
    }
}

export function setDataInDatabase(){
    
}