const mongoose = require('mongoose');
const emotionSchema = new mongoose.Schema({
emotion_name: {
    type: String,
    required: true,
    unique:true,
}
});
const emotion= mongoose.model("Emotion",emotionSchema);
module.exports = emotion;

