import express from 'express'
import { authorizeRoles, isAuthenticated } from '../middleware/auth'
import { getNotifications } from '../controllers/notification_controller'

const notificationRoute=express.Router()


notificationRoute.get("/get-all-notifications",isAuthenticated,authorizeRoles("admin"),getNotifications);

export default notificationRoute