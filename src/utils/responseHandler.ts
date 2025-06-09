import { Response } from "express";

// Respuesta exitosa
export const sendSuccess = (res: Response, data: any, message: string, statusCode = 200) => {
  return res.status(statusCode).json({
    success: true,
    data,
    message,
  });
};

// Respuesta de error
export const sendError = (res: Response, message: string, error?: string, statusCode = 500) => {
  return res.status(statusCode).json({
    success: false,
    message,
    error,
  });
};
