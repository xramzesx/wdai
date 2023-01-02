//// ENVIRONMENT ////

require('dotenv').config()

const { 
    MONGO_USER, 
    MONGO_PASSWORD, 
    DB_NAME, 
    JWT_SECRET, 
    REFRESH_SECRET 
} = process.env

const cookies = {
    token : {
        refresh: 'refreshToken',
        jwt : 'accessToken'
    }
}

const expires = {
    token : {
        refresh : 10 * 60 * 100,
        jwt : 2 * 60 * 100
    }
}

const collections = {
    trips: 'trips',
    countries: 'countries',
    users : 'users',
    orders : 'orders'
}

//// EXPRESSS ////

const express = require('express')

const bodyParser = require('body-parser')
const cors = require('cors')
const cookieParser = require('cookie-parser')

const app = express()
const port = 3000

app.use(cookieParser())
app.use(cors({
    origin : "http://localhost:4200",
    credentials: true,
}))
app.use(bodyParser.json())

// app.use(bodyParser.urlencoded({
//     extended: true
// }));

//// JSON WEB TOKEN ////

const jwt = require('jsonwebtoken')

const maxAge = 3 * 24 * 60 * 60
const generateToken = id => jwt.sign({id}, JWT_SECRET, { expiresIn : maxAge })

const verifyJWT = (req, res, next) => {
    try {
        let token = req.get("authorization")

        if (!token)
            return res.status(404).json({ success: false, error: "Token not found" })
        
        token = token.split(/\,? /)[1]

        const decoded = jwt.verify(token, JWT_SECRET )
        req.userId = decoded.id
        
        next()
    } catch (error) {
        return res.status(401).json({success : false, error : error.message})
    }
}

const verifyRefresh = (id, token) => {
    try {
        const decoded = jwt.verify(token, REFRESH_SECRET)
        return decoded.id === id
    } catch {
        return false
    }
}



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


//// AUTHORISATION ////


app.post('/register', async (req, res) => {

    const { nick, email, password, birthDate } = req.body

    
    //// VALIDATE INPUTS ////

    if (!email || !password || !nick )
        return res
            .status(400)
            .json({ success : false, error : "enter valid data" })


    if ( !/^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$/g.test(email))
        return res
            .status(400)
            .json({ success : false, error : "enter valid email" })

    //// CHECK WITH DB ////

    const db = client.db(DB_NAME)
    const usersCollection = db.collection(collections.users)
            
    try {
        const user = await usersCollection.findOne({ email })

        if ( user === null )
            throw new Error('user not found')

        return res
            .status(409)
            .json({ success: false, error: "this email address is already used" })

    } catch {
        const { insertedId } = await usersCollection.insertOne({
            nick,
            email,
            password,
            role : 'user',
            birthDate : new Date(birthDate),
            joinDate : new Date()
        })

        const accessToken = jwt.sign({ id : insertedId }, JWT_SECRET, {
            expiresIn : "2m"
        })

        const refreshToken = jwt.sign({ id : insertedId }, REFRESH_SECRET, {
            expiresIn: "10m"
        })

        return res.status(200).cookie(
            cookies.token.jwt, 
            accessToken,
            {
                secure: true,
                httpOnly : true,
                expires : new Date ( Date.now() + expires.token.jwt )
            }
        ).cookie(
            cookies.token.refresh, 
            refreshToken,
            {
                secure: true,
                httpOnly : true,
                expires : new Date( Date.now() + expires.token.refresh )
            }
        ).json({ accessToken, refreshToken })
    }
})

