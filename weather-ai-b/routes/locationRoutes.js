import express from 'express';
import {handleLocation} from '../controllers/locationController.js';

const router = express.Router();

router.post('/', handleLocation);

export default router;