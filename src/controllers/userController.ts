import { Request, Response } from "express";
import { CreateUserDTO } from "../types";
import {
  saveUser,
  emailExists,
  isValidEmail,
  usernameExists,
  generatePassword,
} from "../models/user";

export const createUser = async (
  req: Request<{}, {}, CreateUserDTO>,
  res: Response
) => {
  try {
    const { email, lastName, firstName, username, password } = req.body;

    if (!email || !lastName || !firstName || !username) {
      return res
        .status(400)
        .json({ error: "ValidationError", data: undefined, success: false });
    }

    const validEmail = isValidEmail(email);
    if (!validEmail) {
      return res
        .status(400)
        .json({ error: "ValidationError", data: undefined, success: false });
    }

    const emailTaken = await emailExists({ email });
    if (emailTaken) {
      return res
        .status(409)
        .json({ error: "EmailAlreadyInUse", data: undefined, success: false });
    }

    const usernameTaken = await usernameExists({ username });
    if (usernameTaken) {
      return res.status(409).json({
        error: "UsernameAlreadyTaken",
        data: undefined,
        success: false,
      });
    }

    const user: CreateUserDTO = {
      email,
      username,
      firstName,
      lastName,
      password: password || generatePassword(firstName, lastName),
    };

    const userID = await saveUser(user);

    return res.status(201).json({
      error: undefined,
      data: {
        id: userID,
        email,
        username,
        firstName,
        lastName,
      },
      success: true,
    });
  } catch (e) {
    res.json(500).json({
      error: "InternalServerError",
      success: false,
      message: "Something went wrong",
    });
  }
};

export const editUser = () => {};
export const getUserByEmail = () => {};
