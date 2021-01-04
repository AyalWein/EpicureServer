"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var Schema = mongoose_1.default.Schema;
var RestaurantSchema = new Schema({
    chef: {
        type: mongoose_1.default.Schema.Types.ObjectId,
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
});
module.exports = mongoose_1.default.model('Restaurants', RestaurantSchema);
