import compression from "compression";
import cors from "cors";
import express from "express";
import morgan from "morgan";

import schoolRouter from "./routes/school.route.js";

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(compression());

app.use(schoolRouter);

export default app;
