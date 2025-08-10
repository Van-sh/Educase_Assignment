import { Router } from "express";

import {
   addSchool,
   addSchoolSchema,
   listSchools,
   locationSchema,
} from "../controllers/school.controller.js";
import { createValidationMiddleware } from "../middleware/utils.js";

const router = Router();

router.get("/listSchools", createValidationMiddleware(locationSchema, "query"), listSchools);

router.post("/addSchool", createValidationMiddleware(addSchoolSchema), addSchool);

export default router;
