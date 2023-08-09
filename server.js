import "express-async-errors";
import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cloudinary from "cloudinary";

//routers
import jobRouter from "./routes/jobRouter.js";
import authRouter from "./routes/authRouter.js";
import userRouter from "./routes/userRouter.js";

//middleware
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware.js";
import { authenticateUser } from "./middleware/authMiddleware.js";

//public
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

//set up the public folder in root, we'll able to have some assets
//that are publicly avaliable, eventually, this is where our FE is
//going to be located, we will run build in client, and then we will
//transfer the complete project file to a public folder, and that is
//going to be the front end of our application
const __dirname = dirname(fileURLToPath(import.meta.url));
// app.use(express.static(path.resolve(__dirname, "./public")));
app.use(express.static(path.resolve(__dirname, "./client/dist")));

app.use(cookieParser());
app.use(express.json());

//將authenticate middleware 直接寫在全部的jobRoute前
app.use("/api/v1/jobs", authenticateUser, jobRouter);
app.use("/api/v1/users", authenticateUser, userRouter);
app.use("/api/v1/auth", authRouter);

// - in server.js point to index.html
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/dist", "index.html"));
});

//任何request url不符合前面的route會run 此 middleware
app.use("*", (req, res) => {
  res.status(404).json({ message: "Not Found" });
});

//任何實際得error會 run 此middleware
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

try {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(port, () => {
    console.log(`server running on PORT ${port}...`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}

// async function main() {
//   await mongoose.connect(localDB);
// }

// main()
//   .then(() => {
//     console.log("Connection Work");
//   })
//   .catch((err) => {
//     console.log(err);
//     console.log("Connection Error");
//   });
