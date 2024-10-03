const router = require('express').Router()
const Post = require('../models/posts')
router.post('/createPost', async(req,res) => {
        try {
            const {title,content} = req.body
           const createPost = new Post({
               title,content,
               author:req.userId
           })
           await createPost.save()
           res.status(200).json(createPost)
        } catch (error) {
            res.status(401).json({
                "error":"Something wrong"
            })
        }
      
    })

    router.get('/editPost/:id',async (req,res) => {
        try {
            const postId = req.params.id
            const post = await Post.findById(postId)
            if(!post){
                return res.status(401).json({
                    "message":"Not found"
                })
            }
            res.status(200).json(post)
        } catch (error) {
            res.status(201).json({
                "error":"not found"
            })
        }
        
       
    })

    router.put('/updatePost/:id',async (req,res) => {
        try {
            const postId = req.params.id
            const post = await Post.findOneAndUpdate({_id:postId},req.body,{new:true})
            res.status(200).json(post)
        } catch (error) {
            res.status(201).json({
                "error":"not update happen"
            })
        }
        console.log("test update")
    })

    router.delete('/deletePost/:id',async (req,res) => {
        try {
            const postId = req.params.id
            const post = await Post.findOneAndDelete({_id:postId})
            res.status(500).json({
                "message":"Deleted Succesfully"
            })
        } catch (error) {
            res.status(201).json({
                "error":"Something wrong"
            })
        }
        console.log("test delete")
    })



module.exports = router