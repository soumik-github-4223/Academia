import { NextFunction, Request, Response } from "express";
import { catchAsyncError } from "../middleware/catchAsyncErrors";
import ErrorHandler from "../utils/ErrorHandler";
import cloudinary from 'cloudinary';
import { createCourse, getAllCoursesService } from "../services/course.service";
import CourseModel from "../models/course_model";
import { redis } from "../utils/redis";
import { isJsxCallLike } from "typescript";
import mongoose from "mongoose";
import ejs from "ejs";
import path from "path";
import sendMail from "../utils/sendMail";
import NotificationModel from "../models/notificationModel";


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

            await redis.set(courseId,JSON.stringify(course),'EX',604800);

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

            await redis.set("allCourses",JSON.stringify(courses),'EX',604800);

            res.status(200).json({
                success:true,
                courses
            })
        }

        

    } catch(error:any){
        return next(new ErrorHandler(error.message,500))
    }
})


// get couse content- for purchased user
export const getCouseByUser=catchAsyncError(async(req:Request, res:Response, next:NextFunction)=>{
    try{
        const userCourseList=req.user?.courses;
        const courseId=req.params.id;
        
        const courseExists=userCourseList?.find(
            (course:any)=> course._id===courseId
        );

        if(!courseExists){
            return next(new ErrorHandler("You have not purchased this course",400));
        }

        const course=await CourseModel.findById(courseId);
        const content=course?.courseData;

        res.status(200).json({
            success:true,
            content
        })

    } catch(error:any){
        return next(new ErrorHandler(error.message,500))
    }
})



// add questions in course
interface IQuestion{
    question:string;
    courseId:string;
    contentId:string;
}

export const addQuestion=catchAsyncError(async(req:Request, res:Response, next:NextFunction)=>{
    try{
        const {question,courseId,contentId}:IQuestion=req.body;
        const course=await CourseModel.findById(courseId);

        if(!mongoose.Types.ObjectId.isValid(contentId)){
            return next(new ErrorHandler("Invalid content id",400));
        }

        const courseContent=course?.courseData.find(
            (item:any)=>item._id.toString()===contentId)

        
        if(!courseContent){
            return next(new ErrorHandler("Content not found",404));
        }

        //create new question
        const newQuestion : any={
            user:req.user,
            question,
            questionReplies:[]
        };

        //add question to the content
        courseContent.questions.push(newQuestion);

        await NotificationModel.create({
            user:req.user?._id,
            title:"New question received",
            message: `You have a new question im ${courseContent.title}`
        });

        //save the updated course
        await course?.save();

        res.status(200).json({
            success:true,
            message:"Question added successfully",
            course
        })
        

    } catch(error:any){
        return next(new ErrorHandler(error.message,500))
    }
})


// add replies to questions
interface IAddAnswer{
    answer:string;
    courseId:string;
    contentId:string;
    questionId:string;
}

export const addedAnswer=catchAsyncError(async(req:Request, res:Response, next:NextFunction)=>{
    try{
        const {answer,courseId,contentId,questionId}:IAddAnswer=req.body;
        const course=await CourseModel.findById(courseId);

        if(!mongoose.Types.ObjectId.isValid(contentId)){
            return next(new ErrorHandler("Invalid content id",500))
        }

        const courseContent=course?.courseData?.find(
            (item:any)=>item._id.toString()===contentId
        )

        if(!courseContent){
            return next(new ErrorHandler("Content not found",400));
        }

        const question=courseContent?.questions?.find(
            (item:any)=>item._id.toString()===questionId
        )

        if(!question){
            return next(new ErrorHandler("Question not found",400));
        }

        //create new answer
        const newAnswer :any={
            user:req.user,
            answer
        }

        //add answer to the question
        question.questionReplies?.push(newAnswer);

        await course?.save();

        if(req.user?.id ===question.user._id){
            //create notification
            await NotificationModel.create({
                user:req.user?._id,
                title:"Question Answered",
                message:`Your question has been answered in ${courseContent.title}`
            });

        }
        else{
            const data={
                name:question.user.name,
                title:courseContent.title
            }

            //send mail
            const html=await ejs.renderFile(path.join(__dirname,"../mails/questionAnswered.ejs"),data);
        
            try{
                await sendMail({
                    email:question.user.email,
                    subject:"Question Answered",
                    template:"questionAnswered.ejs",
                    data
                });
            } catch(error:any){
                return next(new ErrorHandler(error.message,500));
            }
        }

        res.status(200).json({
            success:true,
            message:"Answer added successfully",
            course
        })
        

    } catch(error:any){
        return next(new ErrorHandler(error.message,500))
    }
})


// add review to course
interface IAddReview{
    review:string;
    rating:number;
    userId:string;
}

export const addReview=catchAsyncError(async(req:Request, res:Response, next:NextFunction)=>{
    try{
        const userCourseList=req.user?.courses;
        const courseId=req.params.id;

        //check if user already exists in userCourseList
        const courseExists=userCourseList?.find(
            (course:any)=> course._id===courseId
        );

        if(!courseExists){
            return next(new ErrorHandler("You have not purchased this course",400));
        }

        const course=await CourseModel.findById(courseId);

        const {review,rating}=req.body as IAddReview;

        const reviewData :any={
            user:req.user,
            review,
            rating
        }

        course?.reviews.push(reviewData);    

        let avg=0;
        course?.reviews.forEach((item:any)=>{
            avg+=item.rating;
        })

        if(course){
            course.ratings=avg/course.reviews.length;
        }
        await course?.save();

        const notification={
            title:"New Review Received",
            message:`${req.user?.name} has added a review to your course ${course?.name}`
        }

        // create notification




        res.status(200).json({
            success:true,
            message:"Review added successfully",
            course
        })

    } catch(error:any){
        return next(new ErrorHandler(error.message,500))
    }

})

// add comment to review by admin : not done


//get all courses
export const getAllCourses=catchAsyncError(async(req:Request, res:Response,next:NextFunction)=>{
    try{
        getAllCoursesService(res);

    } catch(error:any){
        return next(new ErrorHandler(error.message,400));
    }
})


// delete course : for admin access only
export const deleteCourse=catchAsyncError(async(req:Request, res:Response,next:NextFunction)=>{
    try{

        const {id}=req.params;

        const user=await CourseModel.findById(id);
        if(!user){
            return next(new ErrorHandler("User not found",404));
        }

        await user.deleteOne({id});

        await redis.del(id);

        res.status(200).json({
            success:true,
            message:"Course deleted successfully"
        })


    } catch(error:any){
        return next(new ErrorHandler(error.message,400));
    }
})


