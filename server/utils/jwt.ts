require('dotenv').config();
import { Response } from "express";
import { Iuser } from "../models/user_model";
import { redis } from "./redis";


interface ITokenOptions{
    expires:Date;
    maxAge:number;
    httpOnly:boolean;
    sameSite: 'lax' | 'strict' | 'none' | undefined;
    secure?:boolean;
}

//parse environment variables to integrates with fallback values
const accessTokenExpire= parseInt(process.env.ACCESS_TOKEN_EXPIRE || '300',10);

const refreshTokenExpire= parseInt(process.env.REFRESH_TOKEN_EXPIRE || '12000',10);

const isProduction = process.env.NODE_ENV === 'production';

// options for cookies
export const accessTokenOptions:ITokenOptions={
    expires: new Date(Date.now()+ accessTokenExpire*60*60* 1000),
    maxAge:24*60*60*1000,
    httpOnly: true,
    sameSite:isProduction ? 'none' : 'strict',
    secure: isProduction, // Only secure in production
};

export const refreshTokenOptions:ITokenOptions={
    expires: new Date(Date.now()+ refreshTokenExpire*24*60*60 *1000),
    maxAge:7*24*60*60 *1000,
    httpOnly: true,
    sameSite: isProduction ? 'none' : 'strict',
    secure: isProduction,
};

export const sendToken =(user:Iuser, statusCode:number, res:Response)=>{
    const accessToken=user.SignAccessToken();
    const refreshToken=user.SignRefreshToken();

    //upload session to Redis
    redis.set(user._id as any,JSON.stringify(user) as any);

    


    res.cookie("access_token",accessToken,accessTokenOptions);
    res.cookie("refresh_token",refreshToken, refreshTokenOptions);

    res.status(statusCode).json({
        success:true,
        user,
        accessToken
    })
}
