// middleware/auth.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
import { ObjectId } from 'mongoose';
export  const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'No token provided' });
  try {
 
    const decoded =jwt.verify(authHeader,process.env.JWT_SECRET as string)as {_id:ObjectId}; 
    console.log(decoded);
    req.userId = decoded._id;
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Invalid token' });
  }
};


