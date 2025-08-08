import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { jwt_secret } from "../config";

export const auth = (req: Request,res: Response,next: NextFunction) => {
    const header = req.headers["authorization"];
    const token = header && header.split(" ")[1];

    if(!token){
        return res.status(401).json({
            message:"You are not logged in"
        })
    }

      jwt.verify(token,jwt_secret,(err,user)=>{
            if(err){
            return res.status(403).json({
                message: "Invalid or expired token"
            })
        }
        // @ts-ignore
        req.user = user;

        next();
    })
}