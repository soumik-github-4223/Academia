/*this code sets up a POST endpoint at /registration that will trigger the registerUser function to handle user registration logic. */

import express from 'express';
import { activateUser, loginUser, logoutUser, registerUser } from '../controllers/user_controller';
const UserRouter = express.Router();

UserRouter.post('/registration',registerUser);

UserRouter.post('/activate-user',activateUser);

UserRouter.post('/login',loginUser);

UserRouter.get('/logout',logoutUser);

export default UserRouter; // export the router