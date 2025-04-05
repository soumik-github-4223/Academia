import express from 'express'
import { authorizeRoles, isAuthenticated } from '../middleware/auth'
import { getNotifications, updateNotification } from '../controllers/notification_controller'
import { updateAccessToken } from '../controllers/user_controller';

const notificationRoute=express.Router()


notificationRoute.get("/get-all-notifications",updateAccessToken,isAuthenticated,authorizeRoles("admin"),getNotifications);

notificationRoute.put("/update-notification/:id",updateAccessToken,isAuthenticated,authorizeRoles("admin"),updateNotification);

export default notificationRoute