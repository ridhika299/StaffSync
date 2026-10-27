require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const employeeRoutes = require("./routes/employeeRoutes");
const leaveRoutes = require("./routes/leaveRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");
const announcementRoutes = require("./routes/announcementRoutes");
const trainingRoutes = require("./routes/trainingRoutes");

const app = express();
const allowedOrigins = (process.env.CLIENT_URL || "http://localhost:5173").split(",").map(s => s.trim());
app.use(cors({ origin: (origin, cb) => !origin || allowedOrigins.includes(origin) || process.env.NODE_ENV !== "production" ? cb(null, true) : cb(new Error("CORS origin not allowed")) }));
app.use(express.json({ limit: "1mb" }));
app.get("/", (_req, res) => res.json({ message: "StaffSync HRM Backend is running!" }));
app.get("/health", (_req, res) => res.json({ status: "ok", database: mongoose.connection.readyState === 1 ? "connected" : "disconnected" }));
app.use("/api/auth", authRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/leaves", leaveRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/announcements", announcementRoutes);
app.use("/api/trainings", trainingRoutes);
app.use((err, _req, res, _next) => { console.error(err); res.status(500).json({ message: "Server error" }); });
const PORT = process.env.PORT || 8000;
async function start() {
  if (!process.env.MONGO_URI) throw new Error("MONGO_URI is missing in server/.env");
  if (!process.env.JWT_SECRET) throw new Error("JWT_SECRET is missing in server/.env");
  await mongoose.connect(process.env.MONGO_URI);
  console.log("MongoDB connected successfully");
  app.listen(PORT, () => console.log(`StaffSync API listening on port ${PORT}`));
}
start().catch(err => { console.error("Startup failed:", err.message); process.exit(1); });
