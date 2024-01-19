const mongoose = require("mongoose");

const shelfSchema = new mongoose.Schema({
  shelf_name: {
    type: String,
    required: false,
  },
  book_title: {
    type: String,
  },
  author_name: {
    type: String,
  },
  genre_name: {
    type: String,
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
  },
  book_image: {
    type: String,
  },
});

const Shelf = mongoose.model("Shelf", shelfSchema);
module.exports = Shelf;
