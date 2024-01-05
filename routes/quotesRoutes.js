const express = require("express");
const router = express.Router();
const quotesController = require("../controllers/quotesController");
const { isAuthenticated } = require("../middlewares/auth");

router.get("/", quotesController.getAllQuotes);
router.get("/getAll", quotesController.getQuotes);
router.get("/getByID/:id", quotesController.getQuoteByID);
router.get("/quotes", quotesController.getQuoteByEmotion);
router.post("/addQuote", quotesController.addQuoteToDatabase); // Updated route
router.put("/updateQuote/:id", isAuthenticated, quotesController.updateQuote);
router.delete(
  "/deleteQuote/:id",
  isAuthenticated,
  quotesController.deleteQuote
);

module.exports = router;
