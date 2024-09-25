import express from "express";
import { checkAvailableEmail, getUser, signIn, signUp } from "../controllers/usersController.js";

const router = express.Router();

router.route('/signup').post(signUp)
router.route('/signin').post(signIn)
router.route('/me').get(getUser)
router.route('/checkAvailaleEmail').post(checkAvailableEmail);
export default router;