import bcrypt from "bcrypt";
import { UsersModel } from "../models/users.model.js";
import jwt from 'jsonwebtoken' 

export async function signUp(req,res,next) {
  const {name, email, password} = req.body;
  
  if(!name || !email || !password) {
    return res.status(400).json({message:'All fields are required'})
  }
  if(typeof name!="string" || typeof email!="string" || typeof password!="string") {
    return res.status(400).json({message:'Invalid type'})
  }
  
  try {
    const userFound = await UsersModel.findOne({email:email});
    //has scope of improvement against timing attack
    if(userFound) {
      return res.status(409).json({message:'Email not available'}) //conflict
    }
  } catch (error) {
    const customError = new Error('Unexpected Error');
    customError.details = error;
    next(customError);
    return;
  }

  const hashedPassword = await bcrypt.hash(password,5);

  try {
    const user = await UsersModel.create({
      name,
      email,
      password:hashedPassword
    })
    if(!user) {
      const error = new Error('Internal Error, Try again')
      error.statusCode = 500;
      next(error);
      return;
    }
    res.status(201).json({
      message:'sign up success!'
    })
  } catch (error) {
    if(error.name === "ValidationError") {
      const customError = new Error("Invalid type")
      error.details = error;
      customError.statusCode=400
      next(customError);
    }
    else if(error.code === 11000) //Mongoose uses error code 11000 for duplicate key errors. 
    {
      const customError = new Error("Email already exists");
      customError.details = error;
      customError.statusCode=409
      next(customError);
    }
  }
}

export async function signIn(req,res,next) {
  const {email,password} = req.body;
  if(!email || !password) {
    const error = new Error('All fields are required')
    error.statusCode = 400
    next(error)
    return;
  }
  if(typeof email !="string" || typeof password!= "string") {
    const error = new Error('Invalid type')
    error.statusCode = 400;
    return next(error);
  }

  try {
    const user = await UsersModel.findOne({email})
    if(!user) {
      const error = new Error('User not found')
      error.statusCode = 404;
      return next(error);
    }
    
    const passwordMatch = await bcrypt.compare(password,user.password);
    if(passwordMatch) {
      const token = jwt.sign({
        id: user._id.toString() 
      },process.env.JWT_SECRET,)
      res.status(200).json({
        message:'sign in success',
        user:{
          _id:user.id,
          name:user.name,
          email:user.email,
          createdAt:user.createdAt,
          updatedAt:user.updatedAt,
        },
        token: token
      })
    }
    else {
      res.status(400).json({message:'Password did not match!'});
    }
  } catch (error) {
    const customError = new Error('Unexpected Error');
    customError.details = error;
    next(customError);
  }
}

export async function checkAvailableEmail(req,res) {
  const {email} = req.body;
  try {
    const response = await UsersModel.findOne({email:email})
    if(response) {
      res.status(409).json({message:'Email not available'});
    }
  } catch (error) {
    console.log('check email error',error);
  }
}

export async function getUser(req,res) {
  try {
   const currentUser = await UsersModel.findById(req.userId)
    if(!currentUser) {
      const error = new Error('User not found')
      error.statusCode = 404;
      return next(error);
    }
    res.status(200).json({
      message:'User get success',
      currentUser:{
        _id: currentUser.id, //string version of the document id(objectId)
        name: currentUser.name,
        email:currentUser.email,
      }
    })
  } catch (error) {
    const customError = new Error('Unexpected Error');
    customError.details = error;
    next(customError);
  }
}