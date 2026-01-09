// standardized response function
import { createUserService, deleteUserService, getAllUsersService, getUserByIdService, updateUserService } from '../models/userModel.js';

// response handler
const handleResponse = (res, status, message, data=null) => {
    res.status(status).json({
        status,
        message,
        data
    });
};
// creating user
export const createUser = async (req, res, next) => {
    const {name, email} = req.body;
    try {
        const newUser = await createUserService(name, email);
        handleResponse(res, 201, 'User Created Successfully', newUser);
    } catch (err) {
        next(err);
    };
};
// getting all user
export const getAllUsers = async (req, res, next) => {
    try {
        const users = await getAllUsersService();
        handleResponse(res, 200, 'Users Fetched Successfully', users);
    } catch (err) {
        next(err);
    };
};
// getting user by id
export const getUserById = async (req, res, next) => {
    try {
        const user = await getUserByIdService(req.params.id);
        if (!user) return handleResponse(res, 404, 'User Not Found');
        handleResponse(res, 200, 'User Fetched Successfully', user);
    } catch (err) {
        next(err);
    };
};
// updating user by id
export const updateUser = async (req, res, next) => {
    const {name, email} = req.body;
    try {
        const updatedUser = await updateUserService(req.params.id, name, email);
        if (!updatedUser) return handleResponse(res, 404, 'User Not Found');
        handleResponse(res, 200, 'User Updated Successfully', updatedUser);
    } catch (err) {
        next(err);
    };
};
// deleting user by id
export const deleteUser = async (req, res, next) => {
    try {
        const deletedUser = await deleteUserService(req.params.id);
        if (!deletedUser) return handleResponse(res, 404, 'User Not Found');
        handleResponse(res, 201, 'User Deleted Successfully', deletedUser);
    } catch (err) {
        next(err);
    };
};