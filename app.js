import express  from 'express';
import bodyParser from 'body-parser';
import { enlace } from './variables.mjs';
import { getDataFromDataBase } from './utilidades.mjs';

const app = express();



let hayInformacion = false;

app.set('view engine', "ejs");
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req,res)=>{
    if(hayInformacion){
        res.render("index",{
            tipoEnlace: null
        })
    }
    else{
        res.render("index",{
            tipoEnlace: null
        })
    }
    
})

app.post('/', (req, res)=>{
    const nombreIdElemento1 = req.body.elemento1;
    const nombreIdElemento2 = req.body.elemento2;
    console.log("Datos guardados correctamente");

    // dataElemento1 = getDataFromDataBase(nombreIdElemento1);
    // dataElemento2 = getDataFromDataBase(nombreIdElemento2);


    



})

app.listen(3000, ()=>{
    console.log("Server runing on port 3000");
})