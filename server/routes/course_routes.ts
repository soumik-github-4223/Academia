import express from 'express';
import { addedAnswer, addQuestion, addReview, deleteCourse, editCouse, generateVideoUrl, getAllCourse, getAllCourses, getCouseByUser, getSingleCourse, uploadCourse } from '../controllers/course_controller';
import { authorizeRoles, isAuthenticated } from '../middleware/auth';
import { updateAccessToken } from '../controllers/user_controller';


const courseRouter=express.Router();

courseRouter.post("/create-course",updateAccessToken,isAuthenticated,authorizeRoles("admin"),uploadCourse);

courseRouter.put("/edit-course/:id",updateAccessToken,isAuthenticated,authorizeRoles("admin"),editCouse);

courseRouter.get("/get-course/:id",getSingleCourse);

courseRouter.get("/get-courses",getAllCourse);

courseRouter.get("/get-course-content/:id",updateAccessToken,isAuthenticated,getCouseByUser);

courseRouter.put("/add-question",updateAccessToken,isAuthenticated,addQuestion);

courseRouter.put("/add-answer",updateAccessToken,isAuthenticated,addedAnswer);

courseRouter.put("/add-review/:id",updateAccessToken,isAuthenticated,addReview);

courseRouter.get("/get-all-courses",updateAccessToken,isAuthenticated,authorizeRoles("admin"),getAllCourses);

courseRouter.post("/getVdoCipherOTP",generateVideoUrl)

courseRouter.delete( "/delete-course/:id",updateAccessToken,isAuthenticated,authorizeRoles("admin"),deleteCourse);

export default courseRouter;





