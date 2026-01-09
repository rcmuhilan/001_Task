import express from 'express';
import { getAllUsers, createUser, getUserById, updateUser, deleteUser } from '../controllers/userContoller.js';
import validateUserInput from '../middlewares/inputValidator.js';
const router = express.Router();

// setting the user routes
router.get('/user', getAllUsers);
router.post('/user', validateUserInput, createUser);
router.get('/user/:id', getUserById);
router.put('/user/:id', validateUserInput, updateUser);
router.delete('/user/:id', deleteUser);

export default router;