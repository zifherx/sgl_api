import { Router } from "express";
import controller from "../controllers/prom.controller";

const router = Router();

router.get('/', controller.getLoggerPrometheus)

export default router;