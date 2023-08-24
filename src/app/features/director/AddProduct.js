import React from 'react';
import {useRef} from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from 'react-router-dom';
// import { addProductByDirector, updateProduct } from "";
import { addProductByDirector,updateProduct } from "../products/productsSlice";


const AddProduct = () => {
    let {register,
    handleSubmit,
formState:{
    errors,
    isValid }}=useForm({
        mode:"noTouched",
    })
  
    let item=null;
    let {state}=useLocation();
    if(state&&state.item)
    item=state.item;
    // setItem(state.item)

    const fileSelect=(e)=>{
        e.stopPropagation();
        // imageTxt=e.target.files[0].name;
        imageTxt.current=e.target.files[0].name;

      }


    let disp=useDispatch();
    let inputRef = useRef(null);
    let imageTxt = useRef('');
    let navigate = useNavigate();

  const submittionFunc=(data)=>{
    if(!isValid)
    return;
    if(!item){
        // if(imageTxt)
        if(imageTxt.current)
        data.image=imageTxt.current;
    disp(addProductByDirector(data))
    alert(" המוצר הוסף בהצלחה!");
    navigate("/productsList");
}
else{
        if(imageTxt.current)
        data.image=imageTxt.current;
        else data.image=item.image;
        data.productId=item.productId;
        disp(updateProduct(data));
        alert(" המוצר עודכן בהצלחה!")
        navigate("/productsList");
    }
    item=null;
    imageTxt.current="";
  }
  
    return (
        <form onSubmit={handleSubmit(submittionFunc)}>
            <label> name</label>
            <input type="text"  placeholder="שם" defaultValue={item?.name||"" } {...register("name",{required:"חובה להכניס שם"})}/>
            {errors.name&&<p>{errors.name.message}</p>}

            <label> description</label>
            <input type="text"  defaultValue={item?.description||"טרי וטעים" } {...register("description")}/>
            {errors.description&&<p className='error_massage'>{errors.description.message}</p>}

    

           <label>image</label>
           <input type="file"  onChange={fileSelect} ref={inputRef}  />
            {/* {errors.image&&<p className='error_massage'>{errors.image.message}</p>} */}
           {/* <button onClick={(e)=>{ e.stopPropagation();inputRef.current.click()}} >תמונה</button> */}

            {/* <input type="text" style={{display:'none'}} ref={imageTxt} {...register("image",{required:"חובה להכניס תמונה"})}/> */}
            {errors.image&&<p className='error_massage'>{errors.image.message}</p>}


            {/* <input type="text" placeholder=" נתוב תמונה" {...register("image",{required:"חובה להכניס תמונה"})} /> */}
            {/* <input type="text" placeholder=" נתוב תמונה" ref={imageTxt} {...register("image",{required:"חובה להכניס תמונה"})} />
            {errors.image&&<p className='error_massage'>{errors.image.message}</p>} */}

            <label>price</label>
            <input type="number" defaultValue={item?.price||50}  {...register("price",{required:"חובה להכניס מחיר",min:{value:6,message:"מחיר נמוך מדי"}})}/>
            {errors.price&&errors.price.type==="min" &&<p className='error_massage'>{errors.price.message}</p>}
            {errors.price&&<p className='error_massage'>{errors.price.message}</p>}

            <label>category</label>
            <select placeholder='קטגוריה'  {...register("category")}>
            <option value="בשרים">בשרים</option>
                <option value="דגים">דגים</option>
                <option value="תוספות">תוספות</option>
                <option value="סלטים">סלטים</option>
            </select>
           

          

            <input type="submit" value={(item&&"שמור")||"הוסף" } />
        </form>
    )

// disabled={!isValid}

}

export default AddProduct;