const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator/check')
const Post = require('../models/post');

exports.getPosts = async (req, res, next) => {
  const currentPage = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize, 10) || 10;
  let totalItems = 0;
  try {
    const count = await Post.find().countDocuments();
    totalItems = count;
    lastPage = Math.ceil(totalItems/pageSize);
    const posts = await Post.find().skip((currentPage - 1) * pageSize).limit(pageSize);
    res.status(200).json({
      message: 'Posts Fetched',
      results: posts,
      nextPage: currentPage >= lastPage ? null : currentPage + 1,
      totalItems
    });
  } catch(err) {
    if(!err.status) {
      err.status = 500;
    }
    next();
  }
};

exports.getPost = async (req, res, next) => {
  const postId = req.params.postId;
  const post = await Post.findById(postId);
  try {
    if (!post) {
      const error = new Error("Couldn't find post");
      error.status = 404;
      throw error;
    }
    res.status(200).json({ message : 'Post Fetched', results: post });
  } catch(err) {
    if(!err.status) {
      err.status = 500;
    }
    next();
  }
}

exports.createPost = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed, incorrect data');
    error.status = 422;
    error.errors = errors.array();
    throw error;
  }
  if (!req.file) {
    const error = new Error('No image provided');
    error.status = 422;
    error.errors = [];
    throw error;
  }
  const imageUrl = req.file.path.replace("\\" ,"/");
  const title = req.body.title;
  const content = req.body.content;
  
  const post =  new Post({
    title,
    content,
    imageUrl,
  });
  try {
    const result = await post.save();
    res.status(201).json({
      message: 'Post created successfully!',
      post: result,
    });
  } catch(err) {
    if(!err.status) {
      err.status = 500;
    }
    next();
  }
};

exports.updatePost = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed, incorrect data');
    error.status = 422;
    error.errors = errors.array();
    throw error;
  }
  const postId = req.params.postId;
  const title = req.body.title;
  const content = req.body.content;
  let imageUrl = req.body.image;
  if (req.file) imageUrl = req.file.path;
  if (!imageUrl) {
    const error = new Error('No file picked');
    error.statusCode = 422;
    throw error;
  }
  try {
    const post = await Post.findById(postId);
    if(!post) {
      const error = new Error("Couldn't find post");
      error.status = 404;
      throw error;
    }
    if (imageUrl !== post.imageUrl) clearImage(post.imageUrl);
    post.title = title;
    post.content = content;
    post.imageUrl = imageUrl;
    const result = await post.save();
    res.status(200).json({
      message: 'Post created successfully!',
      post: result,
    });
  } catch(err) {
    if(!err.status) {
      err.status = 500;
    }
    next();
  }
}

const clearImage = (filePath) => {
  const absoluteFilePath = path.join(__dirname,'..', filePath);
  fs.unlink(absoluteFilePath, err => console.log(err));
}

exports.deletePost = async (req, res, next) => {
  const postId = req.params.postId;
  try {
    const post = Post.findById(postId);
    if(!post) {
      const error = new Error("Couldn't find post");
      error.status = 404;
      throw error;
    }
    const result = await post.delete();
    res.status(200).json({
      message: 'Post deleted successfully!',
    });
  } catch(err) {
    if(!err.status) {
      err.status = 500;
    }
    next();
  }
}