app.post('/login', async (req, res) => {
    const { email, password } = req.body

    if (!email) {
        return res
            .status(400)
            .json({ success : false, error: "enter valid credentials" })
    }

    const db = client.db(DB_NAME)
    const usersCollection = db.collection(collections.users)

    try {
        const user = await usersCollection.findOne({ email })

        if (user === null)
            throw new Error('User not found')
        console.log(user)

        //// TODO: store it as hash

        if ( user.password !== password )
            throw new Error('Invalid password')


        const accessToken = jwt.sign({ id : user._id }, JWT_SECRET, {
            expiresIn : "2m"
        })

        const refreshToken = jwt.sign({ id : user._id }, REFRESH_SECRET, {
            expiresIn: "10m"
        })

        return res.status(200).cookie(
            cookies.token.jwt, 
            accessToken,
            {
                secure: true,
                httpOnly : true,
                expires : new Date ( Date.now() + expires.token.jwt )
            }
        ).cookie(
            cookies.token.refresh, 
            refreshToken,
            {
                secure: true,
                httpOnly : true,
                expires : new Date( Date.now() + expires.token.refresh )
            }
        ).json({ accessToken, refreshToken })

    } catch {
        return res
            .status(401)
            .json({ success: false, error: "invalid username or password" })
    }
})

app.get('/logout', (req, res) => {

})


app.get('/refresh', (req, res) => {

})


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

    const getReservedSeats = async id => {
        const orders = db.collection(collections.orders)
        
        return (await(await orders
            .find({ tripId : id.toString()}))
            .toArray())
            .reduce((acc, {quantity}) => acc + quantity, 0)
    }

    const result = await collection
        .find({})
        .map( 
            item => (mapId({ 
                ...item, 
                image : item.images[0], 
                images : undefined,
        })))
        .toArray()
    
    for ( const item of result ) {
        item.quantity = item.quantity - await getReservedSeats(item.id)
    }
        
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

    const result = await collection.findOne({_id : insertedId })

    // console.log(req)

    res.send(mapId(result))
})

app.get('/trips/:id', async (req, res) => {
    const db = client.db(DB_NAME)
    const collection = db.collection(collections.trips)

    try {
        const result = (await collection.findOne( { _id : new ObjectId(req.params.id) } ))
        if (result === null)
            throw new Error('Not found')
        res.json(mapId(result))
    } catch {
        res.status(404).json({name : "Not found" })
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

app.post('/trips/rates/:id', async (req, res) => {
    const db = client.db(DB_NAME)
    const collection = db.collection(collections.trips)
    const { 
        id : userId, 
        nick, 
        name, 
        comment, 
        rate, 
        orderDate 
    } = req.body

    const response = {
        errors : [],
        rate : null
    }

    const parsed = {
        id: userId, nick, name, comment, rate, orderDate
    }

    const required = [ 'nick', 'name', 'comment', 'rate' ]

    for (const key of required ) {
        if (parsed[key] == undefined)
            response.errors.push(`'${key}' is required`)
    }

    if ( comment && comment.length < 50 )
        response.errors.push(`'comment': require minimum length : 50`)


    if ( comment && comment.length > 500 )
        response.errors.push(`'comment': require maximum length : 500`)

    if ( response.errors.length === 0 ) {
        const tripId = new ObjectId(req.params.id)
        const result = await collection.updateOne( { _id : tripId }, {$push : { rates : parsed }} )
        response.rate = parsed
    }    
    res.json(response)
})


//// ORDERS ////

app.get( '/orders/:id', async (req, res) => {
    const db = client.db(DB_NAME)
    const collection = db.collection(collections.orders)
    
    const result = await (await collection.find({ userId : req.params.id }).toArray()).map(mapId)

    for ( const order of result )
        order.trip = await db.collection(collections.trips).findOne({_id : new ObjectId(order.tripId)})
    

    res.json(result)
})


app.post( '/orders', async (req, res) => {
    const db = client.db(DB_NAME)
    const collection = db.collection(collections.orders)
    
    const { userId, tripId, quantity } = req.body
    
    const parsed = {
        userId :  userId,
        tripId : tripId,
        quantity
    }
    
    let result = await collection.findOne( { 
        userId : parsed.userId, 
        tripId: parsed.tripId 
    })

    if ( !result ) {
        const { insertedId } = await collection.insertOne( parsed )
        result = await collection.findOne( { _id : insertedId } )
    } else {
        updateResult = await collection.updateOne( { _id : result._id }, { $inc : { quantity }} )
        result = await collection.findOne( { 
            userId : parsed.userId, 
            tripId: parsed.tripId 
        })  
    }

    const trip = await db.collection(collections.trips).findOne({_id : new ObjectId(result.tripId)})
    result.trip = trip

    res.json(mapId(result))
})

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