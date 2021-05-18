const express = require('express')
const PORT = process.env.PORT || 3000
const app = express()
const MongoClient = require('mongodb').MongoClient

// connect to mongodb
MONGO_DB_URI = 'mongodb+srv://dbUser:1029384756@cluster1.gskfs.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
// MongoClient.connect(MONGO_DB_URI, {useUnifiedTopology: true }, (err, client) => {
//     err ? console.error(err) : console.log('CONNECTED TO THE DATABASE!')
// })

// using promises instead of callbacks
MongoClient.connect(MONGO_DB_URI, {useUnifiedTopology: true })
.then(client => {
    console.log('CONNECTED TO THE DATABASE!')
    const db = client.db('star-wars-movies')
    const moviesCollection = db.collection('movies')
    
    app.set('view engine', 'ejs')
    // middlewares
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    app.use(express.static('public'))
    
    // routes
    app.get('/', (req, res) => {
        db.collection('movies').find().toArray()
        .then(movies => {
            res.render('index.ejs', { movies: movies})
        })
        .catch(error => console.error(error))
    })

    app.post('/movies', (req, res) => {
        moviesCollection.insertOne(req.body)
        .then(result => {
            res.redirect('/')
        }).catch(error => console.error(error))

    app.put('/movies', (req, res) => {
        moviesCollection.findOneAndUpdate(
            {name: 'Return Of The Jedi'},
            {
                $set: {
                    name: req.body.name,
                    movie: req.body.movie
                }
            },
           { upsert: true }
        ).then(result => {
            res.json('Success!')
        })
        .catch(error => console.error(error))
    })
    
    app.listen(PORT, () => console.log(`Server listening at localhost:${PORT}`))


})
.catch(console.error)
})
