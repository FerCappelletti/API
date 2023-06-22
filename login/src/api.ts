import { Router } from "express";

// Routes
import userRoutes from './entities/user/user.routes'
import authProxy from './entities/authProxy/authProxy.routes'
const router = Router();

router.use("/users", userRoutes);
router.use("/auth/users", authProxy);
export default router;