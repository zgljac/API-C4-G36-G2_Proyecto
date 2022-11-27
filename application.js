const express=require('express')
const connection=require('./connexion')
const indexroutes=(require('./routess/index'))
const cors=require('cors')
const app=express()

app.use(cors())

app.listen(3009,function(){

console.log("Api G36 en el puerto 3009")
})

app.use(express.json())
app.use("/",indexroutes)

app.use((req,res,next)=>{

res.setHeader('Access-Control-Allow-Origin','*')
})