import { Request,Response,NextFunction } from "express";
import { userModel,Iuser } from "../models/user_model";
import ErrorHandler from "../utils/ErrorHandler";
import { catchAsyncError } from "../middleware/catchAsyncErrors";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
require("dotenv").config();
import ejs from "ejs";
import path from "path";
import sendMail from "../utils/sendMail";
import { accessTokenOptions, refreshTokenOptions, sendToken } from "../utils/jwt";
import { redis } from "../utils/redis";
import { getAllUsersService, getUserById, updateUserRoleService } from "../services/user.service";
import cloudinary from "cloudinary"


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


//update access token
export const updateAccessToken= catchAsyncError(async(req:Request, res:Response,next:NextFunction)=>{
    try{
        const refresh_token=req.cookies.refresh_token as string;
        const decoded=jwt.verify(refresh_token, process.env.REFRESH_TOKEN as string) as JwtPayload;
  
        const message="Please login first."
        if(!decoded){
            return next(new ErrorHandler(message,400));
        }

        const session= await redis.get(decoded.id) as string;

        if(!session){
            return next(new ErrorHandler(message,400));
        }

        const user=JSON.parse(session); 

        // make access & refresh token
        const accessToken=jwt.sign({id:user._id},process.env.ACCESS_TOKEN as string,{expiresIn:"1d"});

        const refreshToken=jwt.sign({id:user._id},process.env.REFRESH_TOKEN as string,{expiresIn:"3d"})

        req.user=user; // set user to reqest

        //update cookie
        // the third parameter is my own way of setting the cookie options, if I don't want to use the default cookie options
        res.cookie("access_token",accessToken,accessTokenOptions);
        res.cookie("refresh_token",refreshToken,refreshTokenOptions);

        await redis.set(user._id,JSON.stringify(user),'EX',604800); // set the user to redis for 7 days


        // res.status(200).json({
        //     status:"success",
        //     accessToken
        // }) // no need to send response, just pass the request to next middleware
        next(); // pass the request to next middleware

    } catch(error:any){
        return next(new ErrorHandler(error.message,400));
    }
})


//get user info
export const getUserInfo= catchAsyncError(async(req:Request, res:Response,next:NextFunction)=>{
    try{
        const userId=req.user?._id as string;
        getUserById(userId,res);

    } catch(error:any){
        return next(new ErrorHandler(error.message,400));
    }
})


// SOCIAL AUTH: This will be implemented in frontend, we will use next auth, here just get email,name and avatar from google or facebook and send new token is user not exist in db or send token if user exist in db

interface isSocialAuthBody{
    email:string;
    name:string;
    avatar:string;
}

export const socialAuth=catchAsyncError(async(req:Request, res:Response,next:NextFunction)=>{
    try{
        const {email,name,avatar}=req.body as isSocialAuthBody;
        const user= await userModel.findOne({email});

        if(!user){
            const newUser=await userModel.create({email,name,avatar});
            sendToken(newUser,200,res);
        }
        else{
            sendToken(user,200,res);
        }

    } catch(error:any){
        return next(new ErrorHandler(error.message,400));
    }
})


// update user inf0 : If user wants to update his/her name or email

interface IupdateUserInfo{
    name?:string;
    email?:string;
}

export const updateUserInfo=catchAsyncError(async(req:Request, res:Response,next:NextFunction)=>{
    try{

        const {name,email}=req.body as IupdateUserInfo;
        const userId=req.user?._id as string; // get from redis
        const user=await userModel.findById(userId); // get from db

        if(email && user){
            const isEmailExists=await userModel.findOne({email});

            if(isEmailExists){
                return next(new ErrorHandler("Email already exists",400));
            }
            user.email=email;
        }

        if(name && user){
            user.name=name;
        }

        await user?.save();

        const setToRedis= await redis.set(userId, JSON.stringify(user));
        // console.log(setToRedis);

        res.status(201).json({
            success:true,
            user
        })
        

    }catch(error:any){
        return next(new ErrorHandler(error.message,400));
    }
})


// update password

interface IupdatePassword{
    oldPassword:string;
    newPassword:string;
}

export const updatePassword=catchAsyncError(async(req:Request, res:Response,next:NextFunction)=>{
    try{

        const {oldPassword,newPassword}=req.body as IupdatePassword;

        const user=await userModel.findById(req.user?._id).select("+password");

        if(user?.password===undefined){
            return next(new ErrorHandler("Password modification not possible",400));
        }

        const isPasswordMatched=await user?.comparePassword(oldPassword);

        if(!isPasswordMatched){
            return next(new ErrorHandler("Old password is incorrect",400));
        }

        user.password=newPassword;

        await user.save();

        await redis.set(req.user?._id as string, JSON.stringify(user));

        res.status(201).json({
            success:true,
            user
        });

    } catch(error:any){
        return next(new ErrorHandler(error.message,400));
    }
})


// update profile picture
interface IupdateProfilePic{
    avatar:string; 
}

export const updateProfilePic=catchAsyncError(async(req:Request, res:Response,next:NextFunction)=>{
    try{
        const {avatar}=req.body;

        const userId=req.user?._id as string;

        const user=await userModel.findById(userId);

        if(user && avatar){
            if(user?.avatar.public_id){ // first delete the previous image from cloudinary if it avatar exists
                await cloudinary.v2.uploader.destroy(user?.avatar?.public_id);
            }
            else {
                const myCloud=await cloudinary.v2.uploader.upload(avatar,{
                    folder:"avatars",
                    width:150
                });

                user.avatar={
                    public_id:myCloud.public_id,
                    url:myCloud.secure_url
                }
            }
        }

        await user?.save();
        await redis.set(userId, JSON.stringify(user));

        res.status(200).json({
            success:true,
            user
        })

    }catch(error:any){
        return next(new ErrorHandler(error.message,400));
    }
})


// get all users: for admin
export const getAllUsers=catchAsyncError(async(req:Request, res:Response,next:NextFunction)=>{
    try{
        getAllUsersService(res);

    } catch(error:any){
        return next(new ErrorHandler(error.message,400));
    }
})


//update user role
export const updateUserRole=catchAsyncError(async(req:Request, res:Response,next:NextFunction)=>{
    try{
        const {id,role}=req.body;
        updateUserRoleService(res,id,role);

    } catch(error:any){
        return next(new ErrorHandler(error.message,400));
    }
})


// delete user : for admin access only
export const deleteUser=catchAsyncError(async(req:Request, res:Response,next:NextFunction)=>{
    try{

        const {id}=req.params;

        const user=await userModel.findById(id);
        if(!user){
            return next(new ErrorHandler("User not found",404));
        }

        await user.deleteOne({id});

        await redis.del(id);

        res.status(200).json({
            success:true,
            message:"User deleted successfully"
        })


    } catch(error:any){
        return next(new ErrorHandler(error.message,400));
    }
})
