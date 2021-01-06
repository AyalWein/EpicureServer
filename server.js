"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var mongoose_1 = __importDefault(require("mongoose"));
var cors = require('cors');
var cookies = require("cookie-parser");
var mongoURI = 'mongodb://Ayal:I2nN0lZ9F1Uvdjf9@cluster0-shard-00-00.ezgl8.mongodb.net:27017,cluster0-shard-00-01.ezgl8.mongodb.net:27017,cluster0-shard-00-02.ezgl8.mongodb.net:27017/ayaldb?ssl=true&replicaSet=atlas-atskgr-shard-0&authSource=admin&retryWrites=true&w=majority';
//Routes
var RestaurantsRoutes = require('./routes/api/restaurants');
var DishesRoutes = require('./routes/api/dishes');
var ChefsRoutes = require('./routes/api/chefs');
var UserRoutes = require('./routes/api/users');
//Connect to DB
mongoose_1.default.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(function () { return console.log('MongoDB connected!'); })
    .catch(function (error) { return console.log("error connecting to DataBase"); });
// Create a new express app instance
var app = express();
//BodyPasrser Middlware
app.use(express.json());
//Allow CORS:
//app.use(cors())
app.use(cors({ origin: true, credentials: true }));
//Cookies parser 
app.use(cookies());
app.get('/', function (req, res) {
    res.send('Hello World');
});
app.use('/api/v1/restaurants', RestaurantsRoutes);
app.use('/api/v1/dishes', DishesRoutes);
app.use('/api/v1/chefs', ChefsRoutes);
app.use('/api/v1/user', UserRoutes);
app.listen(5001, function () {
    console.log('App is listening on port 5001!');
});
