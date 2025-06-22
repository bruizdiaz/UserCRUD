import express from 'express';
import {
	createUser,
	deleteUser,
	getAllUsers,
	getUserByID,
	updateUser,
} from '../controllers/user.controller.js';
import { findUserById } from '../middleware/user.middleware.js';

const router = express.Router();

router.get('/', getAllUsers);
router.get('/:id', findUserById, getUserByID);
router.post('/create', createUser);
router.put('/update/:id', findUserById, updateUser);
router.delete('/delete/:id', findUserById, deleteUser);

export default router;
