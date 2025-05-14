"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserRoleService = exports.getAllUsersService = exports.getUserById = void 0;
const user_model_1 = require("../models/user_model");
const redis_1 = require("../utils/redis");
//get user by id
const getUserById = async (id, res) => {
    const userJSON = await redis_1.redis.get(id); // find user from redis, no need to search in actual db
    if (userJSON) {
        const user = JSON.parse(userJSON);
        res.status(201).json({
            success: true,
            user
        });
    }
};
exports.getUserById = getUserById;
//get all users
const getAllUsersService = async (res) => {
    const users = await user_model_1.userModel.find().sort({ createdAt: -1 });
    res.status(201).json({
        success: true,
        users
    });
};
exports.getAllUsersService = getAllUsersService;
//updte user role
const updateUserRoleService = async (res, id, role) => {
    const user = await user_model_1.userModel.findByIdAndUpdate(id, { role }, { new: true });
    res.status(201).json({
        success: true,
        user
    });
};
exports.updateUserRoleService = updateUserRoleService;
