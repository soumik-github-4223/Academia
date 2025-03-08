import express from 'express';
import { addedAnswer, addQuestion, addReview, editCouse, getAllCourse, getCouseByUser, getSingleCourse, uploadCourse } from '../controllers/course_controller';
import { authorizeRoles, isAuthenticated } from '../middleware/auth';


const courseRouter=express.Router();

courseRouter.post("/create-course",isAuthenticated,authorizeRoles("admin"),uploadCourse);

courseRouter.put("/edit-course/:id",isAuthenticated,authorizeRoles("admin"),editCouse);

courseRouter.get("/get-course/:id",getSingleCourse);

courseRouter.get("/get-courses",getAllCourse);

courseRouter.get("/get-course-content/:id",isAuthenticated,getCouseByUser);

courseRouter.put("/add-question",isAuthenticated,addQuestion);

courseRouter.put("/add-answer",isAuthenticated,addedAnswer);

courseRouter.put("/add-review/:id",isAuthenticated,addReview);



export default courseRouter;





