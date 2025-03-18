import { Response } from "express";
import { ErrorResponseType, SuccessResponseType } from "../interface/response";

export const SuccessResponse = (
  res: Response,
  statusCode: number,
  message: string,
  data?: any,
  accessToken?: string,
  refreshToken?: string
) => {
  let response: SuccessResponseType = {
    message,
    success: true,
    result: data
  }

  if (accessToken && refreshToken) {
    res
      .status(statusCode)
      .cookie('accessToken', accessToken, { httpOnly: false })
      .cookie('refreshToken', refreshToken, { httpOnly: true })
      .json(response)
  } else {
    res.status(statusCode).json(response)
  }
}

// Error Response
export const ErrorResponse = (
  res: Response,
  statusCode: number,
  message: string
) => {
  const response: ErrorResponseType = {
    message,
    success: false
  }
  res
    .status(statusCode).json(response)
}