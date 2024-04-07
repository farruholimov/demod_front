import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../utils/axios'
import Cookies from 'js-cookie'

const initialState = {
   data: [],
   status: 'idle',
   error: null,
   progress: 0,
};
export const getDesignerProfile = createAsyncThunk('/users/:username', async (username: string) => {
   const response = await api.get(`users/${username}`)
   return response.data
})

const designerProfile = createSlice({
   name: 'designerProfile',
   initialState,
   reducers: {
      resetMyProfile() {
         return {
            ...initialState
         }
      },
   },
   extraReducers(builder) {
      builder
         .addCase(getDesignerProfile.pending, (state?: any, action?: any) => {
            state.status = 'loading'
         })
         .addCase(getDesignerProfile.fulfilled, (state?: any, action?: any) => {
            state.progress = 20
            state.status = 'succeeded'
            // Add any fetched posts to the array;
            state.data = [];
            state.data = state.data.concat(action.payload)
            state.progress = 100
         })
         .addCase(getDesignerProfile.rejected, (state?: any, action?: any) => {
            state.status = 'failed'
            state.error = action.error.message
         })
   }
});

export const { resetMyProfile } = designerProfile.actions;
export const reducer = designerProfile.reducer;
export const selectDesignerProfile = (state: any) => state?.get_designer?.data[0]?.data?.user
export default designerProfile