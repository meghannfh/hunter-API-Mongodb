const express = require('express')
const app = express()
const cors = require('cors')
const MongoClient = require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectId
const path = require('path')


//Use .env file in config folder
require('dotenv').config({ path: './config/.env' });

//Using EJS for views
app.set('views', './views');
app.set("view engine", "html");

//Static folder
app.use(express.static(path.join(__dirname, 'public')));

//Handle cors error
app.use(cors())

//Body parsing
app.use(express.urlencoded({ extended: true }))
app.use(express.json());

const uri = process.env.DB_STRING

//useUnifiedTopolgy and useNewUrlParser are deprecated
MongoClient.connect(uri)
//parameter needs to be the client you're connecting to
.then(client => {
    console.log('You are connected to the HunterAPI database')
    const db = client.db('hunter-x-hunter')
    const infoCollection = db.collection('hunter-x-hunter-names')

    app.get('/', (req, res) => {
        res.sendFile('/index.html')
    })

    //Tells the server which url to send json info of all hunters
    app.get('/api/hunters', (req, res)=> {
        infoCollection.find({}).sort({ name: 1 }).toArray()
        .then(results => {
            res.json(results)
        })
        .catch(error => console.error(error)) 
    })

    //request is meant to tell the sever which url to send our json information 
    //back to the client when targeting a single hunter by name
    app.get('/api/:hunter', (req, res)=> {
        const hunterName = req.params.hunter.toLowerCase()
        infoCollection.find({name: hunterName}).toArray()
        .then(results => {
            console.log(results)
            res.json(results[0])
        })
        .catch(error => {
            console.error(error)
        })
    })
})//if you have a .then you should have a .catch to catch the error
.catch(error => console.error(error))

app.listen(process.env.PORT || PORT, () => {
    console.log(`The server is running on ${process.env.PORT || PORT}`)
})

