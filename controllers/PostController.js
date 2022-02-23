const { Post } = require('../models/Post');
const { handleErrors } = require('../utils/handleError');

const createPost = async (req, res, next) => {
    const data = req.body;
    let post = await new Post({
        title: data.title,
        desc: data.desc,
    });    
    console.log(post);
    try{
        post = await post.save();
        res.status(200).send({ msg :'Post created succesfully', err : null, status : true, data : post });
    }catch(err){
        handleErrors(req,res,err);
    }

}
const getAllPosts = async (req, res, next) => {
    try{
        post = await Post.find({});
        res.status(200).send({ msg :'Post data', err : null, status : true, data : post });
    }catch(err){
        handleErrors(req,res,err);
    }

}   
const getPost = async (req, res, next) => {
    try{
        post = await Post.findOne({_id : req.params.id});
        res.status(200).send({ msg :'Post data', err : null, status : true, data : post });
    }catch(err){
        handleErrors(req,res,err);
    }
    
}
const updatePost = async (req, res, next) => {
    const params = {
        title : req.body.title,
        desc : req.body.desc,
    }
    try{
        let post = await Post.findByIdAndUpdate(req.body._id, params);   
        res.status(200).send({ msg :'Post update successfully', err : null, status : true, data : post });
    }catch(err){
        handleErrors(req,res,err);
    }

}

const deletePost = async (req, res, next) => {
    try{
        post = await Post.findByIdAndDelete({_id : req.params.id});
        res.status(200).send({ msg :'Post deleted successfully', err : null, status : true, data : post });
    }catch(err){
        handleErrors(req,res,err);
    }
    
}


module.exports = {
    getAllPosts,
    createPost,
    updatePost,
    deletePost,
    getPost
}
