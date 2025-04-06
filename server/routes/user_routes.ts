/*this code sets up a POST endpoint at /registration that will trigger the registerUser function to handle user registration logic. */

import express from 'express';
import { activateUser, deleteUser, getAllUsers, getUserInfo, loginUser, logoutUser, registerUser, socialAuth, updateAccessToken, updatePassword, updateProfilePic, updateUserInfo, updateUserRole } from '../controllers/user_controller';
import { authorizeRoles, isAuthenticated } from '../middleware/auth';
const UserRouter = express.Router();

UserRouter.post('/registration',registerUser);

UserRouter.post('/activate-user',activateUser);

UserRouter.post('/login',loginUser);

UserRouter.get('/logout',isAuthenticated,logoutUser); // isAuthenticated middleware is used to protect the route

UserRouter.get("/refresh",updateAccessToken);

UserRouter.get("/me",isAuthenticated,getUserInfo);

UserRouter.post("/socialauth",socialAuth);

UserRouter.put("/update-user-info",isAuthenticated,updateUserInfo);

UserRouter.put("/update-user-password",isAuthenticated,updatePassword);

UserRouter.put("/update-user-profilepic",isAuthenticated,updateProfilePic);

UserRouter.get("/get-all-users", updateAccessToken,isAuthenticated,authorizeRoles("admin"),getAllUsers);

UserRouter.put( "/update-user-role",isAuthenticated,authorizeRoles("admin"),updateUserRole);

UserRouter.delete( "/delete-user/:id", updateAccessToken,isAuthenticated,authorizeRoles("admin"),deleteUser);


export default UserRouter; // export the router