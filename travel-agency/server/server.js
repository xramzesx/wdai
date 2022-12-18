//// ENVIRONMENT ////

require('dotenv').config()
const { MONGO_USER, MONGO_PASSWORD, DB_NAME } = process.env

const collections = {
    trips: 'trips',
    countries: 'countries',
    users : 'users'
}

//// EXPRESSS ////

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const port = 3000

app.use(cors())
app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({
//     extended: true
// }));

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

const mapId = item => ({ ...item, _id : undefined, id: item._id  })

//// ROUTES ////

app.all('/*', (req, res, next) => {
    console.log(req.url, new Date())
    next()
})

/// COUNTRIES ///

app.get('/countries', async ( req, res ) => {
    const db = client.db(DB_NAME)
    const collection = db.collection(collections.countries)

    const result = await collection
        .find({})
        .map(
            ({country}) => country
        ).toArray()

    res.json(result)
})

/// TRIPS ///

app.get('/trips', async (req, res) => {
    const db = client.db(DB_NAME)
    const collection = db.collection(collections.trips)

    const result = await collection
        .find({})
        .map( 
            item => (mapId({ 
                ...item, 
                image : item.images[0], 
                images : undefined 
        })))
        .toArray()
    
    res.json(result)
})

app.post('/trips', async (req, res) => {
    const db = client.db(DB_NAME)
    const collection = db.collection(collections.trips)
    const { name, country, description, images, price, quantity, date } = req.body

    const parsed = {
        name, country, description, images, price, quantity, date, rates : []
    }

    const { insertedId } = await collection.insertOne( parsed )
    console.log(insertedId)
    const result = await collection.findOne({_id : insertedId })

    // console.log(req)

    res.send(mapId(result))
})

app.get('/trips/:id', async (req, res) => {
    const db = client.db(DB_NAME)
    const collection = db.collection(collections.trips)

    const result = (await collection.findOne( { _id : new ObjectId(req.params.id) } ))

    if ( result === null ) {
        res.status(404).json({name : "Not found" })
    } else {
        res.json(mapId(result))
    }
})

app.delete('/trips/:id', async (req, res) => {
    const db = client.db(DB_NAME)
    const collection = db.collection(collections.trips)

    const id = new ObjectId(req.params.id)
    
    const result = await collection.deleteOne( {_id : id} )
    
    res.json(result)
})

/// RATES ///

app.get('/', async (req, res) => {
    res.send('Hello world')
})

const setupServer = async () => {
    // single database connection for all requests
    await client.connect()

    app.listen( port, () => {
        console.log(`server started @ http://localhost:${port}`)
    })    
}

setupServer().catch( e => {
    console.error("An error occur: ", e)
    console.log('Server stopped')
})