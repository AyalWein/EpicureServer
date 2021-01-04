import mongoose from "mongoose";
const RestaurantSchema = require('./Restaurants');
const Schema = mongoose.Schema;

const ChefSchema = new Schema({
    first_name: {
        type: String,
    },
    last_name: {
        type: String,
    },
    description: {
        type: String,
    },
    img: {
        type: String,
    },
    rating: {
        type: Number,
    },
    restaurants: [String], //TODO : change to [RestaurantSchema]
})

module.exports = mongoose.model('Chefs', ChefSchema)