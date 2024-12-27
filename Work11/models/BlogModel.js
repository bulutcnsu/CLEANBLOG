const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const BlogSchema = new Schema({
    title: String,
    detail: String,
    image: String,
    dateCreated: {
      type: Date,
      default: Date.now,
    },
  });

  const BlogModel = mongoose.model('posts', BlogSchema); // the fir5st paraameter is collection name of database
  module.exports = BlogModel;