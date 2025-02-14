const BlogModel = require('../models/BlogModel');
const fs = require('fs');
const { truncate, copyFile } = require('fs');
const fileUpload = require('express-fileupload');

exports.getAllPosts = async (req, res) => {
  const _posts = (await BlogModel.find({})).reverse();
  //res.render('index', {photos: posts})
  res.render('index', { _posts });
};

exports.getPost = async (req, res) => {
  //console.log(req.params.id);
  const postInfo = await BlogModel.findById(req.params.id);
  res.render('post', { postInfo });
};

exports.createPost = (req, res) => {
  let uploadPath = '../CleanBlog/public/uploads/';
  let sampleFile = req.files.image;

  if (!fs.existsSync(uploadPath)) {
    // Bunun için const fs = require('fs'); almamız gerekir.
    fs.mkdirSync(uploadPath);
  }

  uploadPath = '../CleanBlog/public/uploads/' + sampleFile.name;
  console.log(" foto bilgileri : ",sampleFile);
  console.log( uploadPath);

  sampleFile.mv(uploadPath, async () => {
    await BlogModel.create({
      ...req.body,
      image: '/uploads/' + sampleFile.name,
    });
    res.redirect('/');
  });
};

exports.updatePost = async (req, res) => { //db posts collection dan ilgili id yi ceker
    const postInfo = await BlogModel.findOne({ _id: req.params.id });
    postInfo.title = req.body.title;
    postInfo.detail = req.body.detail;
    postInfo.save();
    res.redirect(`/post/${req.params.id}`); // post ejs. template ine yuonlendirir.
  };

  exports.deletePost = async (req, res) => {
 
    const postInfo = await BlogModel.findOne({ _id: req.params.id });
    let deletedImage =  '../CleanBlog/public' + postInfo.image;
    console.log(deletedImage);
       //if(postInfo.image !== null){ }
    fs.unlinkSync(deletedImage);
    //await BlogModel.findOneAndDelete({"image":  "deletedImage"});
    await BlogModel.findByIdAndDelete(req.params.id);
    res.redirect('/'); 
  };