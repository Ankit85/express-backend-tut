import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";

dotenv.config({ path: "./env" });

const PORT = process.env.PORT || 8000;

connectDB()
  .then(() => {
    app.on("error", (error) => {
      console.log("error from app while db was connecting", error);
    });

    app.listen(PORT, () => {
      console.log("Server is listening to PORT:", PORT);
    });
  })
  .catch((error) => console.log("MONGODB connection failed:", error));
