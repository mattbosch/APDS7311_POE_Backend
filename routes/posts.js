const router = require('express').Router()
const { Post, validatePost} = require('../models/post')
const auth = require('../middleware/auth')

//get all posts route
router.get('/', auth, async(req, res)=>{
    const posts = await Post.find()
    res.send(posts)
})

//create new posts route
router.post('/', auth, async(req, res)=>{
    const{error} = validatePost(req.body)
    if(error) return res.status(400).json(error.details[0].message)

    const post = new Post(req.body)
    await post.save()
    res.send(post)
})

//delete a post route
router.delete('/:postId', auth, async (req, res) => {
    try {
      const post = await Post.findByIdAndRemove(req.params.postId);
      
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }
      
      res.json({ message: 'Post deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error deleting post' });
    }
  });

module.exports = router
