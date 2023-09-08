import { Request, Response } from "express";
import { CreateUserDTO, EditUserDTO } from "../types";
import {
  saveUser,
  emailExists,
  isValidEmail,
  usernameExists,
  generatePassword,
  getUserById,
  updateUser,
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
    return res.json(500).json({
      error: "InternalServerError",
      success: false,
      message: "Something went wrong",
    });
  }
};

export const editUser = async (
  req: Request<{ id: string }, {}, EditUserDTO>,
  res: Response
) => {
  try {
    const { id } = req.params;
    const { email, firstName, lastName, username } = req.body;
    const parsedId = Number(id);

    if (!parsedId) {
      return res
        .status(400)
        .json({ error: "ValidationError", data: undefined, success: false });
    }

    const user = await getUserById(parsedId);
    if (!user) {
      return res
        .status(404)
        .json({ error: "UserNotFound", data: undefined, success: false });
    }

    if (email) {
      if (!isValidEmail(email)) {
        return res
          .status(400)
          .json({ error: "ValidationError", data: undefined, success: false });
      }

      const emailTaken = await emailExists({ email });
      if (emailTaken) {
        return res.status(409).json({
          error: "EmailAlreadyInUse",
          data: undefined,
          success: false,
        });
      }
    }

    if (username && (await usernameExists({ username }))) {
      return res.status(409).json({
        error: "UsernameAlreadyTaken",
        data: undefined,
        success: false,
      });
    }

    const update: EditUserDTO = {
      firstName: firstName || user?.firstName,
      lastName: lastName || user?.lastName,
      email: email || user?.email,
      username: username || user?.username,
      id: parsedId,
    };

    const updatedUser = await updateUser(update);

    return res
      .status(200)
      .json({ data: { ...updatedUser }, success: true, error: undefined });
  } catch (e) {
    return res.json(500).json({
      error: "InternalServerError",
      success: false,
      message: "Something went wrong",
    });
  }
};

export const getUserByEmail = () => {};
