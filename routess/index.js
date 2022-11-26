const express=require('express')
const router=express.Router()
const bodyParser=require('body-Parser')
const connexion=require('../connexion')
const urlcodeParser=bodyParser.urlencoded({extended:false})
const app=express()

app.use(bodyParser.json())



router.get("/",function(req,res,){

res.send("la API DEL EQUIPO G36 FUNCIONA OK")


})

//código para INSERTAR un DOCUMENTO EN PROPIETARIO

router.post("/Insertar_Propietario",urlcodeParser, async(req,res,err)=>{
const db=await connexion()
var obj={

	Primer_Nombre:req.body.Primer_Nombre,
	Segundo_Nombre:req.body.Segundo_Nombre,
	Primer_Apellido:req.body.Primer_Apellido,
	Segundo_Apellido:req.body.Segundo_Apellido,
	Correo:req.body.Correo,
	Telefono:req.body.Telefono,
	Direccion_De_Contacto:req.body.Direccion_De_Contacto,
	Documento_De_Identidad:req.body.Documento_De_Identidad
	}

console.log(obj)

await db.collection('Propietarios').insertOne(obj,function(err,result){

if(err){res.send(err)}
	else{
		res.status(200).send({save:1})
		if (res.status(200))
			{console.log('Propietario almacenado OKAY')
	}

}
})
})








//código para MOSTRAR un DOCUMENTOS DE PROPIETARIOS



router.post("/MostrarPropietarios",urlcodeParser,async(req,res)=>{

const db= await connexion()
await db.collection('Propietarios').find().toArray(function(err,result){
     if(err){res.send(err)}
	 console.log(result)
     res.status(200).send({result})

   })


})



//código para Mostrar un DOCUMENTO en especifico en Propietarios en este caso se hace búsqueda por documento





router.post("/ShowPropietarios",urlcodeParser,async(req,res)=>{

let busqueda={Documento_De_Identidad:req.body.Documento_De_Identidad}/*parámetro de búsqueda de documentos(profesion), si quiero filtrar por más búsqueda debo agregar después
más campos ejemplo   {Profesion:req.body.Profesion,Nombre}   etc*/
console.log(busqueda)

const db=await connexion()
await db.collection('Propietarios').find(busqueda).toArray(function(err,result){
  if(err){res.send(err)}
  	else{
  		res.status(200).send({result})
  		console.log(result)
  	}

   })
})








// código para ACTUALIZAR un DOCUMENTO

router.post("/updatePropietario",urlcodeParser,async(req,res)=>{
let obj_buscar={Documento_De_Identidad:req.body.Documento_De_Identidad}
let cambios={$set:{Primer_Nombre:req.body.Primer_Nombre,Segundo_Nombre:req.body.Segundo_Nombre,Primer_Apellido:req.body.Primer_Apellido,Segundo_Apellido:req.body.Segundo_Apellido,Correo:req.body.Correo,Telefono:req.body.Telefono}}  //aqui se cambió a estado para hacer el ejemplo pero se puede buscar como yo desee, 
//--> ejemplo  updateMany({User_name:"greeneyes"},{$set:{User_name:"lover"}})


//let cambio={$set:{Estado:parseInt(req.body.Estado)}}
console.log(obj_buscar)
console.log(cambios)	


const db= await connexion()

//en el sgte código si quiero actualizar varios debo poner updateMany  
await db.collection('Propietarios').updateMany(obj_buscar,cambios,function(err){    

if(err)throw err

	if(err){res.send(err)}

		else{
             res.status(200).send({save:1})
             console.log('registro actualizado correctamente')
		}

   })
})


// código para ELIMINAR un DOCUMENTO

router.post("/DeletePropietario",urlcodeParser,async(req,res)=>{
let obj_buscar={Documento_De_Identidad:req.body.Documento_De_Identidad}
console.log(obj_buscar)
const db=await connexion()
await db.collection('Propietarios').deleteOne(obj_buscar,function(err,result){
if(err)throw err

	if(err){res.send({eliminado:0})}

		else{
            if(res.status(200)){
            	res.status(200).send({eliminado:1, msn:'documento elimado correctamente'})

console.log('documento elimado correctamente')
      }
     }


   })
})



module.exports=router