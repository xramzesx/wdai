//// ENVIRONMENT ////

require('dotenv').config()
const { MONGO_USER, MONGO_PASSWORD, DB_NAME } = process.env

const collections = {
    trips: 'trips',
    countries: 'countries'
}

//// EXPRESSS ////

const express = require('express')
const app = express()
const port = 3000

//// MONGO ////

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb')

const uri = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@cluster0.rxlo68t.mongodb.net/?retryWrites=true&w=majority`
const client = new MongoClient( 
    uri, 
    { 
        useNewUrlParser: true, 
        useUnifiedTopology: true, 
        serverApi: ServerApiVersion.v1 
    }
)

//// UTILS /////

const asyncWrapper = (callback) => (req, res, next) => {
    callback(req, res, next).catch(next)
}


//// ROUTES ////

/// COUNTRIES ///

app.get('/countries', async ( req, res ) => {
    await client.connect()
    const db = client.db(DB_NAME)
    const collection = db.collection(collections.countries)

    const result = await collection
        .find({})
        .map(
            ({country}) => country
        ).toArray()

    client.close()
    res.json(result)
})

/// TRIPS ///

app.get('/trips', asyncWrapper( async (req, res) => {
    await client.connect()
    const db = client.db(DB_NAME)
    const collection = db.collection(collections.trips)

    const result = await collection
        .find({})
        .map( 
            item => ({ 
                ...item, 
                image : item.images[0], 
                images : undefined 
        }))
        .toArray()
    
    client.close()
    
    res.json(result)
}))

app.post('/trips', asyncWrapper ( async (req, res) => {

    res.send('siema')
}))

app.get('/trips/:id', asyncWrapper( async (req, res) => {
    await client.connect()
    const db = client.db(DB_NAME)
    const collection = db.collection(collections.trips)
    console.log(new ObjectId(req.params.id))
    const result = (await collection.findOne( { _id : new ObjectId(req.params.id) } ))

    client.close()

    if ( result === null ) {
        res.status(404).json({name : "Not found" })
    } else {
        res.json(result)
    }
}))

app.delete('/trips/:id', asyncWrapper( async (req, res) => {
    await client.connect()
    const db = client.db(DB_NAME)
    const collection = db.collection(collections.trips)

    const id = new ObjectId(req.params.id)
    
    const result = await collection.deleteOne( {_id : id} )

    client.close()

    res.json(result)

}))

/// RATES ///


app.get('/', async (req, res) => {
    res.send('Hello world')
})

app.listen( port, () => {
    console.log(`server started @ http://localhost:${port}`)
})