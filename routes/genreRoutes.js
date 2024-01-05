const express = require("express");
const router = express.Router();
const genresController = require("../controllers/genresController");
const { isAuthenticated } = require("../middlewares/auth");
router.get("/", genresController.getAllGenres);
router.get("/getByID/:id", genresController.getGenreByID);
router.get("/genres", genresController.getGenreByName);
router.post("/addGenre", genresController.addGenre);
router.put("/updateGenre/:id", isAuthenticated, genresController.updateGenre);
router.delete("/deleteGenre/:id", genresController.deleteGenre);
const User = require("../models/genre"); // Import the Genre model
module.exports = router;
