import { ValidationError } from "../../../shared/CustomError";
import { passwordRegex } from "../../../utils/constants";
import { NextFunction, Request, Response } from "express";
import validator from "validator";

export function loginValidator(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { email, password } = req.body;

    if (!email) throw new ValidationError("Email is required");
    if (!validator.isEmail(email)) throw new ValidationError("Invalid email format");

    if (!password) throw new ValidationError("Password is required");

    if (!passwordRegex.test(password)) {
      throw new ValidationError(
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      );
    }

    next();
  } catch (error:unknown) {
   next(error)
  }
}
