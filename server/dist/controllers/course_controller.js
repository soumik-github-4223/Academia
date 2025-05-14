"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateVideoUrl = exports.deleteCourse = exports.getAllCourses = exports.addReview = exports.addedAnswer = exports.addQuestion = exports.getCouseByUser = exports.getAllCourse = exports.getSingleCourse = exports.editCouse = exports.uploadCourse = void 0;
const catchAsyncErrors_1 = require("../middleware/catchAsyncErrors");
const ErrorHandler_1 = __importDefault(require("../utils/ErrorHandler"));
const cloudinary_1 = __importDefault(require("cloudinary"));
const course_service_1 = require("../services/course.service");
const course_model_1 = __importDefault(require("../models/course_model"));
const redis_1 = require("../utils/redis");
const mongoose_1 = __importDefault(require("mongoose"));
const ejs_1 = __importDefault(require("ejs"));
const path_1 = __importDefault(require("path"));
const sendMail_1 = __importDefault(require("../utils/sendMail"));
const notificationModel_1 = __importDefault(require("../models/notificationModel"));
const axios_1 = __importDefault(require("axios"));
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
exports.uploadCourse = (0, catchAsyncErrors_1.catchAsyncError)(async (req, res, next) => {
    try {
        const data = req.body;
        const thumbnail = data.thumbnail;
        if (thumbnail) {
            const myCloud = await cloudinary_1.default.v2.uploader.upload(thumbnail, { folder: "courses" });
            data.thumbnail = {
                public_id: myCloud.public_id,
                url: myCloud.secure_url
            };
        }
        (0, course_service_1.createCourse)(data, res, next);
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 500));
    }
});
// update course
exports.editCouse = (0, catchAsyncErrors_1.catchAsyncError)(async (req, res, next) => {
    try {
        const data = req.body;
        const thumbnail = data.thumbnail;
        if (thumbnail) {
            await cloudinary_1.default.v2.uploader.destroy(data.thumbnail.public_id);
            const myCloud = await cloudinary_1.default.v2.uploader.upload(thumbnail, {
                folder: "courses"
            });
            data.thumbnail = {
                public_id: myCloud.public_id,
                url: myCloud.secure_url
            };
        }
        const courseId = req.params.id;
        const course = await course_model_1.default.findByIdAndUpdate(courseId, {
            $set: data,
        }, { new: true });
        res.status(201).json({
            success: true,
            course
        });
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 500));
    }
});
//get single course- for viewing course details without purchasing
exports.getSingleCourse = (0, catchAsyncErrors_1.catchAsyncError)(async (req, res, next) => {
    try {
        // To decrease the number of requests to the database, we can use caching.
        // We can cache the course data in Redis for a certain amount of time.
        // If the course data is already cached, we can return it directly from the cache without querying the database.
        // If the course data is not cached, we can query the database, cache the data, and return it to the client.
        const courseId = req.params.id;
        const isCached = await redis_1.redis.get(courseId);
        if (isCached) {
            const course = JSON.parse(isCached);
            // console.log("from cache");
            res.status(200).json({
                success: true,
                course
            });
        }
        else {
            const course = await course_model_1.default.findById(req.params.id).select("-courseData.videoUrl -courseData.suggestion -courseData.questions -courseData.links");
            await redis_1.redis.set(courseId, JSON.stringify(course), 'EX', 604800);
            res.status(200).json({
                success: true,
                course
            });
        }
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 500));
    }
});
//get all courses- for viewing all courses without purchasing
exports.getAllCourse = (0, catchAsyncErrors_1.catchAsyncError)(async (req, res, next) => {
    try {
        const courseId = req.params.id;
        const isCached = await redis_1.redis.get("allCourses");
        if (isCached) {
            const courses = JSON.parse(isCached);
            // console.log("from cache");
            res.status(200).json({
                success: true,
                courses
            });
        }
        else {
            const courses = await course_model_1.default.find().select("-courseData.videoUrl -courseData.suggestion -courseData.questions -courseData.links");
            await redis_1.redis.set("allCourses", JSON.stringify(courses), 'EX', 604800);
            res.status(200).json({
                success: true,
                courses
            });
        }
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 500));
    }
});
// get couse content- for purchased user
exports.getCouseByUser = (0, catchAsyncErrors_1.catchAsyncError)(async (req, res, next) => {
    try {
        const userCourseList = req.user?.courses;
        const courseId = req.params.id;
        const courseExists = userCourseList?.find((course) => course._id === courseId);
        if (!courseExists) {
            return next(new ErrorHandler_1.default("You have not purchased this course", 400));
        }
        const course = await course_model_1.default.findById(courseId);
        const content = course?.courseData;
        res.status(200).json({
            success: true,
            content
        });
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 500));
    }
});
exports.addQuestion = (0, catchAsyncErrors_1.catchAsyncError)(async (req, res, next) => {
    try {
        const { question, courseId, contentId } = req.body;
        const course = await course_model_1.default.findById(courseId);
        if (!mongoose_1.default.Types.ObjectId.isValid(contentId)) {
            return next(new ErrorHandler_1.default("Invalid content id", 400));
        }
        const courseContent = course?.courseData.find((item) => item._id.toString() === contentId);
        if (!courseContent) {
            return next(new ErrorHandler_1.default("Content not found", 404));
        }
        //create new question
        const newQuestion = {
            user: req.user,
            question,
            questionReplies: []
        };
        //add question to the content
        courseContent.questions.push(newQuestion);
        await notificationModel_1.default.create({
            user: req.user?._id,
            title: "New question received",
            message: `You have a new question im ${courseContent.title}`
        });
        //save the updated course
        await course?.save();
        res.status(200).json({
            success: true,
            message: "Question added successfully",
            course
        });
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 500));
    }
});
exports.addedAnswer = (0, catchAsyncErrors_1.catchAsyncError)(async (req, res, next) => {
    try {
        const { answer, courseId, contentId, questionId } = req.body;
        const course = await course_model_1.default.findById(courseId);
        if (!mongoose_1.default.Types.ObjectId.isValid(contentId)) {
            return next(new ErrorHandler_1.default("Invalid content id", 500));
        }
        const courseContent = course?.courseData?.find((item) => item._id.toString() === contentId);
        if (!courseContent) {
            return next(new ErrorHandler_1.default("Content not found", 400));
        }
        const question = courseContent?.questions?.find((item) => item._id.toString() === questionId);
        if (!question) {
            return next(new ErrorHandler_1.default("Question not found", 400));
        }
        //create new answer
        const newAnswer = {
            user: req.user,
            answer,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        //add answer to the question
        question.questionReplies?.push(newAnswer);
        await course?.save();
        if (req.user?.id === question.user._id) {
            //create notification
            await notificationModel_1.default.create({
                user: req.user?._id,
                title: "Question Answered",
                message: `Your question has been answered in ${courseContent.title}`
            });
        }
        else {
            const data = {
                name: question.user.name,
                title: courseContent.title
            };
            //send mail
            const html = await ejs_1.default.renderFile(path_1.default.join(__dirname, "../mails/questionAnswered.ejs"), data);
            try {
                await (0, sendMail_1.default)({
                    email: question.user.email,
                    subject: "Question Answered",
                    template: "questionAnswered.ejs",
                    data
                });
            }
            catch (error) {
                return next(new ErrorHandler_1.default(error.message, 500));
            }
        }
        res.status(200).json({
            success: true,
            message: "Answer added successfully",
            course
        });
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 500));
    }
});
exports.addReview = (0, catchAsyncErrors_1.catchAsyncError)(async (req, res, next) => {
    try {
        const userCourseList = req.user?.courses;
        const courseId = req.params.id;
        //check if user already exists in userCourseList
        const courseExists = userCourseList?.find((course) => course._id === courseId);
        if (!courseExists) {
            return next(new ErrorHandler_1.default("You have not purchased this course", 400));
        }
        const course = await course_model_1.default.findById(courseId);
        const { review, rating } = req.body;
        const reviewData = {
            user: req.user,
            review,
            rating
        };
        course?.reviews.push(reviewData);
        // console.log(reviewData);
        let avg = 0;
        course?.reviews.forEach((item) => {
            avg += item.rating;
        });
        if (course) {
            course.ratings = avg / course.reviews.length;
        }
        await course?.save();
        await redis_1.redis.set(courseId, JSON.stringify(course), 'EX', 604800); // 7days expiry
        // create notification
        await notificationModel_1.default.create({
            user: req.user?._id,
            title: "New review received",
            message: `${req.user?.name} has added a review to your course ${course?.name}`
        });
        res.status(200).json({
            success: true,
            message: "Review added successfully",
            course
        });
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 500));
    }
});
// add comment to review by admin : not done
//get all courses
exports.getAllCourses = (0, catchAsyncErrors_1.catchAsyncError)(async (req, res, next) => {
    try {
        (0, course_service_1.getAllCoursesService)(res);
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 400));
    }
});
// delete course : for admin access only
exports.deleteCourse = (0, catchAsyncErrors_1.catchAsyncError)(async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await course_model_1.default.findById(id);
        if (!user) {
            return next(new ErrorHandler_1.default("User not found", 404));
        }
        await user.deleteOne({ id });
        await redis_1.redis.del(id);
        res.status(200).json({
            success: true,
            message: "Course deleted successfully"
        });
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 400));
    }
});
// generate video url
exports.generateVideoUrl = (0, catchAsyncErrors_1.catchAsyncError)(async (req, res, next) => {
    try {
        const { videoId } = req.body;
        const response = await axios_1.default.post(`https://dev.vdocipher.com/api/videos/${videoId}/otp`, { ttl: 300 }, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Apisecret ${process.env.VDOCIPHER_API_SECRET}`,
            },
        });
        res.json(response.data);
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 400));
    }
});
