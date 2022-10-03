import express  from 'express';
import bodyParser from 'body-parser';
import { getDataFromDatabase, getTypeLinkElements, setDataInDatabase, setInfoTypeLink } from './utilidades.mjs';
import { enlace, indexInfoElementOne, indexInfoElementTwo } from './variables.mjs';

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
    const nombreIdElemento1 = req.body.elemento1;
    const nombreIdElemento2 = req.body.elemento2;
    console.log("Datos guardados correctamente");
    if(nombreIdElemento1 === "AdminUriel" && nombreIdElemento2 === "paswordUriel"){
        setDataInDatabase
    }else{
        getDataFromDatabase(nombreIdElemento1, nombreIdElemento2).then((fetchedData)=>{
            const fetchedDataElementOne = fetchedData[indexInfoElementOne];
            const fetchedDataElementTwo = fetchedData[indexInfoElementTwo];
            EnlaceElementos.informacionElementos[indexInfoElementOne] = fetchedDataElementOne;
            EnlaceElementos.informacionElementos[indexInfoElementTwo] = fetchedDataElementTwo;
            EnlaceElementos.tipoEnlace = getTypeLinkElements(fetchedDataElementOne, fetchedDataElementTwo);
            EnlaceElementos.informacion = setInfoTypeLink(EnlaceElementos.tipoEnlace);
            hayInformacion = true;
            
            res.redirect('/');
        })
    }
    

    
})

app.listen(3000, ()=>{
    console.log("Server runing on port 3000");
})