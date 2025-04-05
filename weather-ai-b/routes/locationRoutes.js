import express from 'express';
import {responseController} from '../controllers/responseController.js';

const router = express.Router();

router.get('/', responseController);

export default router;