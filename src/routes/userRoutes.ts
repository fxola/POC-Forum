import express from "express";
import {
  editUser,
  createUser,
  getUserByEmail,
} from "../controllers/userController";

const router = express.Router();

router.get("/:email", getUserByEmail);
router.post("/new", createUser);
router.patch("/edit/:id", editUser);

export default router;
