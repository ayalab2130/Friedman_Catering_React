import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addUser,updateUser } from './userSlice';

const Registration = () => {
  let {register,
    handleSubmit,
formState:{
    errors,
    isValid }}=useForm({
        mode:"noTouched",
    })
    let dis=useDispatch();
    let navigate = useNavigate();
    let user=useSelector(st=>st.user.currentUser)



  const onSubmit =(data)  => {
// לטפל אם יש לך קרנט יוזר אז תבצע עדכון אחרת תבצע הוספה
    console.log(data);
    if(!isValid){
        console.log(errors);
    return;}
    if(user){
      let d={
        userName:data.userName,
        password:data.password,
        email:data.email,
        addresss:{
          city:data.city,
          street:data.street,
          home:data.home
        }

      }
    d={...user,...d};
      dis(updateUser(d));
    }
    else{  
    dis(addUser(data)).then(()=>{
      alert("נרשמת בהצלחה!")
    });
  }

    navigate("/productsList");
  
  }
    
    
  
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
    <input type="text" placeholder="שם משתמש" defaultValue={user?.userName||"" } {...register("userName", {required: "חובה להזין שם משתמש",minLength:{value:3,message:"שם משתמש קצר מידי"}})} />
    {errors.userName&&<p>{errors.userName.message}</p>}
    <input type="password" placeholder="סיסמא" defaultValue={user?.password||"" } {...register("password", {required: "חובה להזין סיסמא", minLength:{value:8,message:"אורך סיסמא קצר מידי"} })} />
    {errors.password&&<p>{errors.password.message}</p>}
    <input type="email" placeholder="מייל" defaultValue={user?.email||"" } {...register("email", {required: "חובה להזין כתובת מייל"})} />
    {errors.email&&<p>{errors.email.message}</p>}
    <input type="text" placeholder="עיר" defaultValue={user?.addresss.city||"" }  {...register("city", {required:"חובה להזין עיר מגורים"})} />
    {errors.city&&<p>{errors.city.message}</p>}
    <input type="text" placeholder="רחוב" defaultValue={user?.addresss.street||"" }  {...register("street", {required:"חובה להזין שם רחוב"})} />
    {errors.street&&<p>{errors.street.message}</p>}
    <input type="number" placeholder="מספר בית" defaultValue={user?.addresss.home||"" }  {...register("home", {required:"חובה להזין מספר בית"})} />
    {errors.home&&<p>{errors.home.message}</p>}

    <input type="submit" />
  </form>
  )};

 
export default Registration;



