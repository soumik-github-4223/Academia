import { NextFunction, Request, Response } from "express";
import { catchAsyncError } from "../middleware/catchAsyncErrors";
import ErrorHandler from "../utils/ErrorHandler";
import cloudinary from 'cloudinary';
import { createCourse } from "../services/course.service";
import CourseModel from "../models/course_model";
import { redis } from "../utils/redis";
import { isJsxCallLike } from "typescript";


//upload course
/*
export const uploadCourse=catchAsyncError(async(req:Request, res:Response, next:NextFunction)=>{
    try{

        res.status(201).json({
            success:true,
            course
        })
    } catch(error:any){
        return next(new ErrorHandler(error.message,500))
    }
})
*/
export const uploadCourse=catchAsyncError(async(req:Request, res:Response, next:NextFunction)=>{
    try{
        const data=req.body;
        const thumbnail=data.thumbnail;
        if(thumbnail){
            const myCloud= await cloudinary.v2.uploader.upload(thumbnail,{folder:"courses"});
        
            data.thumbnail={
                public_id:myCloud.public_id,
                url:myCloud.secure_url
            }
        
        }
        createCourse(data,res,next);

    } catch(error:any){
        return next(new ErrorHandler(error.message,500))
    }
})


// update course
export const editCouse=catchAsyncError(async(req:Request, res:Response, next:NextFunction)=>{
    try{
        const data=req.body;
        
        const thumbnail=data.thumbnail;
        if(thumbnail){
            await cloudinary.v2.uploader.destroy(data.thumbnail.public_id);

            const myCloud=await  cloudinary.v2.uploader.upload(thumbnail,{
                folder:"courses"
            });

            data.thumbnail={
                public_id:myCloud.public_id,
                url:myCloud.secure_url
            }
        }

        const courseId=req.params.id;

        const course=await CourseModel.findByIdAndUpdate(
            courseId,
            {
                $set:data,
            },
            {new:true}
        );

        res.status(201).json({
            success:true,
            course
        })


    } catch(error:any){
        return next(new ErrorHandler(error.message,500))
    }
})


//get single course- for viewing course details without purchasing

export const getSingleCourse
=catchAsyncError(async(req:Request, res:Response, next:NextFunction)=>{
    
    try{

        // To decrease the number of requests to the database, we can use caching.
        // We can cache the course data in Redis for a certain amount of time.
        // If the course data is already cached, we can return it directly from the cache without querying the database.
        // If the course data is not cached, we can query the database, cache the data, and return it to the client.

        const courseId=req.params.id;
        const isCached=await redis.get(courseId);

        if(isCached){
            const course=JSON.parse(isCached);
            // console.log("from cache");
            res.status(200).json({
                success:true,
                course
            })
        }

        else{    
            const course=await CourseModel.findById(req.params.id).select("-courseData.videoUrl -courseData.suggestion -courseData.questions -courseData.links");

            await redis.set(courseId,JSON.stringify(course));

            res.status(200).json({
                success:true,
                course
            })
        }

    } catch(error:any){
        return next(new ErrorHandler(error.message,500))
    }
})


//get all courses- for viewing all courses without purchasing
export const getAllCourse
=catchAsyncError(async(req:Request, res:Response, next:NextFunction)=>{
    try{
        const courseId=req.params.id;
        const isCached=await redis.get("allCourses");

        if(isCached){
            const courses=JSON.parse(isCached);
            // console.log("from cache");
            res.status(200).json({
                success:true,
                courses
            })
        }
        else{
            const courses=await CourseModel.find().select("-courseData.videoUrl -courseData.suggestion -courseData.questions -courseData.links");

            await redis.set("allCourses",JSON.stringify(courses));

            res.status(200).json({
                success:true,
                courses
            })
        }

        

    } catch(error:any){
        return next(new ErrorHandler(error.message,500))
    }
})




