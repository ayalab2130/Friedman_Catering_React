import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const finishOrder = createAsyncThunk("enter finish order", async () => {
    await axios.post("http://localhost:4000/order/");///add to db the state.orderDetails and arrBasket
});

export const saveBasket=createAsyncThunk("save basket",async(item)=>{
let res= await axios.put("http://localhost:4545/api/user/updateCartUser",item);
return res.data;
});


const initialState = {
    orderDetails: {
        OrderDate: "",
        phon: "",
        giveDate: "",
        address: ""
    },
    arrBasket: (JSON.parse(localStorage.getItem("currentUser")))?.ShoppingCart||[],
    // arrBasket: [],
    status: "idle",
    price: 0,
    amount: 0,
    // to think 
    // showSmallBasket:false,
}
const basketSlice = createSlice({
    name: "basket",
    initialState,
    reducers: {
        UpdateOrderDetails: (state, action) => {
            state.orderDetails = { ...action.payload }
        },
        addProductToBasket: (state, action) => {
            let index = state.arrBasket.findIndex(item => item.id === action.payload.id)
            if (index === -1)
                state.arrBasket.push({ ...action.payload, qty: 1 })
            else
                state.arrBasket[index].qty++;
            state.price += action.payload.price;
            state.amount++;
        },
        removeProductFromBasket: (state, action) => {
            let index = state.arrBasket.findIndex(item => item.id === action.payload);
            let p = state.arrBasket[index].price;
            let a = state.arrBasket[index].qty;
            state.arrBasket.splice(index, 1);
            state.price -= p * a;
            state.amount -= a;
        },
        enterBasket:(state,action)=>{
            console.log(action.payload);
            state.arrBasket=action.payload;

        },
        reasetBasket:(state,action)=>{
            state.arrBasket=[];
            state.price =0 ;
            state.amount = 0;
        },
        decProductFromBasket: (state, action) => {
            let index = state.arrBasket.findIndex(item => item.id === action.payload);
            if (state.arrBasket[index].qty === 1) {
                let p = state.arrBasket[index].price;
                let a = state.arrBasket[index].qty;
                state.arrBasket.splice(index, 1);
                state.price -= p * a;
                state.amount -= a;
            }

            else {
                state.arrBasket[index].qty--;
                state.price -= state.arrBasket[index].price;
                state.amount -= 1;
            }
            }
    }
    , extraReducers: (builder) => {
        builder.addCase(saveBasket.fulfilled, (state, action) => {
            state.status = "fulfilled";
            state.price=0;
            state.amount=0;
            state.arrBasket=[];
           
           console.log("i save the basket");
        }).addCase(saveBasket.rejected, (state, action) => {
            state.status = "error";
        })
            .addCase(saveBasket.pending, (state, action) => {
                state.status = "pending";
            })

            
    }
});

export const { UpdateOrderDetails, removeProductFromBasket, addProductToBasket, decProductFromBasket,enterBasket,reasetBasket} = basketSlice.actions;
export default basketSlice.reducer;