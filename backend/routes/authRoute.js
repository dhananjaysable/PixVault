import { Router } from "express";
import { getUser, login, logout, register } from "../controllers/authController.js";
import { authUser } from "../middlewares/authUser.js";

const authRouter = Router()

authRouter.post('/register', register)
authRouter.post('/login', login)
authRouter.post('/logout', logout)
authRouter.get('/check-auth', authUser, getUser)

export default authRouter;
