import {createAsyncThunk,createSlice} from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllProducts=createAsyncThunk("get all products",async(thunkAPI)=>
{console.log("i come to fetchAllProducts");
    let res=await axios.get("http://localhost:4545/api/product");


return res.data;
});

export const fetchProductById=createAsyncThunk("get product by id",async(id,thunkAPI)=>
{let res=await axios.get("http://localhost:4000/product/"+id);
return res.data;
});
export const fetchProductByCategory=createAsyncThunk("get product by category",async(category,thunkAPI)=>
{let res=await axios.get("http://localhost:4000/product/"+category);
return res.data;
});


export const addProductByDirector = createAsyncThunk("add product by director", async (item,thunkAPI) => {
    // await axios.post("http://localhost:4000/product/",item);///add product by director to db
    let res=await axios.post("http://localhost:4545/api/product/addProduct",item);///add product by director to db
    return res.data;
});

export const deleteProductById = createAsyncThunk("delete product by director by id", async (item,thunkAPI) => {
    let res= await axios.delete("http://localhost:4545/api/product/deleteUser"+item.productId);///delete product by director by id
    return res.data;
 });
 export const updateProduct = createAsyncThunk("update product by director ", async (item,thunkAPI) => {
     let res= await axios.put("http://localhost:4545/api/product/updateProduct",item);///update product by director
     return res.data;
  });





const initialState={
    productArr:[],
    status:"idle",
    statusArr:"idle",
    

}

const productSlice=createSlice({
    name:"product",
    initialState,
    reducers:{
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchAllProducts.fulfilled,(state,action)=>{
            state.productArr=action.payload;
            state.statusArr="fulfilled";
        }).addCase(fetchAllProducts.rejected,(state,action)=>{
            state.status="error";
        }).addCase(fetchAllProducts.pending,(state,action)=>{
            state.status="pending";
        }).addCase(fetchProductById.fulfilled,(state,action)=>{
            state.productArr=action.payload;
            state.status="fulfilled";
        }).addCase(fetchProductById.rejected,(state,action)=>{
            state.status="error";
        }).addCase(fetchProductById.pending,(state,action)=>{
            state.status="pending";
        }).addCase(fetchProductByCategory.fulfilled,(state,action)=>{
            state.productArr=action.payload;
            state.status="fulfilled";
        }).addCase(fetchProductByCategory.rejected,(state,action)=>{
            state.status="error";
        }).addCase(fetchProductByCategory.pending,(state,action)=>{
            state.status="pending";
        }).addCase(addProductByDirector.fulfilled,(state,action)=>{
            state.status="fulfilled";
            console.log(state.status) ;
            state.productArr.push(action.payload);   
        }).addCase(addProductByDirector.rejected,(state,action)=>{
            state.status="error";
            console.log(state.status)
        }).addCase(addProductByDirector.pending,(state,action)=>{
            state.status="pending";
            console.log(state.status)
        }).addCase(deleteProductById.fulfilled,(state,action)=>{
            state.status="fulfilled";
            console.log(state.status);
            let index=state.productArr.findIndex(st=>st.productId==action.payload.productId);
            state.productArr.splice(index,1);
                
        })
        .addCase(deleteProductById.rejected,(state,action)=>{
            state.status="error";
            console.log(state.status)
        }).addCase(deleteProductById.pending,(state,action)=>{
            state.status="pending";
            console.log(state.status)
        }) .addCase(updateProduct.fulfilled,(state,action)=>{
            state.status="fulfilled";
            console.log(state.status);
            let index=state.productArr.findIndex(i=>i.productId==action.payload.productId);
            state.productArr.splice(index,1);
            state.productArr.push(action.payload);   

        }).addCase(updateProduct.rejected,(state,action)=>{
            state.status="error";
            console.log(state.status)
        }).addCase(updateProduct.pending,(state,action)=>{
            state.status="pending";
            console.log(state.status)
        }) 
        
    }
});

export const{}=productSlice.actions;
export default productSlice.reducer;

