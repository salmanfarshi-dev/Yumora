import { createSlice } from '@reduxjs/toolkit'

export const bradcrumb = createSlice({
  name: 'breads',
  initialState: {
    currentvalue: "",
    previousvalue:""
  },
  reducers: {
    addbradcrumb: (state,action) => {
     state.previousvalue=state.currentvalue
      state.currentvalue= action.payload
    },
  
  },
})


export const {  addbradcrumb, } = bradcrumb.actions

export default bradcrumb.reducer