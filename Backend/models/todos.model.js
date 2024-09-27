import mongoose, { Types } from "mongoose";

//creates a shhema for our todos document
const todosSchema = new mongoose.Schema(
  {
    title:{
      type: String,
      required: true,
    },
    isCompleted:{
      type: Boolean,
      default:false,
      required: true,
    },
    status:{
      type:String,
      default:'Not Started',
    },
    priority:{
      type:String,
      required:true
    },
    finishBy:{
      type:Date
    },
    tags:{
      type:String
    },
    createdBy:{
      type: mongoose.Schema.Types.ObjectId,
      ref:"Users",
      required: true
    }
  },
  { //mongoos with auto add it in our schema
    timestamps: true
  }
)

//create a model using the above schema
export const TodosModel = mongoose.model("Todos",todosSchema)