const { validationResult } = require('express-validator/check')
const Post = require('../models/post');

exports.getPosts = (req, res, next) => {
  res.status(200).json({
    posts: [{
      _id: 1, title: 'First Post', content: 'This is the first post!'
    }],
  });
};

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