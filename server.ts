import express = require('express');
import mongoose from "mongoose";



const mongoURI = 'mongodb://Ayal:I2nN0lZ9F1Uvdjf9@cluster0-shard-00-00.ezgl8.mongodb.net:27017,cluster0-shard-00-01.ezgl8.mongodb.net:27017,cluster0-shard-00-02.ezgl8.mongodb.net:27017/ayaldb?ssl=true&replicaSet=atlas-atskgr-shard-0&authSource=admin&retryWrites=true&w=majority'

//Routes

const postRoutes = require('./routes/api/posts');
const RestaurantsRoutes = require('./routes/api/restaurants');


//Connect to DB
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected!'))
    .catch(error => console.log("error connecting to DataBase"));

//User routes



// Create a new express app instance
const app: express.Application = express();

//BodyPasrser Middlware
app.use(express.json());

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.use('/api/posts', postRoutes);
app.use('/api/restaurants', RestaurantsRoutes);


app.listen(5000, function () {
    console.log('App is listening on port 5000!');
});

