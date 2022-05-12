type CustomError = {
  statusCode: number;
};

export const UnauthorizedException: Error & CustomError = {
  statusCode: 401,
  message: "unauthorized to perform this action",
  name: "unauthorized",
};

export const UnhandledException: Error & CustomError = {
  statusCode: 500,
  message: "an unhandled exception ocurred, please try again",
  name: "unhandled",
};
