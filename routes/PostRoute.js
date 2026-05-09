const express = require('express');

const router = express.Router();
const postControllers = require('../controllers/PostController');
const auth = require('../middlewares/Auth');

router.post('/addPost', postControllers.createPost );
router.post('/allPost',  postControllers.readAllPost);
router.get('/:id', postControllers.readPost);
router.put('/:id', postControllers.updatePost);
router.delete('/:id', postControllers.deletePost);

router.post('/allPostByGoogleId', postControllers.allPostByGoogleId)


module.exports = router;