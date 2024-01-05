const Emotion = require("../models/emotions");
// Get all emotions
const getAllEmotions = async (req, res) => {
  try {
    const emotions = await Emotion.find();
    res.json(emotions);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
// Get an Emotion by ID
const getEmotionByID = async (req, res) => {
  try {
    const emotion = await Emotion.findById(req.params.id);

    if (!emotion) {
      return res.status(404).json({ msg: "Emotion not found" });
    }

    res.json(emotion);
  } catch (err) {
    console.error(err.message);

    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Emotion not found" });
    }

    res.status(500).send("Server Error");
  }
};
const getEmotionByName = async (req, res) => {
  try {
    const emotionName = await Emotion.findOne({ emotion_name: req.query.name });

    if (!emotionName) {
      return res.status(404).json({ msg: "Emotion name not found" });
    }

    res.json(emotionName);
  } catch (err) {
    console.error(err.message);

    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Emotion name not found" });
    }

    res.status(500).send("Server Error");
  }
};

//Add Seller with password hashing
const addEmotion = async (req, res) => {
  try {
    const { emotion_name } = req.body;
    // Hash the password using bcrypt
    const newEmotion = new Emotion({
        emotion_name 
    });
    await newEmotion.save();
    res.json(newEmotion);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

const updateEmotion = async (req, res) => {
  const emotionId = req.params.id;
  try {
    const updatedEmotion = await Emotion.findOneAndUpdate(
      { _id: emotionId },
      {
        $set: {
          emotion_name: req.body.emotion_name,
        },
      },
      { new: true }
    );
    // Check if the user was found and updated
    if (!updatedEmotion) {
      return res.status(404).json({ msg: "Emotion not found" });
    }

    res.json(updatedEmotion);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
const deleteEmotion = async (req, res) => {
  const emotionId = req.params.id;
  try {
    const result = await Emotion.findByIdAndDelete(emotionId);
    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Emotion not found",
      });
    }
    res.json({
      success: true,
      message: "Emotion deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to delete Emotion",
      error: error.message,
    });
  }
};
module.exports = {
  getAllEmotions,
  getEmotionByID,
  getEmotionByName,
  deleteEmotion,
  updateEmotion,
  addEmotion,
};