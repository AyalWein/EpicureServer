import express = require('express');


const router = express.Router();

//Chefs model
const Chefs = require('../../models/Chefs');


//----------------------------------------Routes--------------------------------//


// @routes POST api/dishes.
// Add a new Chef to DB.

router.post('/', async (req, res) => {
    addChef(req, res);
})

// @routes GET api/dishes.
// GET all chefs.

router.get('/', async (req, res) => {
    getChefs(req, res);

})

// @routes GET api/rdishes:id.
// GET single chef by id.

router.get('/:id', async (req, res) => {
    getChefById(req, res);

})


// @routes DELETE api/restaurants:id.
// Delete a chef by id.

router.delete('/:id', async (req, res) => {
    deleteChefById(req, res);
});



//----------------------------------------Functions--------------------------------//

async function getChefs(req, res) {
    try {
        const chefs = await Chefs.find();
        if (!chefs) throw Error('No Items');
        res.status(200).json(chefs);

    } catch (err) {
        res.status(400).json({ msg: err })

    }

}

async function addChef(req, res) {
    const newChef = new Chefs(req.body);
    try {
        const chef = await newChef.save();
        if (!chef) throw Error('Couldt add new chef!');
        res.status(200).json(chef);

    } catch (err) {
        res.status(400).json({ msg: err })

    }
}


async function getChefById(req, res) {
    try {
        const chef = await Chefs.find({ _id: req.params.id });
        if (!chef) throw Error('No Items');
        res.status(200).json(chef);

    } catch (err) {
        res.status(400).json({ msg: err })

    }
}

async function deleteChefById(req, res) {
    try {
        const chef = await Chefs.findByIdAndDelete(req.params.id);
        if (!chef) throw Error('No items');
        res.status(200).json({ msg: "Chef has been deleted successfully!" });
    } catch (err) {
        res.status(400).json({ msg: err });

    }

}



module.exports = router;