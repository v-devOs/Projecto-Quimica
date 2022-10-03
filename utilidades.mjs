import mongoose from "mongoose";
import fs from "fs";
mongoose.connect('mongodb://localhost:27017/tablePeriodicDB');
const elementSchema = mongoose.Schema({
    _id: Number,
    nameElement: String,
    family: Number,
    typeElement: String,
    info: String
}) 

const Element = mongoose.model("Element", elementSchema)
export async function getDataFromDatabase(idNameElementOne, idNameElementTwo){
    const infoElementOne = await consultDatabase(idNameElementOne);
    const infoElementTwo = await consultDatabase(idNameElementTwo);
    const infoFethed = [infoElementOne, infoElementTwo];
    mongoose.connection.close();
    return infoFethed;
}
const consultDatabase = (idNameElementOne) =>{
    return new Promise((resolve, reject)=>{
        Element.findOne({name: idNameElementOne}, function(err, elementFetched){
            err ? console.log(err) : resolve(elementFetched);
        })
    })
}

export function getTypeLinkElements(elementOne, elementTwo){
    if(elementOne.typeElement === "Metal" && elementTwo.typeElement === "Metal"){
        return "Metalico";
    }
    else if(elementOne.typeElement === "Metal" && elementTwo.typeElement === "No metal"){
        return "Ionico";
    }
    else if(elementOne.typeElement === "No Metal" && elementTwo.typeElement === "No metal"){
        return "Covalente"
    }
    else{
        return "Enlace inexistente";
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
    mongoose.connect('mongodb://localhost:27017/tablePeriodicDB');
    const dirNameFile = "TablePeriodicInfo.json";
    const dataTablePeriodic = readDataTablePeriodic(dirNameFile);
    const elementsToSaveDatabase = createArrayWithScheema(dataTablePeriodic);
    Element.insertMany(elementsToSaveDatabase, (err)=>{
        if(err){console.log(err);}
        else{
            console.log("Info save on Database");
            mongoose.connection.close();
        }
    })
}
function readDataTablePeriodic(dirNameFile){
    const rawData = fs.readFileSync(dirNameFile);
    const dataTablePeriodic = JSON.parse(rawData);
    return dataTablePeriodic;
}
function createArrayWithScheema(dataTablePeriodic){
    const arrayScheemaElements = dataTablePeriodic.tablePeriodic.map(createObject);
    return arrayScheemaElements;
}
function createObject(elementInfo){
    const element = new Element({
        _id: elementInfo._id,
        nameElement: elementInfo.nameElement,
        family: elementInfo.family,
        typeElement: elementInfo.typeElement,
        info: elementInfo.info
    })
    return element
}