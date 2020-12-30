import express = require('express');


const router = express.Router();

//Post model

const Posts = require('../../models/Posts');


// @routes POST api/posts.
//@desc GET all posts.

router.post('/', async (req, res) => {
    const newPost = new Posts(req.body);
    try {
        const posts = await newPost.save();
        if (!posts) throw Error('Couldt add new post!');
        res.status(200).json(posts);

    } catch (err) {
        res.status(400).json({ msg: err })

    }
})


// @routes GET api/posts.
//@desc GET all posts.

router.get('/', async (req, res) => {
    try {
        const posts = await Posts.find();
        if (!posts) throw Error('No Items');
        res.status(200).json(posts);

    } catch (err) {
        res.status(400).json({ msg: err })

    }
})


// @routes DELETE api/posts:id.
//@desc Create a post.

router.delete('/:id', async (req, res) => {


    try {
        const post = await Posts.findByIdAndDelete(req.params.id);
        if (!post) throw Error('No Post Found!');
        res.status(200).json({ msg: "post deleted!" });
    } catch (err) {
        res.status(400).json({ msg: err });

    }
});

// @routes DELETE api/posts.
//@desc DELETE a post.


module.exports = router;