import express from 'express';


const router = express.Router();

import {createUser, userLogin} from '../controllers/usersController.js';

router.post('/register', createUser);

router.post('/login', userLogin);

export default router;