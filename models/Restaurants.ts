import mongoose from "mongoose";
const Schema = mongoose.Schema;

const RestaurantSchema = new Schema({
    chef: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chefs'
    },
    cuisine: {
        type: String,
    },
    homePage: {
        type: String,
    },
    img: {
        type: String,
    },
    maniImg: {
        type: String,
    },
    name: {
        type: String,
    },
    rating: {
        type: Number,
    },
})

module.exports = mongoose.model('Restaurants', RestaurantSchema)