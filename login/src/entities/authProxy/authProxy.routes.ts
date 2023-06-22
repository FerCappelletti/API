import express from "express";
import { getAll, search } from '../authProxy/authProxy.controller'


const router = express.Router();

router.get('/:email/:token', getAll)
router.get('/:email', search) 

export default router

