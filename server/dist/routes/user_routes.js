"use strict";
/*this code sets up a POST endpoint at /registration that will trigger the registerUser function to handle user registration logic. */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user_controller");
const auth_1 = require("../middleware/auth");
const UserRouter = express_1.default.Router();
UserRouter.post('/registration', user_controller_1.registerUser);
UserRouter.post('/activate-user', user_controller_1.activateUser);
UserRouter.post('/login', user_controller_1.loginUser);
UserRouter.get('/logout', auth_1.isAuthenticated, user_controller_1.logoutUser); // isAuthenticated middleware is used to protect the route
UserRouter.get("/refresh", user_controller_1.updateAccessToken);
UserRouter.get("/me", auth_1.isAuthenticated, user_controller_1.getUserInfo);
UserRouter.post("/socialauth", user_controller_1.socialAuth);
UserRouter.put("/update-user-info", auth_1.isAuthenticated, user_controller_1.updateUserInfo);
UserRouter.put("/update-user-password", auth_1.isAuthenticated, user_controller_1.updatePassword);
UserRouter.put("/update-user-profilepic", auth_1.isAuthenticated, user_controller_1.updateProfilePic);
UserRouter.get("/get-all-users", user_controller_1.updateAccessToken, auth_1.isAuthenticated, (0, auth_1.authorizeRoles)("admin"), user_controller_1.getAllUsers);
UserRouter.put("/update-user-role", auth_1.isAuthenticated, (0, auth_1.authorizeRoles)("admin"), user_controller_1.updateUserRole);
UserRouter.delete("/delete-user/:id", user_controller_1.updateAccessToken, auth_1.isAuthenticated, (0, auth_1.authorizeRoles)("admin"), user_controller_1.deleteUser);
exports.default = UserRouter; // export the router
