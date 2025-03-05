/*this code sets up a POST endpoint at /registration that will trigger the registerUser function to handle user registration logic. */

import express from 'express';
import { registerUser } from '../controllers/user_controller';
const UserRouter = express.Router();

UserRouter.post('/registration',registerUser);

export default UserRouter; // export the router