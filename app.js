// Import necessary modules
require("dotenv").config();
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");

// Import Gadget model
const Gadget = require("./models/gadgets");

// Import route handlers
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const gridRouter = require("./routes/grid");
const pickRouter = require("./routes/pick");
const gadgetRouter = require("./routes/gadgets");

const app = express();

// View engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// Middleware
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Connect to MongoDB
const connectionString = process.env.MONGO_CON;

mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connection to DB succeeded"))
  .catch((error) => console.error("MongoDB connection error:", error));

// Use imported routes
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/grid", gridRouter);
app.use("/selector", pickRouter);
app.use("/", gadgetRouter);

// Route to fetch gadgets
app.get("/gadgets", async (req, res) => {
  try {
    const gadgets = await Gadget.find(); // Fetch all gadgets
    const gadgetNames = gadgets.map((gadget) => gadget.gadget_name); // Extract gadget names
    res.status(200).json(gadgetNames); // Return the list of gadget names
  } catch (err) {
    console.error("Error fetching gadgets:", err);
    res.status(500).json({ message: "Failed to fetch gadgets" });
  }
});

// Route to add a new gadget
app.post("/gadgets", async (req, res) => {
  const { gadget_name, price, functionality } = req.body;

  if (!gadget_name || !price || !functionality) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const newGadget = new Gadget({ gadget_name, price, functionality });
    await newGadget.save();
    res.status(201).json({ message: "Gadget created successfully", gadget: newGadget });
  } catch (err) {
    console.error("Error creating gadget:", err);
    res.status(500).json({ message: "Failed to create gadget" });
  }
});

// Route to delete a gadget by ID
app.delete("/gadgets/:id", async (req, res) => {
  const { id } = req.params;

  // Validate ID format
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid gadget ID" });
  }

  try {
    const result = await Gadget.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ message: "Gadget not found" });
    }
    res.status(200).json({ message: "Gadget deleted successfully", gadget: result });
  } catch (err) {
    console.error("Error deleting gadget:", err);
    res.status(500).json({ message: "Failed to delete gadget" });
  }
});

// Insert gadgets into the database (useful for seeding data)
const seedGadgets = async () => {
  try {
    const existingCount = await Gadget.countDocuments();
    if (existingCount === 0) {
      const gadgets = [
        { gadget_name: "Smartphone", price: 699, functionality: "Communication" },
        { gadget_name: "Laptop", price: 1200, functionality: "Productivity" },
        { gadget_name: "Smartwatch", price: 199, functionality: "Health tracking" },
      ];
      await Gadget.insertMany(gadgets);
      console.log("Data inserted successfully!");
    } else {
      console.log("Database already contains gadgets. Skipping seeding.");
    }
  } catch (error) {
    console.error("Error inserting data:", error);
  }
};
seedGadgets();

// Error handling for unknown routes
app.use((req, res, next) => {
  next(createError(404));
});

// General error handler
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});

// Export app
module.exports = app;
