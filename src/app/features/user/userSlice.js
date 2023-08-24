import {createAsyncThunk,createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { enterBasket } from "../order/basketSlice";


export const validation = createAsyncThunk("Username and password verification", async (item,thunkAPI) => {
    let res= await axios.get("http://localhost:4545/api/user/getUser"+item.userName+"/password"+item.password);
    return res.data;
});

export const fetchAllUsers = createAsyncThunk("get all users", async (thunkAPI) => {
    console.log(" i come to fetch-all-users")
    let res= await axios.get("http://localhost:4545/api/user/");
    return res.data;
});
export const addUser = createAsyncThunk("add user", async (item,thunkAPI) => {
    console.log(item);
    let res=await axios.post("http://localhost:4545/api/user/addUser",item);///add user 
    return res.data;
});
export const updateUser = createAsyncThunk("updateUser user", async (user,thunkAPI) => {
    
    let res=await axios.put("http://localhost:4545/api/user/updateUser",user);///add user 
    console.log("res.data",res.data);
    return res.data;
});



const initialState={
   currentUser: JSON.parse(localStorage.getItem("currentUser"))||null ,
//    userExists:false,
   usersArr:[],
   statusUsersArr:"idle",
//    status:"idel"
   }


   const userSlice=createSlice({
    name:"user",
    initialState,
    reducers:{
        removeCurrntUser:(state,action)=>{
            state.currentUser=null;
        },

        },
        extraReducers:(builder)=>{
            builder.addCase(validation.fulfilled,(state,action)=>{
                console.log("fulfilled on validation")
                if(action.payload.length==0)
                alert("אחד מהפרטים שהזנת שגוי אנא נסה שנית")
                else{
                localStorage.setItem('currentUser',JSON.stringify(action.payload[0]))
                state.currentUser=action.payload[0] ;
            alert(" ברוך הבא  " +state.currentUser.userName)
        }
            }).addCase(validation.rejected,(state,action)=>{
                // מה הוא מחזיר?????????????????
                console.log("error fron ")
            }).addCase(validation.pending,(state,action)=>{
                console.log("pending on validation")
            }).addCase(fetchAllUsers.fulfilled,(state,action)=>{
                state.statusUsersArr="fulfilled";
                state.usersArr=action.payload; 
            }).addCase(fetchAllUsers.rejected,(state,action)=>{
                // state.status="error";
                console.log("error") 
            }).addCase(fetchAllUsers.pending,(state,action)=>{
                // state.status="pending";
                console.log("pending") 
            }).addCase(addUser.fulfilled,(state,action)=>{
                localStorage.setItem('currentUser',JSON.stringify(action.payload))
                state.currentUser=action.payload ;
            }).addCase(addUser.rejected,(state,action)=>{
                console.log("error") 
            }).addCase(addUser.pending,(state,action)=>{
                console.log("pending") 
            }).addCase(updateUser.fulfilled,(state,action)=>{
                localStorage.setItem('currentUser',JSON.stringify(action.payload))
                state.currentUser=action.payload;
            // alert(" עדכן בהצלחה " +state.currentUser.userName)
                console.log(action.payload);
            }).addCase(updateUser.rejected,(state,action)=>{
                console.log("error") 
            }).addCase(updateUser.pending,(state,action)=>{
                console.log("pending") 
            })
            
        }

    },

);

export const{removeCurrntUser}=userSlice.actions;
export default userSlice.reducer;

