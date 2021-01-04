"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var router = express.Router();
//Restaurant model
var Restaurants = require('../../models/Restaurants');
// @routes POST api/restaurants.
// Add a new restaurant in DB.
router.post('/', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var newRestaurant, restuarants, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                newRestaurant = new Restaurants(req.body);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, newRestaurant.save()];
            case 2:
                restuarants = _a.sent();
                if (!restuarants)
                    throw Error('Couldt add new restaurant!');
                res.status(200).json(restuarants);
                return [3 /*break*/, 4];
            case 3:
                err_1 = _a.sent();
                res.status(400).json({ msg: err_1 });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
// @routes GET api/restaurants.
// GET all restaurants.
router.get('/', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name, chef, cuisine, restaurants, err_2, restaurants, err_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.query, name = _a.name, chef = _a.chef, cuisine = _a.cuisine;
                if (!(name || chef || cuisine)) return [3 /*break*/, 5];
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, Restaurants
                        .find({ $or: [{ name: { $regex: ".*" + name + ".*" } }, { chef: { $regex: ".*" + chef + ".*" } }, { cuisine: { $regex: ".*" + cuisine + ".*" } }] })
                        .populate('chef')];
            case 2:
                restaurants = _b.sent();
                if (!restaurants)
                    throw Error('No Items');
                res.status(200).json(restaurants);
                return [3 /*break*/, 4];
            case 3:
                err_2 = _b.sent();
                res.status(400).json({ msg: err_2 });
                return [3 /*break*/, 4];
            case 4: return [3 /*break*/, 8];
            case 5:
                _b.trys.push([5, 7, , 8]);
                return [4 /*yield*/, Restaurants.find().populate('chef')];
            case 6:
                restaurants = _b.sent();
                if (!restaurants)
                    throw Error('No Items');
                res.status(200).json(restaurants);
                return [3 /*break*/, 8];
            case 7:
                err_3 = _b.sent();
                res.status(400).json({ msg: err_3 });
                return [3 /*break*/, 8];
            case 8: return [2 /*return*/];
        }
    });
}); });
// @routes GET api/restaurants.
// GET single restaurant by id.
router.get('/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var restaurant, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, Restaurants.find({ _id: req.params.id }).populate('chef')];
            case 1:
                restaurant = _a.sent();
                if (!restaurant)
                    throw Error('No Items');
                res.status(200).json(restaurant);
                return [3 /*break*/, 3];
            case 2:
                err_4 = _a.sent();
                res.status(400).json({ msg: err_4 });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// @routes DELETE api/restaurants:id.
// Delete a restaurant by id.
router.delete('/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var retaurant, err_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, Restaurants.findByIdAndDelete(req.params.id)];
            case 1:
                retaurant = _a.sent();
                if (!retaurant)
                    throw Error('No Post Found!');
                res.status(200).json({ msg: "Resaurant has been deleted successfully!" });
                return [3 /*break*/, 3];
            case 2:
                err_5 = _a.sent();
                res.status(400).json({ msg: err_5 });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
module.exports = router;
