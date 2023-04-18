const express = require('express')
const router = express.Router()
const Post = require('../models/post')

//Get all posts
router.get('/', async(req, res) => {
    try{
        const posts = await Post.find()
        res.json(posts)
    }catch (err){
        res.ststus(500).json({message: err})
    }
})

//Make a post
router.post('/', async(req, res) => {
    const post = new Post({
        title: req.body.title,
        description: req.body.description
    })
    try{
        const newPost = await post.save()
        res.status(201).json(newPost)
    }catch (error) {res.status(400).json({message: error.message})}
})

//Get a specific post
router.get('/:id', async(req,res) => {
    try{
        const post = await Post.findById(req.params.id)
        res.status(200).json(post)
    }catch (err) {
        res.status(404).json({message: err})
    }
})

//Delete a specific post
router.delete('/:id', async(req,res) => {
    try{
        const deletedPost = await Post.deleteOne({_id: req.params.id})
        res.status(200).json({message:"You have successfully deleted this post"})
    }catch (err) {
        res.status(500).json({message: err})
    }
});

//Update a specific post
router.patch('/:id', async(req, res) => {
    try{
        const updatedPost = await Post.updateOne({_id: req.params.id}, {$set: {title: req.body.title}})
        res.status(200).json(updatedPost)
    }catch (err){
        res.status(400).json({message: err})
    }
})

module.exports = router;