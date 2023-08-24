import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch} from "react-redux";
import { useNavigate } from 'react-router-dom';
import {validation}from "./userSlice"
import {enterBasket}from "../order/basketSlice"

const Login = () => {
    let {register,
        handleSubmit,
    formState:{
        errors,
        isValid }}=useForm({
            mode:"noTouched",
        })
        let disp=useDispatch();
        let nav=useNavigate();
  
      
      
      
       const submittionFunc=(data)=>{
        if(!isValid){
            console.log("is not valid")
            return;
        }
        disp(validation(data)).then(function(){
            disp(enterBasket((JSON.parse(localStorage.getItem("currentUser"))).ShoppingCart))
            nav("/")
        });
      }

    return (  <form onSubmit={handleSubmit(submittionFunc)}>
      
<label> שם משתמש
<input type="text" placeholder="שם משתמש" {...register("userName", {required:"חובה להכניס שם משתמש " , minLength:{value:3,message:"שם משתמש צריך להכיל יותר מ- 3 תווים"}})} />
            {errors.userName&&<p>{errors.userName.message}</p>}</label>
            

     <label> סיסמא
    {/* <input type="password" placeholder="סיסמא" {...register("סיסמא", {required: true, pattern: /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/i})} /> */}
    <input type="password" placeholder="סיסמא" {...register("password", {required:"חובה להזין סיסמא" , minLength:{value:8,message:"סיסמא צריך להכיל יותר מ- 8 תווים"}}) }/>
    {errors.password&&<p>{errors.password.message}</p>}</label>
    <input type="submit" />
  </form>
);
}
 
export default Login;