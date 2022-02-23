var express = require('express');
var router = express.Router();
const postController = require('../controllers/PostController');
const authToken = require("../middleware/authMiddleware");

/* GET home page. */
router.get('/', authToken, postController.getAllPosts);
router.post('/create-post', authToken, postController.createPost);
router.get('/get-post/:id', authToken, postController.getPost);
router.post('/update-post', authToken, postController.updatePost);
router.delete('/delete-post/:id', authToken, postController.deletePost);


module.exports = router;
