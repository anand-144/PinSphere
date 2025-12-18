import "./config/env.js"; // MUST be first

import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

import authRoutes from "./routes/authRoute.js";
import pinRoutes from "./routes/pinRoute.js";
import boardRoutes from "./routes/boardRoute.js";

app.use("/api/auth", authRoutes);
app.use("/api/pins", pinRoutes);
app.use("/api/boards", boardRoutes);

app.get("/", (req, res) => {
  res.send("PinSphere API running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
