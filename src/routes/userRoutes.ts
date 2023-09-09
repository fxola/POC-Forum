import express from "express";
import {
  editUser,
  createUser,
  getUserByEmail,
} from "../controllers/userController";

const router = express.Router();

router.post("/new", createUser);
router.put("/edit/:id", editUser);
router.get("/", getUserByEmail);

export default router;
