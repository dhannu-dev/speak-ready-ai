import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { analyzePractice } from "../controller/practice.controller.js";

const router = Router()

router.post("/analyze", verifyJWT, analyzePractice);

export default router;
