import express = require('express');


const router = express.Router();

//Restaurant model
const Dishes = require('../../models/Dishes');



//----------------------------------------Routes--------------------------------//

// @routes POST api/dishes.
// Add a new dish to DB.

router.post('/', async (req, res) => {
    addDish(req, res);
})

// @routes GET api/dishes.
// GET all dishes.

router.get('/', async (req, res) => {
    const { name, ingredients, restaurant, type } = req.query;
    if (name) {
        return getDishByName(req, res, name);
    }
    if (ingredients) {
        return getDishByIngredient(req, res, ingredients);
    }
    if (restaurant && type) {
        return getDiseshByTypeAndRestaurna(req, res, type, restaurant);
    }
    else {
        getAllDishes(req, res);
    }

})

// @routes GET api/rdishes:id.
// GET single dish by id.

router.get('/:id', async (req, res) => {
    getByID(req, res);
})



// @routes DELETE api/restaurants:id.
// Delete a restaurant by id.

router.delete('/:id', async (req, res) => {
    deleteByID(req, res);
});



router.delete('/', async (req, res) => {
    const { restaurantId } = req.query
    if (restaurantId) {
        deleteByRestaurant(req, res, restaurantId);
    }
    else {
        res.status(400).json({ msg: "Missing parameters" });
    }


});



//----------------------------------------Functions--------------------------------//

async function addDish(req, res) {

    const newDish = new Dishes(req.body);
    try {
        const dishes = await newDish.save();
        if (!dishes) throw Error('Couldt add new dish!');
        res.status(200).json(dishes);

    } catch (err) {
        res.status(400).json({ msg: err })

    }

}

async function getAllDishes(req, res) {
    try {
        const dishes = await Dishes.find();
        if (!dishes) throw Error('No Items');
        res.status(200).json(dishes);

    } catch (err) {
        res.status(400).json({ msg: err })

    }

}

async function getDishByName(req, res, name) {
    try {
        const dishes = await Dishes.find({ name: name });
        if (!dishes) throw Error('No Items');
        res.status(200).json(dishes);

    } catch (err) {
        res.status(400).json({ msg: err })

    }

}

//Return dishes which contain specific ingredient/s  grouped by restaurant.

async function getDishByIngredient(req, res, ing) {

    try {
        const dishes = await Dishes.aggregate([
            { $match: { ingredients: { $regex: ".*" + ing + ".*" } } },
            {
                $group: {
                    _id: "$restaurant.name",
                    dishes: {
                        $addToSet:
                        {
                            "name": "$name",
                            "price": "$price",
                            "ingredients": "$ingredients"
                        }
                    }

                }
            }

        ]);
        if (!dishes) throw Error('No Items');
        res.status(200).json(dishes);

    } catch (err) {
        res.status(400).json({ msg: err })

    }

}


//Return all dishes of certin restaurant by type (Vegan , Vegitarian , GF) 

async function getDiseshByTypeAndRestaurna(req, res, type, restaurant) {


    try {
        const dishes = await Dishes.find({ $and: [{ 'restaurant.id': restaurant }, { icon: { $regex: ".*" + type + ".*" } }] }); //EX : "vegan-icon.svg";
        if (!dishes) throw Error('No Items');
        res.status(200).json(dishes);

    } catch (err) {
        res.status(400).json({ msg: err })

    }
}

// Delete all dishes of a spoecific restaurant
async function deleteByRestaurant(req, res, id) {

    try {
        const dish = await Dishes.deleteMany({ 'restaurant.id': id });
        if (!dish) throw Error('No Dish Found!');
        res.status(200).json({ msg: "Dish has been deleted successfully!" });
    } catch (err) {
        res.status(400).json({ msg: err });

    }


}

async function deleteByID(req, res,) {

    try {
        const dish = await Dishes.findByIdAndDelete(req.params.id);
        if (!dish) throw Error('No Post Found!');
        res.status(200).json({ msg: "Dish has been deleted successfully!" });
    } catch (err) {
        res.status(400).json({ msg: err });

    }


}

async function getByID(req, res,) {
    try {
        const dish = await Dishes.find({ _id: req.params.id });
        if (!dish) throw Error('No Items');
        res.status(200).json(dish);

    } catch (err) {
        res.status(400).json({ msg: err })

    }

}









module.exports = router;