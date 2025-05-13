import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchTasks = createAsyncThunk('get/todos',async (payload,rejectWithValue)=>{

  try {
    const response = await axios.get('/api/todos',{
      headers:{
        'token': localStorage.getItem('token')
      }
    })  
    return response.data;
  } catch (error) {
    console.log(error)
    rejectWithValue(error)
  }
})

export const addTask = createAsyncThunk('post/todos',async (payload,rejectWithValue)=>{
  try {
    const response = await axios.post('/api/todos',payload,{
      headers:{
        'token': localStorage.getItem('token')
      }
    })  
  } catch (error) {
    console.log('failed to add task')
    rejectWithValue(error)
  }
})

export const getTasksByStatus = createAsyncThunk('getCompleted/todos',async (payload,rejectWithValue)=>{
  const status = payload.status;
  try {
    const response = await axios.get(`/api/todos`,{
      params:{status},
      headers:{'token' : localStorage.getItem('token')}
    })
    if(response) {
      return response.data;
    }
  } catch (error) {
    rejectWithValue(error);
  }
})

const tasksSlice = createSlice({
  name:'tasks',
  initialState:{allTasks:null,tasksByStatus:null,status:'idel',error:null},
  reducers:{},
  extraReducers:(builder)=>{
    builder
    .addCase(fetchTasks.fulfilled,(state,action)=>{
      // Clone the array to avoid mutating the original state directly
      const updatedTasks = [...action.payload];
      // Sort the tasks: move checked (completed) tasks to the bottom
      updatedTasks.sort((a, b) => {
        // If a is not completed and b is completed, a should come before b
        if (a.status !== 'Completed' && b.status === 'Completed') return -1;
        // If a is completed and b is not, b should come before a
        if (a.status === 'Completed' && b.status !== 'Completed') return 1;
        // If both are the same status, maintain the original order
        return 0;
      });
      state.allTasks = updatedTasks;
      state.error=null;
      state.status='fulfilled'
    })
    .addCase(fetchTasks.pending,(state)=>{
      state.status='loading'
    })
    .addCase(fetchTasks.rejected,(state,action)=>{
      // console.log(action.payload.data.meaage)
      state.error=action.error;
      state.status='failed'
    })
    .addCase(getTasksByStatus.fulfilled,(state,action)=>{
      state.tasksByStatus = action.payload;
      state.status = 'fulfilled'
      state.error = null;
    })
    .addCase(getTasksByStatus.pending,(state,action) =>{
      state.status = 'loading'
    })
    .addCase(getTasksByStatus.rejected,(state,action) =>{
      state.status = 'failed',
      state.error = action.error;
    })
  }
})

export default tasksSlice.reducer