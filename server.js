"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var mongoose_1 = __importDefault(require("mongoose"));
var mongoURI = 'mongodb://Ayal:I2nN0lZ9F1Uvdjf9@cluster0-shard-00-00.ezgl8.mongodb.net:27017,cluster0-shard-00-01.ezgl8.mongodb.net:27017,cluster0-shard-00-02.ezgl8.mongodb.net:27017/ayaldb?ssl=true&replicaSet=atlas-atskgr-shard-0&authSource=admin&retryWrites=true&w=majority';
//Routes
var postRoutes = require('./routes/api/posts');
var RestaurantsRoutes = require('./routes/api/restaurants');
//Connect to DB
mongoose_1.default.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(function () { return console.log('MongoDB connected!'); })
    .catch(function (error) { return console.log("error connecting to DataBase"); });
//User routes
// Create a new express app instance
var app = express();
//BodyPasrser Middlware
app.use(express.json());
app.get('/', function (req, res) {
    res.send('Hello World!!!');
});
app.use('/api/posts', postRoutes);
app.use('/api/restaurants', RestaurantsRoutes);
app.listen(5001, function () {
    console.log('App is listening on port 5001!');
});
