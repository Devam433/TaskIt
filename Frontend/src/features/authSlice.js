import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//add async middleware to handle async api logic
const initialState = {
  userData:null,
  isActive:false,
  status:'idel',
  error:null
}

export const signinThunk = createAsyncThunk('user/signin',async (payload,{rejectWithValue})=>{
  const {email,password} = payload
  try {
    const response = await axios.post('/api/users/signin',{email:email,password: password})
    localStorage.setItem('token',response.data.token)
    return response.data
  } catch (error) {
    console.log('error while signing in!', error);
    return rejectWithValue(error.response);
  }
})


const authSlice = createSlice({
  name:'auth',
  initialState,
  reducers:{},
  extraReducers:(builder)=>{
    builder
    .addCase(signinThunk.pending,(state)=>{
      state.status='loading'
      state.error=null
    })
    .addCase(signinThunk.fulfilled,(state,action)=>{
      state.userData=action.payload.user;
      state.status='fulfilled',
      state.isActive=true
      state.error=null
    })
    .addCase(signinThunk.rejected,(state,action)=>{
      console.log(action.payload.data.meaage)
      state.error = action.payload.data.message,
      state.status='failed'
    })
  }
})

export const {login,logout} = authSlice.actions;
export default authSlice.reducer;