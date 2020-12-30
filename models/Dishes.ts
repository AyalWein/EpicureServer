import mongoose from "mongoose";
const Schema = mongoose.Schema;

const DishSchema = new Schema({
    icon: {
        type: String,
    },
    img: {
        type: String,
    },
    ingredients: {
        type: String,
    },
    name: {
        type: String,
    },
    price: {
        type: Number,
    },
    rating: {
        type: Number,
    },
    restaurant: {
        type: String,
    },
})

module.exports = mongoose.model('Restaurants', DishSchema)