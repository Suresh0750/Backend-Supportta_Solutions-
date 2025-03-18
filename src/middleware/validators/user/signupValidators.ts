import { ValidationError } from "@/shared/CustomError";
import { passwordRegex } from "@/utils/constants";
import { NextFunction, Request, Response } from "express";
import validator from "validator";

export function signupValidator(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { username, email, password } = req.body;
    console.log(req.body)
    if (!username) throw new ValidationError("Username is required");
    if (
      !validator.isAlphanumeric(username) ||
      !validator.isLength(username, { min: 3, max: 50 })
    ) {
      throw new ValidationError(
        "Username should be alphanumeric and between 3 and 50 characters long"
      );
    }

    if (!email) throw new ValidationError("Email is required");
    if (!validator.isEmail(email)) throw new ValidationError("Invalid email format");

    if (!password) throw new ValidationError("Password is required");
  
    if (!passwordRegex.test(password)) {
      throw new ValidationError(
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      );
    }

    if (!req.file) throw new ValidationError("profilePhoto is required");
    
    next();
  } catch (error:unknown) {
    next(error)
  }
}
