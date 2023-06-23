
import { Request, Response, NextFunction } from "express";

const logger = (req: Request, res: Response, next: NextFunction) => {
    console.log(`Logger: ${req.url}:${res.status}`)
    next();
};

export default logger