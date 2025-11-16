import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import usersRoute from "./routes/users";

dotenv.config();

const app = express();
app.use(express.json());

app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

const PORT = process.env.PORT || 4444;

app.get("/", (req, res) => {
  res.send("Welcome to Ketere Vision API");
});

app.use("/users", usersRoute);

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
