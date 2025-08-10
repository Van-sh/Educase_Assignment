import { type, type Type } from "arktype";
import type { NextFunction, Request, Response } from "express";

export function createValidationMiddleware<O, T extends Type<O>>(
   schema: T,
   reqProperty: "body" | "query" | "params" = "body",
) {
   return function (req: Request, res: Response, next: NextFunction) {
      const out = schema(req[reqProperty]);

      if (out instanceof type.errors) {
         res.status(400).json({ error: out.summary });
      } else {
         if (reqProperty === "body") req[reqProperty] = out;
         next();
      }
   };
}
