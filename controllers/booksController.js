const Book = require("../models/book");
const { imageUploader } = require("../extra/imageUploader");
const db = require("../config/db");

const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    books.sort((a, b) => {
 if (a.book_title < b.book_title) {
    return -1;
 }
 if (a.book_title > b.book_title) {
    return 1;
 }
 return 0;
});
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const results = {};

    if (endIndex < books.length) {
      results.next = {
        page: page + 1,
        limit: limit
      };
    }

    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit,
      };
    }

    results.results = books.slice(startIndex, endIndex);
    res.json(results);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getBookByID = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ msg: "Book not found" });
    }
    res.json(book);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Book not found" });
    }
    res.status(500).send("Server Error");
  }
};
const getBookByName = async (req, res) => {
  try {
    const bookName = await Emotion.findOne({ book_title: req.query.title });
    if (!bookName) {
      return res.status(404).json({ msg: "Book title not found" });
    }
    res.json(bookName);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Book title not found" });
    }
    res.status(500).send("Server Error");
  }
};
// const addBook = async (req, res) => {
//   try {
//     const {
//    book_title,
//    author_name,
//    genre_name,
//    publisher_name,
//    publication_date,
//    description,
//    rating,
//     } = req.body;
//     const newBook = new Book({
//       book_title,
//       author_name,
//       genre_name,
//       publisher_name,
//       publication_date,
//       description,
//       rating,
//     });
//     await newBook.save();
//     res.json(newBook);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server Error");
//   }
// };
const addBook = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Image file is required",
      });
    }

    const imageURL = await imageUploader(req);

    if (!imageURL) {
      return res.status(400).json({
        success: false,
        message: "Error uploading image",
      });
    }

    const newBookData = {
      ...req.body,
      book_image: imageURL,
    };

    const newBook = await Book.create(newBookData);

    return res.status(200).json({
      success: true,
      message: "Book added successfully",
      data: newBook,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
const updateBook = async (req, res) => {
  const bookId = req.params.id;
  try {
    const updatedBook = await Book.findOneAndUpdate(
      { _id: bookId },
      {
        $set: {
          book_title: req.body.book_title,
          author_name: req.body.author_name,
          genre_name: req.body.genre_name,
          publisher_name: req.body.publisher_name,
          publication_date: req.body.publication_date,
          description: req.body.description,
        },
      },
      { new: true }
    );
    // Check if the user was found and updated
    if (!updatedBook) {
      return res.status(404).json({ msg: "Book not found" });
    }
    res.json(updatedBook);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
const deleteBook = async (req, res) => {
  const bookId = req.params.id;
  try {
    const result = await Book.findByIdAndDelete(bookId);
    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }
    res.json({
      success: true,
      message: "Book deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to delete book",
      error: error.message,
    });
  }
};
module.exports = {
  getAllBooks,
  getBookByID,
  getBookByName,
  deleteBook,
  updateBook,
  addBook,
};
