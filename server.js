require("dotenv").config();
const express = require("express");
const cors = require("cors");
const dbConnection = require("./config/db");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes");
const bookRoutes = require("./routes/bookRoutes");
const emotionsRoutes = require("./routes/emotionsRoutes");
const genreRoutes = require("./routes/genreRoutes");
const quotesRoutes = require("./routes/quotesRoutes");
const emailRoutes = require("./routes/emailRoutes");

// const ratingsRoutes = require("./routes/ratingsRoutes");

const app = express();
const port = process.env.PORT;
const API_URL = process.env.API_URL;
app.use(cors());
app.use(bodyParser.json());

app.use(express.json());
app.use(express.urlencoded());

app.use("/user", userRoutes);
app.use("/books", bookRoutes);
app.use("/emotions", emotionsRoutes);
app.use("/genre", genreRoutes);
app.use("/quotes", quotesRoutes);
app.use("/email", emailRoutes);
// app.use("/ratings", ratingsRoutes);

app.listen(port, () => {
  dbConnection()
    .then(() => console.log("Connected to MongoDB!"))
    .catch((err) => console.log(err));
  console.log(`Listening on port ${port}`);
});
