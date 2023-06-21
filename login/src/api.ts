import { Router } from "express";

// Routes
import userRoutes from './entities/user/user.routes'

const router = Router();

router.use("/users", userRoutes);

export default router;