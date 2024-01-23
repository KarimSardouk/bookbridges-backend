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
router.post(
  "/addBook",
  isAuthenticated,
  upload.single("image"),
  booksController.addBook
);
router.post(
  "/addToBookShelf",
  isAuthenticated,
  upload.single("image"),
  booksController.addToBookShelf
);
router.put(
  "/updateBook/:id",
  isAuthenticated,
  upload.single("image"),
  booksController.updateBook
);
// router.put("/updateAllBooks", booksController.updateAllBooks);
router.delete("/deleteBook/:id", isAuthenticated, booksController.deleteBook);
// const Book = require("../models/book"); // Import the Book model
module.exports = router;
