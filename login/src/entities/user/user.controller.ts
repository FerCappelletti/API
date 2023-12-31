import { Request, Response } from "express";
import User from '../user/user.model'
import token from "../../utils/token";

export const register = async (req: Request, res: Response): Promise<Response> => {
    const {email, password} = req.body
    if(!email || !password) {
        res.status(400).json({msg: "Please send your email and password"})
    } 

    const user = await User.findOne({email})
    if(user) {
         res.send(400).json({msg: 'User already exists'})
    }
    const newUser = new User(req.body)
    await newUser.save()

    return res.status(201).json(newUser)
}

export const login = async (req: Request, res:Response) => {
    const {email, password} = req.body
    if(!email || !password) {
        res.status(400).json({msg: "Please send your email and password"})
    } 

    const user = await User.findOne({email})
    if(!user) {
        return res.send(400).json({msg: 'User is not registered'})
    }

    if(await user.isValidPassword(password)){
        const accessToken = token.createToken(user)
        return res.status(200).json({token: accessToken})
    }

    return res.status(400).json({msg: 'Invalid email or password'})
}

