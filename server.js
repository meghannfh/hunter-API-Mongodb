const express = require('express')
const app = express()
const cors = require('cors')
const MongoClient = require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectId


//Use .env file in config folder
require('dotenv').config({ path: './config/.env' });

//Using EJS for views
app.set('views', './views');
app.set("view engine", "ejs");

//Static folder
app.use(express.static('/public'))

//Handle cors error
app.use(cors())

//Body parsing
app.use(express.urlencoded({ extended: true }))
app.use(express.json());

//useUnifiedTopolgy and useNewUrlParser are deprecated
MongoClient.connect(process.env.DB_STRING, {useUnifiedTopology:true, useNewUrlParser: true})
//parameter needs to be the client you're connecting to
.then(client => {
    console.log('You are connected to the HunterAPI database')
    const db = client.db('hunter-x-hunter')
    const infoCollection = db.collection('hunter-x-hunter-names')
    //get requests need to inside of our .then()
    //if we want our app to handle read requests then we need .get()

    //requesting all hunters and rendering on root
    //the root ejs file is then iterating through all items and displaying them
    //   app.get('/', (req, res) => {
    //     infoCollection.find().toArray()
    //     .then(results => {
    //         res.render('index.ejs', { hunters: results})
    //     })
    //     .catch(error => {
    //         console.error(error)
    //     })
    //   })

    app.get('/', (req, res) => {
        res.render('index.html')
    })

    //requesting a specific hunter by using the id of the hunter image that was clicked
    //renders the profile.ejs which is set up to render the image and the go back to '/'
    //button
    app.get('/hunter/:id', (req, res) => {
        const id = req.params.id
        infoCollection.find({ "_id": ObjectId(id) }).toArray()
        .then(results => {
            res.render('profile.ejs', {hunter/*this is the variable to be used in ejs and holds the result of the request*/: results[0]})
        })
    })

    //Tells the server which url to send json info of all hunters
    app.get('/api/hunters', (req, res)=> {
        infoCollection.find({}).sort({ name: 1 }).toArray()
        .then(results => {
            res.json(results)
        })
        .catch(error => console.error(error)) 
    })

    //Tells the server which url to send json info of a single hunter when targeted by its id
    app.get('/api/:id', (req, res) => {
        const hunterId = req.params.id
        infoCollection.find({ "_id": ObjectId(hunterId) }).toArray()
        .then(results => {
            res.json(results[0])
        })
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
        .catch(error => console.error(error))
        if(hunters[hunterName]){
            res.json(hunters[hunterName])
        }else {
            res.json(hunters["hunter not found"])
        }  
    })
})//if you have a .then you should have a .catch to catch the error
.catch(error => console.error(error))

app.listen(process.env.PORT || PORT, () => {
    console.log(`The server is running on ${process.env.PORT || PORT}`)
})

