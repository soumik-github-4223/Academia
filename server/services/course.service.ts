import { Response } from "express";
import { catchAsyncError } from "../middleware/catchAsyncErrors";
import CourseModel from "../models/course_model";


// create course
export const createCourse=catchAsyncError(async(data:any, res:Response)=>{
    const course=await CourseModel.create(data);
    res.status(201).json({
        success:true,
        course
    })
})

//get all courses
export const getAllCoursesService=async(res:Response)=>{
    const courses=await CourseModel.find().sort({createdAt:-1});

    res.status(201).json({
        success:true,
        courses
    })
}