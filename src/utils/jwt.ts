import { Response } from 'express'
import * as jwt from 'jsonwebtoken'
import { secret, jwtLife } from '../config/index'

export const generateToken = (username: string, res: Response): void =>{
    
    const token = jwt.sign({username},secret as string,{expiresIn: Number(jwtLife)})
    res.cookie("jwt", token, {maxAge: Number(jwtLife)})

} 


export const validateToken = (token: string): jwt.JwtPayload =>{
    const claims = jwt.verify(token,secret)
    return claims as jwt.JwtPayload

}