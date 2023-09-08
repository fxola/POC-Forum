import express from "express";
import userRoutes from "./routes/userRoutes";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;
app.use("/users", userRoutes);
app.use((req, res, next) =>
  next(
    res
      .status(400)
      .json({
        error: "Not Found",
        success: false,
        message: `${req.url} does not exist`,
      })
  )
);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
