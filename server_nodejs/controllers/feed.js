const { validationResult } = require('express-validator/check')
const Post = require('../models/post');

exports.getPosts = (req, res, next) => {
  Post.find()
    .then((posts) => {
      res.status(200).json({ message: 'Posts Fetched', results: posts });
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
        const error = new Error('Validation failed, incorrect data');
        error.status = 404;
        throw error;
      }
      res.status(200).json({ message : 'Post Fetched', data: post });
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
  const title = req.body.title;
  const content = req.body.content;
  
  const post =  new Post({
    title,
    content,
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