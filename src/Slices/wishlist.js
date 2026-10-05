import { createSlice } from '@reduxjs/toolkit'

export const Wishlist = createSlice({
  name: 'wishlist',
  initialState: {
    value: []
  },
  reducers: {
   addwishlist: (state, action) => {
  let found = false;

  state.value.forEach((item, index) => {
    if (item.id === action.payload.id) {
      state.value.splice(index, 1);
      found = true;
    }
  });

  if (!found) {
    state.value.push(action.payload);
  }
},
  
  },
})


export const {  addwishlist, } = Wishlist.actions

export default Wishlist.reducer