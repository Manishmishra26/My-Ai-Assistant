import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/db.mjs";
import authRouter from "./routes/auth.routes.mjs";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRouter from "./routes/user.routes.mjs";

dotenv.config();

const app = express();

// ✅ CORS FIX (5173 + 5174 दोनों allow)
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "https://my-ai-assistant-cm9g.onrender.com",
    ],
    credentials: true,
  })
);

// ✅ Middleware
app.use(express.json());
app.use(cookieParser());

// ✅ Routes
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

// ✅ PORT FIX (MOST IMPORTANT)
const port = process.env.PORT || 5000;

// ✅ Start server
app.listen(port, () => {
  connectDb();
  console.log(`🚀 server started on port ${port}`);
});