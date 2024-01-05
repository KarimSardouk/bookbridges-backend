const express = require("express");
const router = express.Router();
const emotionsController = require("../controllers/emotionsController");
const { isAuthenticated } = require("../middlewares/auth");
router.get("/", emotionsController.getAllEmotions);
router.get("/getByID/:id", emotionsController.getEmotionByID);
router.get("/emotions", emotionsController.getEmotionByName);
router.post("/addEmotion", emotionsController.addEmotion); 
router.put("/updateEmotion/:id", isAuthenticated, emotionsController.updateEmotion);
router.delete("/deleteEmotion/:id", emotionsController.deleteEmotion);
const Emotion = require("../models/emotions"); // Import the Emotion model
module.exports = router;
