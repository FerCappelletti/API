import { Request, Response } from "express";
import User from '../user/user.model'
import token from "../../utils/token";


export const getAll = async (req: Request, res:Response) => {

  const user = await User.findOne({email: req.body.email})
  const verifyToken = token.verifyToken(req.body.token)

  if(!user || !verifyToken){
    res.send(400).json({msg: 'Token expired, please login again'})
  }
  res.status(200).json(await User.find().limit(10))
}

export const search = async (req: Request, res:Response) => {
  const user = await User.findOne({email: req.body.email})
  const verifyToken = token.verifyToken(req.body.token)

  !user ? res.send(400).json({msg: 'User is not registered'}) : verifyToken
  !verifyToken ? res.send(401).json({msg: 'Token expired, please login again'}) : 
  res.status(200).json(await User.find({email: {
      $regex: req.params.email,
      $options: "i"
    }} ))
}