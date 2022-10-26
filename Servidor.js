const express = require("express");
const path = require("path");
const app = express();
const puerto = process.env.PORT;
//const puerto = 5000;

app.set('view engine', 'ejs');
app.set('views','/app/views');
app.use(express.static('/app/public'));

app.get("/",(req, res)=>{
   // console.log(__dirname);
    res.render("principal");
});
//Oyente
app.listen(puerto, () => {
    console.log("Ejecutando servidor");
});