import mongoose from "mongoose";
import { TodosModel } from "../models/todos.model.js";

export async function getTodos(req,res) {
  const userId = req.userId;
  const objectId = new mongoose.Types.ObjectId(userId); //converts string to ObjectId
  try {
    const {status,limit}  = req.query;
    const query = {createdBy: objectId};
    if(status) { query.status = status } //check if params exists
    const Tasks = await TodosModel.find(query).limit(parseInt(limit) || 10);
    res.status(200).json(Tasks); 
  } catch (error) {
    console.log(error);
    next(error)
  }
} 


export async function addTodo(req,res,next) {
  const {title,isCompleted,...rest} = req.body;

  if(!title || typeof isCompleted=="undefined") {
    const customError = new Error("All fields are required")
    customError.statusCode = 400
    return next(customError);
  }

  if(typeof req.body.title!=='string' || typeof req.body.isCompleted!=="boolean") {
    console.log('body type is invalid')
    const customError = new Error('Invalid type')
    customError.statusCode=400;
    next(customError); // Manually pass error to middleware
    return;
  }

  try{
    const todo = await TodosModel.create({
      title,isCompleted,createdBy:req.userId,...rest
    })
  }catch(error){
    error.statusCode=500
    next(error);
  }
}
export async function updateTodo(req,res,next) {
  const id= req.params.id.replace(':','')

  const {title,isCompleted} = req.body;
  if(typeof title!="string" || typeof isCompleted == "undefined") {
    const customError = new Error('Invalid type')
    customError.statusCode = 400
    next(customError);
    return;
  }
  try {
      const updatedTodo = await TodosModel.findByIdAndUpdate(id,req.body,{new:true})
      //{ new: true }: This option ensures that the function returns the updated version of the document. Without { new: true }, Mongoose would return the old version (before the update).
      res.status(200).json({
        message:'Todo update success',
        updatedTodo
      })
  } catch (error) {
    error.statusCode = error.statusCode || 500
    next(error);
  }
}

export async function deleteTodo(req,res,next) {
  const id = req.params.id.replace(':','');
  if(!mongoose.isValidObjectId(id)) {
    const customError = new Error('Invalid todo id')
    customError.statusCode = 400;
    next(customError)
  }
  try{
    const deletedTodo = await TodosModel.findByIdAndDelete(id); //If no document is found with the provided ID, it returns null.
    if(!deletedTodo) {
      const customError = new Error("Todo not found")
      customError.statusCode = 500
      next(customError);
      return;
    }
    res.status(200).json({
      message:'Todo Delete success',
      deletedTodo
    })
  }catch(error) {
    error.statusCode = 500
    next(error)
  }
}