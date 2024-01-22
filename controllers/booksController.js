const Book = require("../models/book");
const Shelf = require("../models/shelf");
const { imageUploader } = require("../extra/imageUploader");
const db = require("../config/db");
const { parseISO, format } = require('date-fns');

const formatDate = (dateString, bookId) => {
  try {
    const parsedDate = new Date(dateString);
    if (isNaN(parsedDate)) {
      console.error(`Invalid date for book ${bookId}: ${dateString}`);
      return null;
    }
    return format(parsedDate, 'yyyy-MM-dd');
  } catch (error) {
    console.error(`Error parsing date for book ${bookId}: ${dateString}`, error);
    return null;
  }
};
// const updateAllBooks = async () => {
//   try {
//     const allBooks = await Book.find();

//     // Update each book to format the publication_date
//     for (const book of allBooks) {
//       const formattedDate = formatDate(book.publication_date, book._id);
//       if (formattedDate !== null) {
//         // Update the book's publication_date
//         await Book.findByIdAndUpdate(book._id, { publication_date: formattedDate });
//       }
//     }

//     console.log('All books updated successfully.');

//   } catch (error) {
//     console.error('Error updating books:', error);
//   }
// };

// Call the function to update all books
// updateAllBooks();

const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    books.sort((a, b) => a.book_title.localeCompare(b.book_title));

    // Format the publication_date for each book
    const formattedBooks = books.map(book => ({
      ...book.toObject(),
      publication_date: formatDate(book.publication_date),
    })).filter(book => book.publication_date !== null); // Filter out books with invalid dates

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 3;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const results = {};

    if (endIndex < formattedBooks.length) {
      results.next = {
        page: page + 1,
        limit: limit,
      };
    }

    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit,
      };
    }

    results.results = formattedBooks.slice(startIndex, endIndex);
    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAll = async (req, res) => {
  try {
    const books = await Book.find();

    // Format the publication_date for each book
    const formattedBooks = books.map(book => ({
      ...book.toObject(),
      publication_date: formatDate(book.publication_date),
    })).filter(book => book.publication_date !== null); // Filter out books with invalid dates

    res.json(formattedBooks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAllShelvesByShelfName = async (req, res) => {
  try {
    const shelves = await Shelf.find().distinct("shelf_name");
    return res.status(200).json({
      success: true,
      message: "All shelves fetched successfully",
      data: shelves,
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
const getAllBooksFromShelf = async (req, res) => {
  try {
    // Assuming 'shelfName' is a query parameter specifying the shelf
    const shelfName = req.query.shelfName;

    // Build the query based on the provided shelf name
    const query = shelfName ? { shelf_name: shelfName } : {};

    // Fetch books from the Shelf collection based on the query
    const books = await Shelf.find(query);

    return res.status(200).json({
      success: true,
      message: "Books fetched successfully",
      data: books,
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
const addToBookShelf = async (req, res) => {
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
      shelf_name: req.body.shelf_name, // Assuming 'shelf_name' is a form field
      author_name: req.body.author_name, // Assuming 'author' is a form field
      book_title: req.body.book_title, // Assuming 'title' is a form field
      description: req.body.description, // Assuming 'description' is a form field
      publication_date: req.body.publication_date, // Assuming 'year' is a form field
      book_image: imageURL,
    };
    // Use the Shelf model to create the new book directly in the Shelf collection
    const newBook = await Shelf.create(newBookData);
    return res.status(200).json({
      success: true,
      message: "Book added to the shelf!",
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
// const getAllBooks = async (req, res) => {
//   try {
//     const books = await Book.find();
//     books.sort((a, b) => {
//       if (a.book_title < b.book_title) {
//         return -1;
//       }
//       if (a.book_title > b.book_title) {
//         return 1;
//       }
//       return 0;
//     });
//     const page = parseInt(req.query.page) || 1;
//     const limit = parseInt(req.query.limit) || 3;
//     const startIndex = (page - 1) * limit;
//     const endIndex = page * limit;
//     const results = {};
//     if (endIndex < books.length) {
//       results.next = {
//         page: page + 1,
//         limit: limit,
//       };
//     }
//     if (startIndex > 0) {
//       results.previous = {
//         page: page - 1,
//         limit: limit,
//       };
//     }
//     results.results = books.slice(startIndex, endIndex);
//     res.json(results);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };
// const getAll = async (req, res) => {
//   try {
//     const books = await Book.find();
//     res.json(books);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };


const getBooksAdmin = async (req, res) => {
  try {
    const books = await Book.find();

    // Organize the books by genre_name
    const booksByGenre = {};
    books.forEach((book) => {
      const genreName = book.genre_name;

      if (!genreName) {
        console.error("Genre name is undefined for a book:", book);
        return;
      }

      if (!booksByGenre[genreName]) {
        booksByGenre[genreName] = [];
      }

      // Format the publication_date using the formatDate function
      const formattedDate = formatDate(book.publication_date);

      booksByGenre[genreName].push({
        book_id: book._id.toString(),
        book_title: book.book_title,
        author_name: book.author_name,
        publisher_name: book.publisher_name,
        // Use the formatted date
        publication_date: formattedDate,
        description: book.description,
        rating: book.rating,
        book_image: book.book_image,
      });
    });

    console.log(booksByGenre);
    res.json(booksByGenre);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getBookByID = async (req, res) => {
  try {
    console.log("Received book ID:", req.params.id);
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
const getBookByGenreName = async (req, res) => {
  try {
    const genreName = req.params.genre_name;
    if (!genreName) {
      return res.status(400).json({ msg: "Genre name is required" });
    }
    const book = await Book.findOne({ genre_name: genreName });
    if (!book) {
      return res
        .status(404)
        .json({ msg: "Books not found for the given genre" });
    }
    res.json(book);
  } catch (error) {
    console.error("Error getting book by genre", error);
    res.status(500).json({ msg: "Server error" });
  }
};
const getBookByName = async (req, res) => {
  try {
    const bookName = await Title.findOne({ book_title: req.query.title });

    if (!bookName) {
      return res.status(404).json({ msg: "Book title not found" });
    }

    res.json(bookName);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
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
  const { id } = req.params;
  console.log('Received id:', id);
  const {
    book_title,
    author_name,
    genre_name,
    publisher_name,
    publication_date,
    description,
    rating,
    book_image,
  } = req.body;

  try {
    const updatedBook = await Book.findByIdAndUpdate(
      id,
      {
        book_title,
        author_name,
        genre_name,
        publisher_name,
        publication_date,
        description,
        rating,
        book_image,
      },
      { new: true } // Return the updated document
    );

    if (!updatedBook) {
      return res.status(404).json({
        success: false,
        message: `Book with id = ${id} not found.`,
      });
    }

    return res.status(200).json({
      success: true,
      message: `Book updated successfully.`,
      data: updatedBook,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: `Error while trying to update book with id ${id}.`,
      error: error.message,
    });
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
  getBooksAdmin,
  getAllBooks,
  getBookByID,
  getBookByName,
  getBookByGenreName,
  deleteBook,
  updateBook,
  addBook,
  addToBookShelf,
  getAllBooksFromShelf,
  getAllShelvesByShelfName,
  getAll,
  // updateAllBooks,
};
