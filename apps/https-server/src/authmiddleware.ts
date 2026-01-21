import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export function authmiddleware(req : Request, res: Response, next: NextFunction) {

    // Authentication logic here (e.g., verify JWT token)

    const token= req.headers['authorization'];

    
    if (!token) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    const decodeToken=jwt.verify(token as string, "your_jwt_secret_key");

    if(decodeToken){
        //@ts-ignore
        req.useId=decodeToken.userId;

    }
    else{
       
        return res.status(401).json({ error: "Unauthorized" });

    }
}