import express from 'express'
import { deleteOneImage, getAllImages, getOneImage, uploadImage } from '../controllers/imageController.js';
import { upload } from '../config/multerConfig.js';
import { authUser } from '../middlewares/authUser.js';

const imageRouter = express.Router();

imageRouter.post('/', authUser, upload.single('file'), uploadImage);
imageRouter.get('/images', authUser, getAllImages);
imageRouter.get('/image/:id', authUser, getOneImage);
imageRouter.delete('/image/:id', authUser, deleteOneImage);


export default imageRouter;