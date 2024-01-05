const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const booksController = require("../controllers/booksController");
const { isAuthenticated } = require("../middlewares/auth");
router.get("/", booksController.getAllBooks);
router.get("/getByID/:id", booksController.getBookByID);
router.get("/books", booksController.getBookByName);
router.post("/addBook", upload.single("image"), booksController.addBook);
router.put("/updateBook/:id", isAuthenticated, booksController.updateBook);
router.delete("/deleteBook/:id", booksController.deleteBook);
// const Book = require("../models/book"); // Import the Book model
module.exports = router;
