import { NextFunction, Request, Response } from 'express';
import { isEmpty } from 'lodash';
import z, { ZodError, ZodObject } from 'zod';
export interface Password {
  password: string;
}

export const passwordZodSchema = z
  .object({
    password: z.string().trim(),
  })
  .strict();

export function isPassword(input: any): input is Password {
  if (isEmpty(input)) {
    return false;
  }
  const result = passwordZodSchema.safeParse(input);
  return result.success;
}

export const validatePayload = (schema: ZodObject<any, any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          status: 'fail',
          errors: error.issues.map((err) => ({
            field: err.path.join('.'),
            message: err.message,
          })),
        });
      }
    }
  };
};
