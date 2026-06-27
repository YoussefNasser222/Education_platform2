import * as jwt from 'jsonwebtoken';
import { devConfig } from '../../config';

export const generateToken = ({payolad , options}:{payolad : Object , options?:jwt.SignOptions})=>{
    return jwt.sign(payolad, devConfig.JWT_SECRET, options);
}

export const verifyToken = (token:string)=>{
    return jwt.verify(token, devConfig.JWT_SECRET) as jwt.JwtPayload;
}