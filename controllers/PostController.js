const Post = require('../models/PostModel.js');
const mongoose = require('mongoose');
const User = require('../models/UserModel');

exports.createPost = async(req, res) => {
    
   
    try{
        const { title, content, user_id } = req.body;
        // console.log('Creating Post:', req.body);
    
        const post = await Post.create({ title, content, user_id });
        // let data = new Post({title,content});
        // console.log("data", data)
        return res.status(200).json({
            message: "Post added",
            success: true,
            data: post,
        })
    }catch(err){
        console.log("err", err);
        return res.status(200).json({
            message: err.message,
            success: false,
        })
    }
}

exports.deletePost = async(req, res) => {
    
    try{
        const {id} = req.params;
        
        const deletePost = await Post.findByIdAndDelete(id);
        return res.status(200).json({
            message: "Data Deleted",
            success: true,
            // deletePost
        })
    }catch(err){
        console.log("err", err);
        return res.status(200).json({
            message: err.message,
            success: false,
        })
    }
} 


exports.updatePost = async(req, res) => {
    
    try{
        const {id} = req.params.id;

        const updatedPost = await Post.findByIdAndUpdate(id, {...req.body}, {new: true});
        return res.status(200).json({
            message: "Data updated successfully",
            success: true,
            updatedPost,
        })
    }catch(err){
        console.log("err", err);

        return res.status(200).json({
            message: err.message,
            success: false,
        })
    }
}

 exports.readPost = async(req, res) => {

    try{
        const {id} = req.params;
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({
                success: false,
                error: "Post does not exist",
            })
        }

        const post = await Post.findById({_id: id});
        return res.status(200).json({
            message: "success",
            success: true,
            post,
        })
    }catch(err){
        console.log("err", err);
        return res.status(200).json({
            message: err.message,
            success: false,
        })
    }
}
 
exports.readAllPost = async(req, res) => {

    try{
        const userId = req.body.user_id;
        // console.log("userid", userId);
        const allPost = await Post.find({user_id:userId}).sort({createdAt: -1})   // .populate('User');
        console.log("all post", allPost.length, allPost);

        return res.status(200).json({
            message: "success",
            success: true,
            data:allPost
        })
    }catch(err){
        console.log("err", err);

        return res.status(200).json({
            message: err.message,
            success: false,
        })
    }
}

exports.allPostByGoogleId = async(req, res) => {
    try{
       
        const email = req.body.email;
        // console.log("email google", email);
        const existingUser = await User.findOne({email});

        // console.log("existing user", existingUser);
        const id = existingUser._id;
        // console.log("id", id);
        const allPost = await Post.find({user_id:id}).sort({createdAt: -1}) 
        // console.log("all post ", allPost);

        return res.status(200).json({
            message: "Successfully login with google",
            success: true,
            data: allPost,
        })
    }catch(err){
        console.log("err", err);

        return res.status(200).json({
            message: err.message,
            success: false,
        })
    }
}
// module.exports = {readPost, createPost, deletePost, updatePost};