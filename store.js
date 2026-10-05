import { configureStore } from '@reduxjs/toolkit'
import Bradcrumb from './src/Slices/bradcrumb'
import cartslice from './src/Slices/addtocartSlice'
import  Wishlist  from './src/Slices/wishlist'

export default configureStore({
  reducer: {
    bradcrumb: Bradcrumb,
    cartitem: cartslice,
    Wishlist:Wishlist,
  },
})