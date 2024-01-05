const mongoose = require('mongoose');
const ratingsSchema = new mongoose.Schema({
book_id: {
    type: string,
    required: true,
},
rating_value:{
    type: Date,
    required: true,
}
});
const rating= mongoose.model("Rating",ratingsSchema);
module.exports = rating;

