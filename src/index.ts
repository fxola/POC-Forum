import express from "express";
import userRoutes from "./routes/userRoutes";
import dotenv from "dotenv";
import { NOT_FOUND_ERROR, httpcode } from "./models/response";

const PORT = process.env.PORT || 3000;

dotenv.config();
const app = express();

app.use(express.json());
app.use("/users", userRoutes);

app.use((req, res, next) =>
  next(res.status(httpcode.NOT_FOUND).json(NOT_FOUND_ERROR(req.url)))
);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
