import { Request, Response } from "express";
import User from '../../models.ts/user'
import token, { verifyToken } from "../../utils/token";


export const getAll = async (req: Request, res:Response) => {
  const {email, token} = req.params
  
  const user = await User.findOne({email: email})
  const verifiedToken = verifyToken(token)
 
  if(!user){
    res.sendStatus(401).json({msg: 'User is not registered'})
  }
  if(!verifiedToken){
    res.sendStatus(401).json({msg:'Token expired, please login again'})
  }
  const users = await User.find().limit(10)
  res.sendStatus(200).json(users)
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