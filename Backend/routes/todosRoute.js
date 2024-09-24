import express from "express";
import { addTodo, deleteTodo, getTodos, updateTodo } from "../controllers/todosController.js";

const router = express.Router();

router.route('/').get(getTodos)
router.route('/').post(addTodo);
router.route('/:id').put(updateTodo)
router.route('/:id').delete(deleteTodo)
export default router