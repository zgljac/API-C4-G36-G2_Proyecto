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

// LOGIN


// CREAR USUARIO LOGIN
router.post("/crearUsurLogin",urlcodeParser, async(req,res,err)=>{
	const db=await connexion()
	var obj={
		user:req.body.user,
		password:req.body.password
		}
	console.log(obj)
	await db.collection('users').insertOne(obj,function(err,result){
	if(err){res.send(err)}
		else{
			res.status(200).send({save:1})
			if (res.status(200))
				{console.log('Usuario para LOGIN creado satisfactoriamente')
		}
	}
	})
	})

// PROPIETARIOS
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

// INMUEBLES
// INSERTAR INMUEBLE
router.post("/Insertar_Inmueble",urlcodeParser,async(req,res,err)=>{
	var obj={
		Id_inmueble:req.body.id_inmueble,
		Direccion:req.body.direccion,
		Numero_Identificacion:req.body.numero_identificacion,
		Id_Tarifa:req.body.tarifa
	}
	console.log(obj)
	const db= await connection()
	await db.collection('inmueble').insertOne(obj,function(err,result){
		if(err){res.send(err)}
		else{
			res.status(200).send({save:1})
			if(res.status(200))
			{ console.log('Inmueble almacenado')
			}
		}
	})
})

// CONSULTAR INMUEBLE
router.post("/Mostrarinmueble",urlcodeParser,async(req,res)=>{
	const db= await connection()
	await db.collection('inmueble').find().toArray(function(err,result){
		if(err){res.send(err)}
		console.log(result)
		res.status(200).send({result})
	})
})

// ACTUALIZAR INMUEBLE
router.post("/updateinmueble",urlcodeParser,async(req,res)=>{
	let obj_buscar={Direccion:req.body.direccion}
	
	let cambios={$set:{Numero_Identificacion:parseInt(req.body.numero_identificacion)}}
	console.log(obj_buscar)
	console.log(cambios)

	const db= await connection()
	await db.collection('inmueble').updateOne(obj_buscar,cambios,function(err){
		if(err)throw err

			if(err){res.send(err)}
				else{
					res.status(200).send({save:1})
					console.log('Inmueble Actualizado') 
				}
	})
})

// 
router.post("/inmuebleJoin",urlcodeParser,async(req,res)=>{

	let consulta=[
		{
			$lookup:{from:'inmueble', localField:'inmueble' ,foreignField:'_id', as :'Descripcion_inmueble'}
		}
	]
	console.log(consulta)
	const db = await connection()
	await db.collection('inmueble').aggregate(consulta).toArray(function(err,result){
		if(err){res.send(err)}
			else{
				console.log(result)
				res.status(200).send({result})
			}
	})
})

router.post("/inmuebleJoin2",urlcodeParser,async(req,res)=>{

	let consulta=[
		{
			$lookup:{from:'inmueble', localField:'inmueble' ,foreignField:'_id', as :'Descripcion_inmueble'}
		},
		{
			$project:{id_inmueble:12,Direccion:"MANZ B CASA 3",Descripcion_inmueble:{Descripcion:1}}
		}
	]
	console.log(consulta)
	const db = await connection()
	await db.collection('inmueble').aggregate(consulta).toArray(function(err,result){
		if(err){res.send(err)}
			else{
				console.log(result)
				res.status(200).send({result})
			}
	})
})

// FACTURAS
// BUSCAR FACTURA POR DIRECCION PREDIO
router.post("/buscarPredioDireccion",urlcodeParser,async(req,res)=>{
	let busqueda={direccion:req.body.direccion}
	console.log(busqueda)
	const db=await connexion()
	await db.collection('facturas').find(busqueda).toArray(function(err,result){
	  if(err){res.send(err)}
		  else{
			  res.status(200).send({result})
			  console.log(result)
		  }
	   })
	})

// BUSCAR FACTURA POR PROPIETARIO
router.post("/buscarPredioPropietario",urlcodeParser,async(req,res)=>{
	let busqueda={idPropietario:req.body.idPropietario}
	console.log(busqueda)
	const db=await connexion()
	await db.collection('facturas').find(busqueda).toArray(function(err,result){
	  if(err){res.send(err)}
		  else{
			  res.status(200).send({result})
			  console.log(result)
		  }
	   })
	})

//MOSTRAR FACTURA TODAS LAS FACTURAS
router.post("/mostrarFacturas",urlcodeParser,async(req,res)=>{
	const db= await connexion()
	await db.collection('facturas').find().toArray(function(err,result){
		 if(err){res.send(err)}
		 console.log(result)
		 res.status(200).send({result})
	   })
	})

// GUARAR FACTURA
router.post("/guardarFactura",urlcodeParser, async(req,res,err)=>{
	const db=await connexion()
	var obj={
		idFactura:req.body.idFactura,
		direccion:req.body.direccion,
		fechaGeneracion:req.body.fechaGeneracion,
		idPropietario:req.body.idPropietario,
		primerNombre:req.body.primerNombre,
		segundoNombre:req.body.segundoNombre,
		primerApellido:req.body.primerApellido,
		segundoApellido:req.body.segundoApellido,
		fechaLimitePago:req.body.fechaLimitePago,
		ncuotas:req.body.ncuotas,
		descripcion:req.body.descripcion,
		valMes:req.body.valMes,
		totalPagar:req.body.total
		}
	console.log(obj)
	await db.collection('facturas').insertOne(obj,function(err,result){
	if(err){res.send(err)}
		else{
			res.status(200).send({save:1})
			if (res.status(200))
				{console.log('Factura almacenada')
		}
	}
	})
	})

module.exports=router