import express from 'express';
import { editCouse, getAllCourse, getSingleCourse, uploadCourse } from '../controllers/course_controller';
import { authorizeRoles, isAuthenticated } from '../middleware/auth';


const courseRouter=express.Router();

courseRouter.post("/create-course",isAuthenticated,authorizeRoles("admin"),uploadCourse);

courseRouter.put("/edit-course/:id",isAuthenticated,authorizeRoles("admin"),editCouse);

courseRouter.get("/get-course/:id",getSingleCourse);

courseRouter.get("/get-courses",getAllCourse);

export default courseRouter;





