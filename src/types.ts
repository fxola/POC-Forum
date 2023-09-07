export interface CreateUserDTO {
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  password: string;
}

export interface UsernameExistsProp {
  username: string;
}

export interface EmailExistsProp {
  email: string;
}
