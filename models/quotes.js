const mongoose = require("mongoose");
const quoteSchema = new mongoose.Schema({
  quote_text: {
    type: String,
    required: true,
  },
  author_of_quote: {
    type: String,
    required: true,
  },
  emotion_name: {
    type: String,
  },
  theme_name:{
    type: String,
  }
});
const Quote = mongoose.model("Quote", quoteSchema);
module.exports = Quote;