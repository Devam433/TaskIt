import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchTasks = createAsyncThunk('get/todos',async (payload,rejectWithValue)=>{
  try {
    const response = await axios.get('/api/todos',{
      headers:{
        'token': localStorage.getItem('token')
      }
    })  
    console.log(response);
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

    console.log(response);
    fetchTasks();
    return response.data;
  } catch (error) {
    console.log(error)
    rejectWithValue(error)
  }
})

const tasksSlice = createSlice({
  name:'tasks',
  initialState:{allTasks:null,status:'idel',error:null},
  reducers:{},
  extraReducers:(builder)=>{
    builder
    .addCase(fetchTasks.fulfilled,(state,action)=>{
      state.allTasks = action.payload;
      state.error=null;
      state.status='fulfilled'
    })
    .addCase(fetchTasks.pending,(state)=>{
      state.status='loading'
    })
    .addCase(fetchTasks.rejected,(state,action)=>{
      console.log(action.payload.data.meaage)
      state.error=action.error;
      state.status='failed'
    })

  }
})

export default tasksSlice.reducer