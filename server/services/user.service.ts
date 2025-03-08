import { Response } from "express";
import { userModel } from "../models/user_model";
import { redis } from "../utils/redis";


//get user by id
export const getUserById=async(id:string, res:Response)=>{
    const userJSON=await redis.get(id); // find user from redis, no need to search in actual db

    if(userJSON){
        const user= JSON.parse(userJSON);
        res.status(201).json({
            success:true,
            user
        })
    }
}