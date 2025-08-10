import { sql } from "drizzle-orm";
import { check, float, mysqlTable, serial, varchar } from "drizzle-orm/mysql-core";

export const schools = mysqlTable(
   "schools",
   {
      id: serial().primaryKey(),
      name: varchar({ length: 100 }).notNull().unique(),
      address: varchar({ length: 255 }).notNull().unique(),
      latitude: float().notNull(),
      longitude: float().notNull(),
   },
   (table) => [
      check("latitude_range", sql`-90 <= ${table.latitude} and ${table.latitude} <= 90`),
      check("longitude_range", sql`-180 <= ${table.longitude} and ${table.longitude} <= 180`),
   ],
);

export type TSchoolInsert = typeof schools.$inferInsert;
