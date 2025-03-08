/*this code sets up a POST endpoint at /registration that will trigger the registerUser function to handle user registration logic. */

import express from 'express';
import { activateUser, getUserInfo, loginUser, logoutUser, registerUser, socialAuth, updateAccessToken, updatePassword, updateProfilePic, updateUserInfo } from '../controllers/user_controller';
import { authorizeRoles, isAuthenticated } from '../middleware/auth';
const UserRouter = express.Router();

UserRouter.post('/registration',registerUser);

UserRouter.post('/activate-user',activateUser);

UserRouter.post('/login',loginUser);

UserRouter.get('/logout',isAuthenticated,authorizeRoles("admin"),logoutUser); // isAuthenticated middleware is used to protect the route

UserRouter.get("/refresh",updateAccessToken);

UserRouter.get("/me",isAuthenticated,getUserInfo);

UserRouter.post("/socialauth",socialAuth);

UserRouter.put("/update-user-info",isAuthenticated,updateUserInfo);

UserRouter.put("/update-user-password",isAuthenticated,updatePassword);

UserRouter.put("/update-user-profilepic",isAuthenticated,updateProfilePic);

export default UserRouter; // export the router