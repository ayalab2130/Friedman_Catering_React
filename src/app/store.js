 import {configureStore} from "@reduxjs/toolkit";
import basketSlice from "./features/order/basketSlice";
import productsSlice from "./features/products/productsSlice";
import userSlice from "./features/user/userSlice";




 export const store=configureStore({
    reducer:{
        products:productsSlice,
        basket:basketSlice,
        user:userSlice,

    }
 })
