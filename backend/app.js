import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Error handling
app.use(notFound);
app.use(errorHandler);

// Routes - Users
import userRoutes from "./routes/userRoutes.js";
app.use("/api/v1/users", userRoutes);
// Routes - Practices
import practiceRoutes from "./routes/practiceRoutes.js";
app.use("/api/v1/practices", practiceRoutes);
// Routes - Patients
import patientRoutes from "./routes/patientRoutes.js";
app.use("/api/v1/patients", patientRoutes);
// Routes - Consults
import consultRoutes from "./routes/consultRoutes.js";
app.use("/api/v1/consults", consultRoutes);

export default app;
