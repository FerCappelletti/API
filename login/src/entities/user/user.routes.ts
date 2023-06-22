import express from "express";
import { register, login } from "./user.controller";

const router = express.Router();

router.get('/', (req, res) => {
    res.sendStatus(200)
})

router.post('/login', login)
router.post('/register', register) 

export default router