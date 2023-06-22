import express from "express";
import { register, login } from "./user.controller";

const router = express.Router();

router.get('/', (req, res) => {
    res.sendStatus(200)
})

router.post('/login', login)
router.post('/register', register) 
router.get('/all', (req, res) => {
    res.redirect('http://localhost:3000/api/v1/auth/users')
})


export default router
