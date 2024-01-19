const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const booksController = require("../controllers/booksController");
const { isAuthenticated } = require("../middlewares/auth");
router.get("/", booksController.getAllBooks);
router.get("/getBooksAdmin", booksController.getBooksAdmin);
router.get("/getAll", booksController.getAll);
router.get("/getByID/:id", booksController.getBookByID);
router.get("/books", booksController.getBookByName);
router.get("/genre/:genre_name", booksController.getBookByGenreName);
router.get("/getAllBooksFromShelf", booksController.getAllBooksFromShelf);
router.get(
  "/getAllShelvesByShelfName",
  booksController.getAllShelvesByShelfName
);
router.post("/addBook", upload.single("image"), booksController.addBook);
router.post(
  "/addToBookShelf",
  upload.single("image"),
  booksController.addToBookShelf
);
router.put("/updateBook/:id", isAuthenticated, booksController.updateBook);
router.delete("/deleteBook/:id", booksController.deleteBook);
// const Book = require("../models/book"); // Import the Book model
module.exports = router;
