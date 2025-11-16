import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import usersRoute from "./routes/users";

dotenv.config();

const app = express();
app.use(express.json());

// ✅ CORS pour ton front
const allowedOrigins = [
  "http://localhost:3000",
  "https://ketere-vision.vercel.app",   // ton front en production
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Autoriser requêtes sans origin (Postman, mobile…)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

const PORT = process.env.PORT || 4444;

app.get("/", (req, res) => {
  res.send("Welcome to Ketere Vision API");
});

app.use("/users", usersRoute);

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
