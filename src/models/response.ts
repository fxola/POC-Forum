export const httpcode = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  CONFLICT: 409,
  SERVER_ERROR: 500,
};

export const VALIDATION_ERROR = {
  error: "ValidationError",
  data: undefined,
  success: false,
};

export const EMAIL_TAKEN_ERROR = {
  error: "EmailAlreadyInUse",
  data: undefined,
  success: false,
};

export const USERNAME_TAKEN_ERROR = {
  error: "UsernameAlreadyTaken",
  data: undefined,
  success: false,
};

export const USER_NOT_FOUND_ERROR = {
  error: "UserNotFound",
  data: undefined,
  success: false,
};

export const NOT_FOUND_ERROR = (url: string) => ({
  error: "Not Found",
  success: false,
  message: `${url} does not exist`,
});

export const INTERNAL_SERVER_ERROR = {
  error: "InternalServerError",
  success: false,
  message: "Something went wrong",
};

export const successResponse = (data = {}) => ({
  data,
  error: undefined,
  success: true,
});
