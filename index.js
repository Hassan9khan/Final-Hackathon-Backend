import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./src/db/database.js";
import userRoutes from "./src/routes/user.route.js"
import loanRoutes from "./src/routes/loan.route.js"
import categoryRoutes from "./src/routes/categories.route.js"

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("<h1>Hello World</h1>");
});

// routes
app.use("/api/v1", userRoutes);
app.use("/api/v1", loanRoutes);
app.use("/api/v1", categoryRoutes);





connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.log("mongodb connection failed ", error);
  });