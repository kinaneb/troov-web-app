import express from 'express';


const router = express.Router();

import {createUser} from '../controllers/usersController.js';

router.post('/register', createUser);

export default router;