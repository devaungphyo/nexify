import { NextFunction, Request, Response } from 'express';
import { SafeParseError, z, ZodSchema } from 'zod';

export const validator =
  (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    const validate = schema.safeParse(req.body);
    if (!validate.success) {
      const { error } = validate as SafeParseError<object>;
      console.log(error);
      return res.status(400).send(error.flatten().fieldErrors);
    } else {
      req.body = validate.data as z.infer<typeof schema>;
      next();
    }
  };
