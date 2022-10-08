import mongoose from "mongoose";
import { crearArregloModeloBaseDatos, leerInfo } from "./utilidades.mjs";
import { indexInfoElementOne, indexInfoElementTwo } from "./variables.mjs";
import { Element } from "./ModeloObjetosDB.mjs";

export class BaseDatos{
    constructor(urlBaseDatos){
        this.urlBaseDatos = urlBaseDatos;
    }
    async conectarBaseDatos(){
        const conection = await mongoose.connect(this.urlBaseDatos);
        conection;
    }
    desconectarBaseDatos(){
       mongoose.connection.close();
    }
    async obtenerInformacion(elementosConsultar){
        const infoConsultadaElementoUno = await this.consultarBaseDatos(elementosConsultar[indexInfoElementOne])
        const infoConsultadaElementoDos = await this.consultarBaseDatos(elementosConsultar[indexInfoElementTwo]);
        const infoElementosConsultados = [infoConsultadaElementoUno, infoConsultadaElementoDos];
        return infoElementosConsultados;

    }
    async consultarBaseDatos(elementoConsultar){
        return new Promise((resolve, reject)=>{
            Element.findOne({nameElement: elementoConsultar}, (err, infoElemento)=>{
                err ? console.log(err): resolve(infoElemento);
            })
        })
    }
    guardarInformacionBaseDatos(direccionArchivo){
        this.conectarBaseDatos();
        const objetosLeidos = leerInfo(direccionArchivo);
        const arregloObjetosGuardar = crearArregloModeloBaseDatos(objetosLeidos);
        Element.insertMany(arregloObjetosGuardar,(err)=>{
            err ? console.log(err): console.log("Save");;
            ;
        })
    }
    
}