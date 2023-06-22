import express from "express";
import { register, login, getAll, search } from "./user.controller";
import { proxyServer } from "../authProxy/authProxy.controller";
const router = express.Router();

router.get('/', (req, res) => {
    res.sendStatus(200)
})

router.post('/login', login)
router.post('/register', register) 
router.get('/all',proxyServer, getAll) 
router.get('/user/:email', search) 

export default router
