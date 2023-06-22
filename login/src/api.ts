import { Router } from "express";

// Routes
import userRoutes from './entities/user/user.routes'
import authProxy from './entities/authProxy/authProxy.routes'
import { proxyServer } from "./middlewares/authentication.middleware";
const router = Router();

router.use("/users", userRoutes);
router.use("/auth/users", proxyServer, authProxy);
export default router;