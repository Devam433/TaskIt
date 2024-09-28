import mongoose from "mongoose";
import { TodosModel } from "../models/todos.model.js";

export async function getTodos(req,res) {
  const userId = req.userId;
  const objectId = new mongoose.Types.ObjectId(userId); //converts string to ObjectId
  try {
    const {status,limit}  = req.query;
    console.log('this is status',status)
    const query = {createdBy: objectId};
    if(status) { query.status = status } //check if params exists
    console.log('this is the query', query)
    const Tasks = await TodosModel.find(query).limit(parseInt(limit) || 10);
    console.log('queried task',Tasks)
    res.status(200).json(Tasks); 
  } catch (error) {
    console.log(error);
  }
} 


export async function addTodo(req,res) {
  const {title,isCompleted,...rest} = req.body;

  if(!title || typeof isCompleted=="undefined") {
    res.status(400);
    throw new Error("All fields are required");
  }

  if(typeof req.body.title!=='string' || typeof req.body.isCompleted!=="boolean") {
    res.status(400);
    throw new Error("Invalid type");
  }

  const todo = await TodosModel.create({
    title,isCompleted,createdBy:req.userId,...rest
  })

  res.status(201).json({
    message:'Document successfully created',
    todo
  })
}
export async function updateTodo(req,res) {
  // const id = req.params.id;
  const id= req.params.id.replace(':','')
  console.log('id of task',id)

  const {title,isCompleted} = req.body;
  if(typeof title!="string" || typeof isCompleted == "undefined") {
    res.status(400)
    throw new Error('Invalid type')
  }
  try {
      const updatedTodo = await TodosModel.findByIdAndUpdate(id,req.body,{new:true})
      //{ new: true }: This option ensures that the function returns the updated version of the document. Without { new: true }, Mongoose would return the old version (before the update).
      res.status(200).json({
        message:'Todo update success',
        updatedTodo
      })
  } catch (error) {
    console.log(error);
  }
}

export async function deleteTodo(req,res) {
  const id = req.params.id.replace(':','');
  if(!mongoose.isValidObjectId(id)) {
    res.status(400)
    throw new Error("Invalid Id")
  }
  const deletedTodo = await TodosModel.findByIdAndDelete(id);
  if(!deletedTodo) {
    res.status(404)
    throw new Error("Todo not found")
  }

  res.status(200).json({
    message:'Todo Delete success',
    deletedTodo
  })
}