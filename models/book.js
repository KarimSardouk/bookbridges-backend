const mongoose = require("mongoose");
const bookSchema = new mongoose.Schema({
  book_title: {
    type: String,
    required: true,
  },
  author_name: {
    type: String,
    required: true,
  },
  genre_name: {
    type: String,
    required: true,
  },
  publisher_name: {
    type: String,
  },
  publication_date: {
    type: Date,
  },
  description: {
    type: String,
  },
  rating: {
    type: Number,
    required: true,
  },
  book_image: {
    type: String,
    required: true,
  },
});
const book = mongoose.model("Book", bookSchema);
module.exports = book;
