import db from "./db";
import { CreateUserDTO, EditUserDTO } from "../types";

export const isValidEmail = (email: string) => {
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  return emailRegex.test(email);
};

export const usernameExists = async ({
  username,
}: {
  username: string;
}): Promise<Boolean> => {
  const user = await db.user.findUnique({ where: { username } });
  if (user) return true;
  return false;
};

export const fetchUserByEmail = async ({ email }: { email: string }) => {
  const result = await db.user.findUnique({ where: { email } });
  if (!result) return;
  const { password, ...user } = result;
  return user;
};

export const saveUser = async (user: CreateUserDTO) => {
  const result = await db.user.create({ data: user });
  return result.id;
};

export const getUserById = async (id: number) => {
  const user = await db.user.findUnique({ where: { id } });
  return user;
};

export const updateUser = async (user: EditUserDTO) => {
  const result = await db.user.update({ where: { id: user.id }, data: user });
  const { password, ...rest } = result;
  const updatedUser = { ...rest };
  return updatedUser;
};

export const generatePassword = (
  firstName: string,
  lastName: string
): string => {
  const timestamp = Date.now();
  const password = `${firstName}@${timestamp}-${lastName}`;
  return password;
};
