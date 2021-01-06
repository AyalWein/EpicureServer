"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var Schema = mongoose_1.default.Schema;
var DishSchema = new Schema({
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
});
module.exports = mongoose_1.default.model('Dishes', DishSchema);
