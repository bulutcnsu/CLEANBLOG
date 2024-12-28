const BlogModel = require('../models/BlogModel');
const fs = require('fs');


exports.getAboutPost = (req, res) => {
  res.render('about');
};

exports.AddPost = (req, res) => {
  res.render('add_post');
};

exports.editPost =  async (req, res) => {
  const postInfo = await BlogModel.findOne({ _id: req.params.id });
  res.render('edit', {
    postInfo,
  });};
