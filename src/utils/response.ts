import { Response } from 'express';

export const responseMessage = (message: string) => {
  return {
    data: {
      message,
    },
  };
};

export const responsePayload = (res: Response, statusCode: number, data: any) => {
  return res.status(statusCode).json({
    data,
  });
};
