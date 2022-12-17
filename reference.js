//    requesting a specific hunter by using the id of the hunter image that was clicked
//     renders the profile.ejs which is set up to render the image and the go back to '/'
//     button
    app.get('/hunter/:id', (req, res) => {
        const id = req.params.id
        infoCollection.find({ "_id": ObjectId(id) }).toArray()
        .then(results => {
            res.render('profile.ejs', {hunter/*this is the variable to be used in ejs and holds the result of the request*/: results[0]})
        })
    })

        // Tells the server which url to send json info of a single hunter when targeted by its id
    app.get('/api/:id', (req, res) => {
        const hunterId = req.params.id
        infoCollection.find({ "_id": ObjectId(hunterId) }).toArray()
        .then(results => {
            res.json(results[0])
        })
    })

    //     get requests need to be inside of our .then()
    // if we want our app to handle read requests then we need .get()

    // requesting all hunters and rendering on root
    // the root ejs file is then iterating through all items and displaying them
      app.get('/', (req, res) => {
        infoCollection.find().toArray()
        .then(results => {
            res.render('index.ejs', { hunters: results})
        })
        .catch(error => {
            console.error(error)
        })
      })