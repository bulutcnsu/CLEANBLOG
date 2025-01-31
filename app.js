const express = require('express');
const app = express();
const ejs = require('ejs');
const path = require('path');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const methodOverride = require('method-override');
const Schema = mongoose.Schema;
const BlogModel = require('./models/BlogModel');
const { truncate, copyFile } = require('fs');
const fs = require('fs');
const postController = require("./controllers/postController");
const pageController = require("./controllers/pageController");


mongoose
  .connect('mongodb+srv://ss:ss@cluster0.6pwy0.mongodb.net/')
  .then(() => {console.log('Connected!')})
  .catch((err) => {console.log('Hata olustu', err)})

app.set('view engine', 'ejs');

app.use(express.static('public/temp'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());
app.use(express.static('./public/'));
app.use(methodOverride('_method',{
  methods:['POST','GET']
}));

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı..`);
});



app.get('/',postController.getAllPosts);
app.get('/post/:id', postController.getPost);
app.post('/posts', postController.createPost);
app.put('/posts/:id',postController.updatePost);
app.delete('/posts/:id', postController.deletePost);


app.get('/post/edit/:id', pageController.editPost);

app.get('/about', pageController.getAboutPost );

app.get('/add_post', pageController.AddPost);





