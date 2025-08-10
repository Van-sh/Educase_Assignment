import { type } from "arktype";
import { and, asc, eq, getTableColumns, or, sql } from "drizzle-orm";
import type { Request, Response } from "express";
import type { ParamsDictionary } from "express-serve-static-core";

import { db } from "../db/index.js";
import { schools, type TSchoolInsert } from "../db/schema.js";

export const locationSchema = type({
   latitude: type("string.numeric.parse").to("-90 <= number <= 90"),
   longitude: type("string.numeric.parse").to("-180 <= number <= 180"),
});

export async function listSchools(req: Request, res: Response) {
   const result = await db
      .select({
         ...getTableColumns(schools),
         distance: sql<number>`
        6371 * acos(
            sin(radians(${schools.latitude}))
            * sin(radians(${req.query.latitude}))
            + cos(radians(${schools.latitude}))
            * cos(radians(${req.query.latitude}))
            * cos(radians(${schools.longitude}) - radians(${req.query.longitude}))
            )
        `.as("distance"),
      })
      .from(schools)
      .orderBy(({ distance }) => asc(distance))
      .limit(10);

   res.json(result);
}

export const addSchoolSchema = type({
   name: "string < 100",
   address: "string < 255",
   latitude: "-90 <= number <= 90",
   longitude: "-180 <= number <= 180",
});

export async function addSchool(req: Request<ParamsDictionary, any, TSchoolInsert>, res: Response) {
   const matches = await db
      .select()
      .from(schools)
      .where(
         or(
            eq(schools.name, req.body.name),
            eq(schools.address, req.body.address),
            and(eq(schools.latitude, req.body.latitude), eq(schools.longitude, req.body.longitude)),
         ),
      );

   if (matches.length > 0) {
      return res.status(400).json({ error: "School Already exists" });
   }

   await db.insert(schools).values(req.body);

   res.json({ msg: "School was added", school: req.body });
}
