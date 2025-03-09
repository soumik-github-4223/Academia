import express from "express";
import { authorizeRoles, isAuthenticated } from "../middleware/auth";
import { getCourseAnalytics, getOrderAnalytics, getUserAnalytics } from "../controllers/analytics_controller";

const analyticsRouter=express.Router();

analyticsRouter.get("/get-user-analytics",isAuthenticated,authorizeRoles("admin"),getUserAnalytics);


analyticsRouter.get("/get-order-analytics",isAuthenticated,authorizeRoles("admin"),getOrderAnalytics);


analyticsRouter.get("/get-course-analytics",isAuthenticated,authorizeRoles("admin"),getCourseAnalytics);





export default analyticsRouter;