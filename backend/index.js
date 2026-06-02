const express = require('express'); 
const app = express(); 
const cors = require('cors'); 
const mongoose = require("mongoose");
require('dotenv').config();
const users = require("./routes/user.js") 
const books = require("./routes/books.js")
const admin = require("./routes/admin.js")
const librarian = require("./routes/librarian.js")
const home = require("./routes/home.js")

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://library-management-ytl3.vercel.app/",
];

console.log("CORS CONFIG LOADED");
app.use(express.json()); // Parse JSON
app.use(cors());
app.use("/users",users);
app.use("/books",books);
app.use("/admin",admin);
app.use("/librarian",librarian);
app.use("/home",home);

app.get("/", (req, res) => {
    res.send("API is running...");
  });
  
  const PORT = process.env.PORT || 5000;
const uri = process.env.MONGO_URI;

if (!uri || uri === 'your_mongodb_connection_string') {
  console.error('Missing or invalid MONGO_URI in .env. Set MONGO_URI to a valid MongoDB connection string.');
  process.exit(1);
}

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("DB Connected");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err.message);
  });