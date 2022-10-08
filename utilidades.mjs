import fs from "fs";
import { Element } from "./ModeloObjetosDB.mjs";

export function obtenerTipoEnlaceAtomico(elementOne, elementTwo){
    let tipoEnlace = `El tipo de enlace entre los elementos ${elementOne.nameElement} y ${elementTwo.nameElement} es: `;
    if(elementOne.typeElement === "Metal" && elementTwo.typeElement === "Metal"){
        return tipoEnlace + "Metalico";
    }
    else if(elementOne.typeElement === "Metal" && elementTwo.typeElement === "No metal"){
        return tipoEnlace + "Ionico";
    }
    else if(elementOne.typeElement === "No metal" && elementTwo.typeElement === "No metal"){
        return tipoEnlace + "Covalente"
    }
    else{
        return tipoEnlace + "Enlace inexistente";
    }
}
export function obtenerInformacionEnlaceAtomico(typeLink){
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
export function leerInfo(direccionArchivo){
    const informacionLeida = JSON.parse((fs.readFileSync(direccionArchivo)));
    return informacionLeida;
}
export function crearArregloModeloBaseDatos(objetosLeidos){
    const arregloObjetosGuardar = objetosLeidos.tablePeriodic.map(crearObjeto);
    return arregloObjetosGuardar;
}
function crearObjeto(informacionObjeto){
    const element = new Element({
        _id: informacionObjeto._id,
        nameElement: informacionObjeto.nameElement,
        family: informacionObjeto.family,
        typeElement: informacionObjeto.typeElement,
        info: informacionObjeto.info
    })
    return element
}