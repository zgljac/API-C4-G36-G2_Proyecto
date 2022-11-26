const express=require('express')
const connection=require('./connexion')
const indexroutes=(require('./routess/index'))
const cors=require('cors')
const app=express()



//midleware  --> software intermedio entre backend y frontend

app.use(cors())




app.listen(3009,function(){

console.log("Api G36 en el puerto 3009")
})

app.use(express.json())  // con este código me permite que el código .json en postman me muestre los datos
app.use("/",indexroutes)

app.use((req,res,next)=>{

res.setHeader('Access-Control-Allow-Origin','*')

})