import express from "express";
import { getUser, signIn, signUp } from "../controllers/usersController.js";

const router = express.Router();

router.route('/signup').post(signUp)
router.route('/signin').post(signIn)
router.route('/me').get(getUser)

export default router;