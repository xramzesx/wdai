const fs = require('fs')

const { MongoClient, ServerApiVersion } = require('mongodb')

require('dotenv').config()
const { MONGO_USER, MONGO_PASSWORD, DB_NAME } = process.env

const path = require('path')
console.log(MONGO_USER, MONGO_PASSWORD)

const uri = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@cluster0.rxlo68t.mongodb.net/?retryWrites=true&w=majority`
const client = new MongoClient( 
    uri,
    { 
        useNewUrlParser: true, 
        useUnifiedTopology: true, 
        serverApi: ServerApiVersion.v1 
    }
)

// const trips = require(path.join(__dirname, 'trips-db-backup.json') )
const countries = require(path.join(__dirname, 'countries.json') )

// console.log(trips)
// client.connect(async err => {
//     const collection = client.db("test").collection("devices");

//     const insertResult = await collection.insertMany(trips)

//     client.close();
// });
  
  

const main = async () => {
    await client.connect();
    const db = client.db(DB_NAME)
    const collection = db.collection('countries')
    // console.log(countries.map( country => ({country})))

    // collection.insertMany(countries.map( country => ({country})))
    // collection.update({}, { $unset : { id : 1 }}, {multi: true})

    return 'ok'
}

main().then(console.log)