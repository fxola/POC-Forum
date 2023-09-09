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

import {
  EMAIL_TAKEN_ERROR,
  successResponse,
  USERNAME_TAKEN_ERROR,
  VALIDATION_ERROR,
  INTERNAL_SERVER_ERROR,
  httpcode,
  USER_NOT_FOUND_ERROR,
} from "../models/response";

export const createUser = async (
  req: Request<{}, {}, CreateUserDTO>,
  res: Response
) => {
  try {
    const { email, lastName, firstName, username, password } = req.body;

    if (!email || !lastName || !firstName || !username) {
      return res.status(httpcode.BAD_REQUEST).json(VALIDATION_ERROR);
    }

    const validEmail = isValidEmail(email);
    if (!validEmail) {
      return res.status(httpcode.BAD_REQUEST).json(VALIDATION_ERROR);
    }

    const emailTaken = await emailExists({ email });
    if (emailTaken) {
      return res.status(httpcode.CONFLICT).json(EMAIL_TAKEN_ERROR);
    }

    const usernameTaken = await usernameExists({ username });
    if (usernameTaken) {
      return res.status(httpcode.CONFLICT).json(USERNAME_TAKEN_ERROR);
    }

    const user: CreateUserDTO = {
      email,
      username,
      firstName,
      lastName,
      password: password || generatePassword(firstName, lastName),
    };

    const userID = await saveUser(user);

    const response = successResponse({
      id: userID,
      email,
      username,
      firstName,
      lastName,
    });

    return res.status(httpcode.CREATED).json(response);
  } catch (e) {
    return res.json(httpcode.SERVER_ERROR).json(INTERNAL_SERVER_ERROR);
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
      return res.status(httpcode.BAD_REQUEST).json(VALIDATION_ERROR);
    }

    const user = await getUserById(parsedId);
    if (!user) {
      return res.status(httpcode.NOT_FOUND).json(USER_NOT_FOUND_ERROR);
    }

    if (email) {
      if (!isValidEmail(email)) {
        return res.status(httpcode.BAD_REQUEST).json(VALIDATION_ERROR);
      }

      const emailTaken = await emailExists({ email });
      if (emailTaken) {
        return res.status(httpcode.CONFLICT).json(EMAIL_TAKEN_ERROR);
      }
    }

    if (username && (await usernameExists({ username }))) {
      return res.status(httpcode.CONFLICT).json(USERNAME_TAKEN_ERROR);
    }

    const update: EditUserDTO = {
      firstName: firstName || user?.firstName,
      lastName: lastName || user?.lastName,
      email: email || user?.email,
      username: username || user?.username,
      id: parsedId,
    };

    const updatedUser = await updateUser(update);
    const response = successResponse({ ...updatedUser });

    return res.status(httpcode.OK).json(response);
  } catch (e) {
    return res.json(httpcode.SERVER_ERROR).json(INTERNAL_SERVER_ERROR);
  }
};

export const getUserByEmail = () => {};
