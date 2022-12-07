const {MongoClient}=require('mongodb')
const dbName='Sprint_2_c4'
const url='mongodb://127.0.0.1:27017'
const client=new MongoClient(url,{
useUnifiedTopology:true
})

module.exports=async()=>{
await client.connect()
console.log(client.connect())
return client.db(dbName)
}