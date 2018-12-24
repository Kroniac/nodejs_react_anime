const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator/check')
const Post = require('../models/post');

exports.getPosts = (req, res, next) => {
  const currentPage = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize, 10) || 10;
  let totalItems = 0;
  Post.find()
    .countDocuments()
    .then((count) => {
      totalItems = count;
      lastPage = Math.ceil(totalItems/pageSize);
      return Post.find()
        .skip((currentPage - 1) * pageSize)
        .limit(pageSize)
    })
    .then((posts) => {
      res.status(200).json({
        message: 'Posts Fetched',
        results: posts,
        nextPage: currentPage >= lastPage ? null : currentPage + 1,
        totalItems
      });
    })
    .catch((err) => {
      if(!err.status) {
        err.status = 500;
      }
      next();
    })
};

exports.getPost = (req, res, next) => {
  const postId = req.params.postId;
  Post.findById(postId)
    .then((post) => {
      if(!post) {
        const error = new Error("Couldn't find post");
        error.status = 404;
        throw error;
      }
      res.status(200).json({ message : 'Post Fetched', results: post });
    })
    .catch((err) => {
      if(!err.status) {
        err.status = 500;
      }
      next();
    });
}

exports.createPost = (req, res, next) => {
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

  post.save()
    .then((result) => {
      res.status(201).json({
        message: 'Post created successfully!',
        post: result,
      });
    })
    .catch((err) => {
      if(!err.status) {
        err.status = 500;
      }
      next();
    });
};

exports.updatePost = (req, res, next) => {
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
  Post.findById(postId)
    .then((post) => {
      if(!post) {
        const error = new Error("Couldn't find post");
        error.status = 404;
        throw error;
      }
      if (imageUrl !== post.imageUrl) clearImage(post.imageUrl);
      post.title = title;
      post.content = content;
      post.imageUrl = imageUrl;
      return post.save();
    })
    .then((result) => {
      res.status(200).json({
        message: 'Post created successfully!',
        post: result,
      });
    })
    .catch((err) => {
      if(!err.status) {
        err.status = 500;
      }
      next();
    })
}

const clearImage = (filePath) => {
  const absoluteFilePath = path.join(__dirname,'..', filePath);
  fs.unlink(absoluteFilePath, err => console.log(err));
}

exports.deletePost = (req, res, next) => {
  const postId = req.params.postId;
  Post.findById(postId)
    .then((post) => {
      if(!post) {
        const error = new Error("Couldn't find post");
        error.status = 404;
        throw error;
      }
      return post.delete();
    })
    .then((result) => {
      res.status(200).json({
        message: 'Post deleted successfully!',
      });
    })
    .catch((err) => {
      if(!err.status) {
        err.status = 500;
      }
      next();
    })
}