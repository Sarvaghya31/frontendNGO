import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    status:false,
    loginData:null,
    isNGO:false,
    isUser:false
}

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        logout:(state)=>{
            state.status = false;
            state.loginData = null;
            state.isNGO=false;
            state.isUser=false;
        },
        NGOLogin:(state,action)=>{
            state.isNGO=true;
            state.status=true;
            state.loginData =action.payload;
        },
        UserLogin:(state,action)=>{
            state.isUser=true;
            state.status=true;
            state.loginData=action.payload;
        }
    }
})

export const {NGOLogin,logout,UserLogin} = authSlice.actions;

export default authSlice.reducer;

