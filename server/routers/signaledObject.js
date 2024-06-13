import express from 'express';

const router = express.Router();

import {createSignaledObject, allSignaledObjects, getSignaledObject, updateSignaledObject, deleteSignaledObject} from '../controllers/signaledObjectController.js';

router.get('', allSignaledObjects);

router.get('/:id', getSignaledObject);

router.post('/', createSignaledObject);

router.put('/:id', updateSignaledObject);

router.delete('/:id', deleteSignaledObject);

export default router;