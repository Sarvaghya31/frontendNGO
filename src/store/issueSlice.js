import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    issues:[]
}

const issueSlice=createSlice({
  name:"issue",
  initialState,
  reducers:{
    updateIssues:(state,action)=>{
        state.issues=action.payload
    }
  }
})

export const {updateIssues} = issueSlice.actions;
export default issueSlice.reducer;