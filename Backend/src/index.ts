import express from "express";
import cors from "cors";
import dpconnection from "./config/db";
const app = express();
import "dotenv/config";

import { APP_ORIGIN, PORT } from "./constants/env";
import cookieParser from "cookie-parser";
import errorHandler from "./middleware/errorHandler";
import catchErrors from "./utils/catchErrors";
import { OK } from "./constants/http";
import authRoutes from "./routes/auth.route";
import authenticate from "./middleware/authenticate";
import userRoutes from "./routes/user..route";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: APP_ORIGIN,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());

app.get(
  "/",
  catchErrors(async (req, res, next) => {
    res.status(OK).json({
      message: "Healthy!",
    });
  })
);
app.use("/auth",authRoutes)
app.use("/user",authenticate,userRoutes)
app.use(errorHandler); // Error handling middleware
app.listen(PORT, async () => {
  console.log("Server is running on port " + PORT);
  console.log("Environment: " + process.env.NODE_ENV);
  await dpconnection(); // Ensure the database connection is established before starting the server
});
