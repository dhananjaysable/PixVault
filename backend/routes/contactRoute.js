import express from 'express'
import { contactMe } from '../controllers/contactController.js';

const contactRouter = express.Router();

contactRouter.post('/', contactMe);

export default contactRouter;