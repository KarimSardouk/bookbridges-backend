const Genre = require("../models/genre");
// Get all emotions
const getAllGenres = async (req, res) => {
  try {
    const genres = await Genre.find();
    res.json(genres);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
// Get an Genre by ID
const getGenreByID = async (req, res) => {
  try {
    const genre = await Genre.findById(req.params.id);

    if (!genre) {
      return res.status(404).json({ msg: "Genre not found" });
    }

    res.json(genre);
  } catch (err) {
    console.error(err.message);

    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Genre not found" });
    }

    res.status(500).send("Server Error");
  }
};
const getGenreByName = async (req, res) => {
  try {
    const genreName = await Genre.findOne({ genre_name: req.query.name });

    if (!genreName) {
      return res.status(404).json({ msg: "Emotion name not found" });
    }

    res.json(genreName);
  } catch (err) {
    console.error(err.message);

    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Genre name not found" });
    }

    res.status(500).send("Server Error");
  }
};

//Add Seller with password hashing
const addGenre = async (req, res) => {
  try {
    const { genre_name} = req.body;
    // Hash the password using bcrypt
    const newGenre = new Genre({
        genre_name
    });
    await newGenre.save();
    res.json(newGenre);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

const updateGenre = async (req, res) => {
  const genreId = req.params.id;
  try {
    const updatedGenre = await Genre.findOneAndUpdate(
      { _id: genreId },
      {
        $set: {
          genre_name: req.body.genre_name,
        },
      },
      { new: true }
    );
    // Check if the user was found and updated
    if (!updatedGenre) {
      return res.status(404).json({ msg: "Genre not found" });
    }

    res.json(updatedGenre);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
const deleteGenre = async (req, res) => {
  const genreId = req.params.id;
  try {
    const result = await Genre.findByIdAndDelete(genreId);
    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Genre not found",
      });
    }
    res.json({
      success: true,
      message: "Genre deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to delete Genre",
      error: error.message,
    });
  }
};
module.exports = {
  getAllGenres,
  getGenreByID,
  getGenreByName,
  addGenre,
  deleteGenre,
  updateGenre,
};