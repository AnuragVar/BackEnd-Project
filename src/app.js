import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.static("public")); //research
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser()); //research

//routes import
import userRouter from "./routes/user.routes.js";

//routes declaration
app.use("/api/v1/users", userRouter);

//https://localhost:8000/api/v1/users/register
export { app };

//body-parser is nowadays inbuilted with express
//multer is for files

//we need to configure it with such functionality, so that it can understand the encoded URL
