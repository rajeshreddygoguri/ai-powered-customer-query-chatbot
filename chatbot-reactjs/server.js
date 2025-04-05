import express from "express";
import mongoose from "mongoose";
import cors from "cors";
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect("mongodb+srv://Rajesh:12345@cluster0.wqpsi.mongodb.net/companyinfo")
  .then(() => console.log(" Connected to MongoDB Atlas"))
  .catch((err) => console.error("Connection error:", err));

// Define schema (Allow flexible structure)
const Details = mongoose.model("Details", new mongoose.Schema({}, { strict: false }));

// API route to fetch company info
app.get("/api/company-info", async (req, res) => {
  try {
    const data = await Details.find();
    console.log(` Total Documents Found: ${data.length}`);

    if (data.length === 0) {
      return res.json({ message: "No company information available." });
    } else {
      return res.json( { message: data[0].content });
    }
  } catch (error) {
    console.error(" Error fetching data:", error);
    res.status(500).json({ message: "Error fetching company information." });
  }
});

// Start the server
app.listen(PORT, () => console.log(` Server running on http://localhost:${PORT}`));
