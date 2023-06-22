import express from "express";

const router = express.Router();

router.get('/', (req, res) => {
    res.json({msg: 'proxy'})
})
 

export default router