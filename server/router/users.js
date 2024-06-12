import express from 'express';


const router = express.Router();

import {allUsers, createUser, deleteUser, getUser, updateUser} from '../controllers/usersController.js';

router.post('/register', createUser);

export default router;