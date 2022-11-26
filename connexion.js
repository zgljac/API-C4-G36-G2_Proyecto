const {MongoClient}=require('mongodb')

//nombre de la DB

const dbName='Sprint_2_C4'
const url='mongodb://127.0.0.1:27017'
//localhost se usa este comando antes de la version 17

const client=new MongoClient(url,{
useUnifiedTopology:true
})

module.exports=async()=>{
await client.connect()
console.log(client.connect())
return client.db(dbName)

}