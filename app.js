import express  from 'express';
import bodyParser from 'body-parser';
import { obtenerInformacionEnlaceAtomico, obtenerTipoEnlaceAtomico,  } from './utilidades.mjs';
import { enlace, indexInfoElementOne, indexInfoElementTwo } from './variables.mjs';
import { BaseDatos } from './DataBase.mjs';

const app = express();

let EnlaceElementos = enlace;
let hayInformacion = false;

app.set('view engine', "ejs");
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req,res)=>{
    if(hayInformacion){
        res.render("index",{
            tipoEnlace: EnlaceElementos.tipoEnlace
        })
    }
    else{
        res.render("index",{
            tipoEnlace: null
        })
    }
    
})

app.post('/', (req, res)=>{
    const idNameElementOne = req.body.elemento1;
    const idNameElementTwo = req.body.elemento2;
    const elementosConsultar = [idNameElementOne, idNameElementTwo];
    const dataBase = new BaseDatos("mongodb://localhost:27017/tablePeriodicDB");

    if(idNameElementOne === "AdminUriel" && idNameElementTwo === "paswordUriel"){
        dataBase.conectarBaseDatos().then(()=>{
            dataBase.guardarInformacionBaseDatos("TablePeriodicInfo.json");
            res.redirect("/");
        })
        
    }else{
        dataBase.conectarBaseDatos().then(()=>{
            dataBase.obtenerInformacion(elementosConsultar).then((infoElementosConsultados)=>{
                const infoElementoUnoConsultada = infoElementosConsultados[indexInfoElementOne];
                const infoElementoDosConsultada = infoElementosConsultados[indexInfoElementTwo];
                EnlaceElementos.tipoEnlace = obtenerTipoEnlaceAtomico(infoElementoUnoConsultada, infoElementoDosConsultada);
                EnlaceElementos.informacion = obtenerInformacionEnlaceAtomico(EnlaceElementos.tipoEnlace);
                hayInformacion = true;
                dataBase.desconectarBaseDatos();
                res.redirect("/");
            })
        })
    }
})

app.listen(3000, ()=>{
    console.log("Server runing on port 3000");
})