import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
const Origin = process.env.ORIGIN;
const LIMIT = "16kb";

app.use(cors({ origin: Origin, credentials: true }));
app.use(express.json({ limit: LIMIT }));
app.use(express.urlencoded({ limit: LIMIT, extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

export { app };
