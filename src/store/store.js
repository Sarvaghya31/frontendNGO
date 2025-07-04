import {configureStore} from '@reduxjs/toolkit';
import authSliceReducer from './authSlice';
import issueSliceReducer from './issueSlice'

const store=configureStore({
  reducer:{
    auth : authSliceReducer,
    issue : issueSliceReducer
  }
})
export default store;