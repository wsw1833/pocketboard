// app.js
const express = require("express");
const app = express();
const port = process.env.PORT || 3001;
const userRoutes = require("./routes/users");
const connectToDatabase = require("./db");

app.use(express.json());
var cors = require("cors");
app.use(cors({ origin: true, credentials: true }));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the API" });
});

app.use("/user", userRoutes);

(async () => {
  try {
    await connectToDatabase();
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to start the server:", error.message);
  }
})();
