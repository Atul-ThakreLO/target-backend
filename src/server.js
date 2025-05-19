import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import studentRouter from "./routes/studentRoutes.js";
import classRouter from "./routes/secondary/classRoutes.js";
import schoolRouter from "./routes/secondary/schoolRoutes.js";
import notesRoutes from "./routes/secondary/notesRoutes.js";
import testPaperRoutes from "./routes/secondary/testPapersRoutes.js";
import subjectRoutes from "./routes/secondary/subjectsRoutes.js";
import papersRoutes from "./routes/secondary/papersRoutes.js";
import staffRoutes from "./routes/officeRoutes.js";
import jobsRoutes from "./routes/secondary/jobRoutes.js";
import marksRouter from "./routes/secondary/marksRouets.js";
import batchRoutes from "./routes/secondary/batchRoutes.js";
import assignmentRouter from "./routes/secondary/assignmentRoutes.js";
import noticeRouter from "./routes/secondary/noticeRoutes.js";
import resultRouter from "./routes/secondary/resultRoutes.js";
import { handleError } from "./helper/Error.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

dotenv.config({ path: "./.env" });
const PORT = process.env.PORT;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.FRONT_END_URL || "http://localhost:5173", // frontend URL without trailing slash
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Routes----------------
app.use(studentRouter);
app.use(classRouter);
app.use(schoolRouter);
app.use(notesRoutes);
app.use(subjectRoutes);
app.use(papersRoutes);
app.use(testPaperRoutes);
app.use(staffRoutes);
app.use(jobsRoutes);
app.use(batchRoutes);
app.use(marksRouter);
app.use(noticeRouter);
app.use(assignmentRouter);
app.use(resultRouter);

// Error Handler---------------
app.use(handleError);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
