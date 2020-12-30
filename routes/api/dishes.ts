import express = require('express');


const router = express.Router();

//Restaurant model
const Dishes = require('../../models/Dishes');


// @routes POST api/dishes.
// Add a new dish to DB.

router.post('/', async (req, res) => {
    const newDish = new Dishes(req.body);
    try {
        const dishes = await newDish.save();
        if (!dishes) throw Error('Couldt add new dish!');
        res.status(200).json(dishes);

    } catch (err) {
        res.status(400).json({ msg: err })

    }
})

// @routes GET api/dishes.
// GET all dishes.

router.get('/', async (req, res) => {
    try {
        const dishes = await Dishes.find();
        if (!dishes) throw Error('No Items');
        res.status(200).json(dishes);

    } catch (err) {
        res.status(400).json({ msg: err })

    }
})

// @routes GET api/rdishes:id.
// GET single dish by id.

router.get('/:id', async (req, res) => {
    try {
        const dish = await Dishes.find({ _id: req.params.id });
        if (!dish) throw Error('No Items');
        res.status(200).json(dish);

    } catch (err) {
        res.status(400).json({ msg: err })

    }
})


// @routes DELETE api/restaurants:id.
// Delete a restaurant by id.

router.delete('/:id', async (req, res) => {

    try {
        const dish = await Dishes.findByIdAndDelete(req.params.id);
        if (!dish) throw Error('No Post Found!');
        res.status(200).json({ msg: "Dish has been deleted successfully!" });
    } catch (err) {
        res.status(400).json({ msg: err });

    }
});


module.exports = router;