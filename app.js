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
    const idNameElementOne = req.body.elemento1;
    const idNameElementTwo = req.body.elemento2;
    if(idNameElementOne === "AdminUriel" && idNameElementTwo === "paswordUriel"){
        setDataInDatabase();
        res.redirect("/");
    }else{
        getDataFromDatabase(idNameElementOne, idNameElementTwo).then((fetchedData)=>{
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