const express = require('express');
const app = express();
const ejs = require('ejs');
const path = require('path');


app.set("view engine", "ejs");

app.use(express.static('public/temp'));

/*app.get('/', function (req, res) {
  res.sendFile(path.resolve(__dirname, 'public/temp/index.html'));
});

*/
app.get("/", (req, res) => {
  res.render('index');
});


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
