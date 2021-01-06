import express = require('express');



const router = express.Router();

//Restaurant model
const Restaurants = require('../../models/Restaurants');


// @routes POST api/restaurants.
// Add a new restaurant in DB.

router.post('/', async (req, res) => {
    const newRestaurant = new Restaurants(req.body);
    try {
        const restuarants = await newRestaurant.save();
        if (!restuarants) throw Error('Couldt add new restaurant!');
        res.status(200).json(restuarants);

    } catch (err) {
        res.status(400).json({ msg: err })

    }
})


// @routes GET api/restaurants.
// GET all restaurants.

router.get('/', async (req, res) => {
    const { name, chef, cuisine } = req.query;

    if (name || chef || cuisine) {
        console.log("name : " + name + " " + "chef : " + chef + " " + "cuisine: " + cuisine);

        try {
            const restaurants = await Restaurants.find({ $or: [{ name: { $regex: ".*" + name + ".*" } }, { cuisine: { $regex: ".*" + cuisine + ".*" } }] }).populate('chef')
            if (!restaurants) throw Error('No Items');
            res.status(200).json(restaurants);

        } catch (err) {
            res.status(400).json({ msg: err })

        }

    }

    else {

        try {
            const restaurants = await Restaurants.find().populate('chef');
            if (!restaurants) throw Error('No Items');
            res.status(200).json(restaurants);

        } catch (err) {
            res.status(400).json({ msg: err })

        }
    }
})

// @routes GET api/restaurants.
// GET single restaurant by id.

router.get('/:id', async (req, res) => {
    try {
        const restaurant = await Restaurants.find({ _id: req.params.id }).populate('chef');
        if (!restaurant) throw Error('No Items');
        res.status(200).json(restaurant);

    } catch (err) {
        res.status(400).json({ msg: err })

    }
})

// @routes DELETE api/restaurants:id.
// Delete a restaurant by id.

router.delete('/:id', async (req, res) => {

    try {
        const retaurant = await Restaurants.findByIdAndDelete(req.params.id);
        if (!retaurant) throw Error('No Post Found!');
        res.status(200).json({ msg: "Resaurant has been deleted successfully!" });
    } catch (err) {
        res.status(400).json({ msg: err });

    }
});

router.put('/', async (req, res) => {
    const { chef, restaurantId } = req.query;

    if (chef && restaurantId) {
        updateChef(req, res, chef, restaurantId)

    }
});



//----------------------------------------Functions--------------------------------//


//Update restaurants chef

async function updateChef(req, res, chef, restaurantId) {


    const filter = { _id: restaurantId };
    const update = { chef: chef };
    try {
        const retaurant = await Restaurants.findOneAndUpdate(filter, update, {
            returnOriginal: false
        });
        if (!retaurant) throw Error("Coudnt't make updates");
        res.status(200).json({ msg: "Updete completed succesfuly" });
    } catch (err) {
        res.status(400).json({ msg: err });

    }
}


module.exports = router;