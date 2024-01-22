// const Quote = require("../models/quotes");
// // Get all emotions
// const getAllQuotes = async (req, res) => {
//   try {
//     const quotes = await Quote.find();
//     res.json(quotes);
//   } catch (error) {
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };
// // Get an Genre by ID
// const getQuoteByID = async (req, res) => {
//   try {
//     const quote = await Quote.findById(req.params.id);

//     if (!quote) {
//       return res.status(404).json({ msg: "Quote not found" });
//     }

//     res.json(quote);
//   } catch (err) {
//     console.error(err.message);

//     if (err.kind === "ObjectId") {
//       return res.status(404).json({ msg: "Quote not found" });
//     }

//     res.status(500).send("Server Error");
//   }
// };
// const getQuoteByEmotion = async (req, res) => {
//   try {
//     const quoteName = await Quote.findOne({ emotion_name: req.query.name });

//     if (!quoteName) {
//       return res.status(404).json({ msg: "Quote not found" });
//     }

//     res.json(quoteName);
//   } catch (err) {
//     console.error(err.message);

//     if (err.kind === "ObjectId") {
//       return res.status(404).json({ msg: "Quote not found" });
//     }

//     res.status(500).send("Server Error");
//   }
// };

// //Add Seller with password hashing
// const addQuote = async (req, res) => {
//   try {
//     const { quote_text, author_of_quote, emotion_name } = req.body;
//     const newQuote = new Quote({
//       quote_text,
//       author_of_quote,
//       emotion_name,
//     });
//     await newQuote.save();
//     res.json(newQuote);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server Error");
//   }
// };

// const updateQuote = async (req, res) => {
//   const quoteId = req.params.id;
//   try {
//     const updatedQuote = await Quote.findOneAndUpdate(
//       { _id: quoteId },
//       {
//         $set: {
//           quote_text: req.body.quote_text,
//           author_of_quote: req.body.author_of_quote,
//           emotion_name: req.body.emotion_name,
//         },
//       },
//       { new: true }
//     );
//     // Check if the user was found and updated
//     if (!updatedQuote) {
//       return res.status(404).json({ msg: "Quote not found" });
//     }
//     res.json(updatedQuote);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server Error");
//   }
// };
// const deleteQuote = async (req, res) => {
//   const quoteId = req.params.id;
//   try {
//     const result = await Quote.findByIdAndDelete(quoteId);
//     if (!result) {
//       return res.status(404).json({
//         success: false,
//         message: "Quote not found",
//       });
//     }
//     res.json({
//       success: true,
//       message: "Quote deleted successfully",
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Unable to delete Quote",
//       error: error.message,
//     });
//   }
// };
// module.exports = {
//   getAllQuotes,
//   getQuoteByEmotion,
//   getQuoteByID,
//   addQuote,
//   deleteQuote,
//   updateQuote,
// };
const axios = require("axios");
const Quote = require("../models/quotes");

const API_URL = process.env.API_URL;

const getAllQuotes = async (req, res) => {
  try {
    const response = await axios.get(API_URL);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const getQuotes = async (req, res) => {
  try {
    const quotes = await Quote.find();
    res.json(quotes);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getQuoteByID = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getQuoteByEmotion = async (req, res) => {
  const { name } = req.query;
  try {
    const response = await axios.get(`${API_URL}?name=${name}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// const addQuote = async (req, res) => {
//   try {
//     const { quote_text, author_of_quote, emotion_name } = req.body;
//     const newQuote = new Quote({
//       quote_text,
//       author_of_quote,
//       emotion_name,
//     });
//     await newQuote.save();
//     res.json(newQuote);
//   } catch (error) {
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };
// const addQuote = async (req, res) => {
//   try {
//     const { quote_text, author_of_quote } = req.body;
//     const newQuote = new Quote({
//       quote_text,
//       author_of_quote,
//     });
//     await newQuote.save(); // Save to the local database
//     res.json(newQuote);
//   } catch (error) {
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };
const addQuote = async (req, res) => {
  try {
    const { quote_text, author_of_quote } = req.body;

    const newQuote = new Quote({
      quote_text,
      author_of_quote,
    });

    await newQuote.save(); // Save to the local database
    res.status(200).json({ success: true, message: "Quote added successfully" });
  } catch (error) {
    console.error("Error adding quote:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
const updateQuote = async (req, res) => {
  const quoteId = req.params.id;
  try {
    const updatedQuote = await Quote.findOneAndUpdate(
      { _id: quoteId },
      {
        $set: {
          quote_text: req.body.quote_text,
          author_of_quote: req.body.author_of_quote,
        },
      },
      { new: true }
    );
    if (!updatedQuote) {
      return res.status(404).json({ msg: "Quote not found" });
    }
    res.json(updatedQuote);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteQuote = async (req, res) => {
  const quoteId = req.params.id;
  try {
    const result = await Quote.findByIdAndDelete(quoteId);
    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Quote not found",
      });
    }
    res.json({
      success: true,
      message: "Quote deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to delete Quote",
    });
  }
};

module.exports = {
  getAllQuotes,
  getQuoteByEmotion,
  getQuoteByID,
  addQuote,
  deleteQuote,
  updateQuote,
  getQuotes,
};
