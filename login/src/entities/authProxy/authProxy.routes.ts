import express from "express";
import { getAll, search } from '../authProxy/authProxy.controller'


const router = express.Router();

router.get('/', getAll)
router.get('/user/:email', search) 

export default router

