import { Request,Response,NextFunction } from "express";
import { userModel,Iuser } from "../models/user_model";
import ErrorHandler from "../utils/ErrorHandler";
import { catchAsyncError } from "../middleware/catchAsyncErrors";
import jwt, { Secret } from "jsonwebtoken";
require("dotenv").config();
import ejs from "ejs";
import path from "path";
import sendMail from "../utils/sendMail";
import { sendToken } from "../utils/jwt";
import { redis } from "../utils/redis";


//register user
interface registrationBody{
    name:string;
    email:string;
    password:string;
    avatar?:string;
}

export const registerUser= catchAsyncError(async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const {name,email,password}=req.body;

        const isEmailExists=await userModel.findOne({email});
        if(isEmailExists) return next(new ErrorHandler("Email already exists",400));

        const user:registrationBody={name,email,password};
        const activationToken=createActivationToken(user);

        const activationCode=activationToken.activationCode;
        const data={user:{name:user.name,},activationCode};
        const html=await ejs.renderFile(path.join(__dirname,"../mails/activationmail.ejs"),data) // custom path to the ejs file for mail template

        try{
            await sendMail({
                email:user.email,
                subject:"Account Activation",
                template:"activationmail.ejs",
                data
            });

            res.status(201).json({
                success:true,
                message:`Please check your email ${user.email} to activate your account`,
                activationToken: activationToken.token
            })
        }catch(error:any){
            return next(new ErrorHandler(error.message,400))
        }
 
    }catch(err:any){
        return next(new ErrorHandler(err.message,400));
    }
})

interface IactivationToken {
    token:string;
    activationCode:string;
} 

export const createActivationToken=(user:any):IactivationToken =>{
    const activationCode=Math.floor(1000 + Math.random() * 9000).toString(); // generate 4 digit code


    const token=jwt.sign({user,activationCode},process.env.ACTIVATION_SECRET as Secret,{expiresIn:"5m"});

    return {token,activationCode};
};


//activate user :Taking otp as input from user and verifying it
interface IactivationRequest{
    activation_token:string;
    activation_code:string;
}

export const activateUser=catchAsyncError(async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const {activation_token,activation_code}=req.body as IactivationRequest;

        const newUser:{user:Iuser;activationCode:string}=jwt.verify(
            activation_token,
            process.env.ACTIVATION_SECRET as string
        ) as {user:Iuser; activationCode:string};

        if(newUser.activationCode!== activation_code){
            return next(new ErrorHandler("Invalid activation code",400));
        }

        const {name,email,password}=newUser.user;
        const existUser=await userModel.findOne({email});

        if(existUser){
            return next(new ErrorHandler("Email already exists",400));
        }

        const user= await userModel.create({ name, email, password })
        
        res.status(201).json({success:true});

    }
    catch(err:any){
        return next(new ErrorHandler(err.message,400));
    }
})

//login user
interface IloginRequest{
    email:string;
    password:string;
}

export const loginUser=catchAsyncError(async(req:Request, res:Response,next:NextFunction)=>{
    try{

        const {email,password}=req.body as IloginRequest;

        if(!email || !password){
            return next(new ErrorHandler("Please enter email and password",400));
        }

        const user=await userModel.findOne({email}).select("+password");

        if(!user){
            return next(new ErrorHandler("Invalid email or password",400));
        }

        const isPasswordMatched= await user.comparePassword(password);

        if(!isPasswordMatched){
            return next(new ErrorHandler("Invalid email or password",400));
        }

        sendToken(user,200,res);        

    } catch(error:any){
        return next(new ErrorHandler(error.message,400));
    }
})


// logout user

export const logoutUser=catchAsyncError(async(req:Request, res:Response,next:NextFunction)=>{
    try{
        res.cookie("access_token","",{maxAge: 1});
        res.cookie("refresh_token","",{maxAge:1});

        // delete redis cache
        const userId=req.user?._id;
        // console.log(userId);
        redis.del(userId as string);

        res.status(200).json({
            success:true,
            message:"Logged out successfully"
        })

    } catch(error:any){
        return next(new ErrorHandler(error.message,400));
    }
})
