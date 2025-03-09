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


//get all users
export const getAllUsersService=async(res:Response)=>{
    const users=await userModel.find().sort({createdAt:-1});

    res.status(201).json({
        success:true,
        users
    })
}

//updte user role
export const updateUserRoleService=async(res:Response,id:string, role:string)=>{
    const user=await userModel.findByIdAndUpdate(id,{role},{new:true});

    res.status(201).json({
        success:true,
        user
    })

}


