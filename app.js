const express = require('express');
const app = express();
const ejs = require('ejs');
const path = require('path');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const BlogPost = require('./models/BlogModel');
const { truncate, copyFile } = require('fs');


mongoose
  .connect('mongodb://localhost/cleanblog-test-db')
  .then(() => console.log('Connected!')); 



app.set("view engine", "ejs");

app.use(express.static('public/temp'));
app.use(express.urlencoded({extended:true}))
app.use(express.json())


app.get('/', async (req, res) => {
  const photos = await BlogPost.find({})
    //res.render('index', {photos: posts})
  res.render('index',
     {photos}
)});


app.get("/about", (req, res) => {
  res.render('about');
});

app.get("/add_post", (req, res) => {
  res.render('add_post');
});


let port = 3000;


app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı..`);
});


 app.post('/posts', async (req, res) => { // async - await yapısı kullanacğız.
  await BlogPost.create(req.body) ;
          // body bilgisini Photo modeli sayesinde veritabanında dökümana dönüştürüyoruz.
  res.redirect('/')
});



