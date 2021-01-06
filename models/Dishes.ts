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
        id: String,
        name: String,
        chef: String
    },
})

module.exports = mongoose.model('Dishes', DishSchema)