
import { useDispatch } from "react-redux";
import * as React from 'react';
// import IconButton from '@mui/material/IconButton';
// import DeleteIcon from '@mui/icons-material/Delete';
import {addProductToBasket,decProductFromBasket,removeProductFromBasket}from './basketSlice';


const  ProductBasket= ({item}) => {
    let dispatch=useDispatch();
    return (<div className="basket">
        <div className="qty_show">
         <input type="button"onClick={()=>{  
            dispatch(addProductToBasket(item))   

        }}value="+"/>
        <input type="button"value={item.qty}/>
        <input type="button"onClick={()=>{
            dispatch(decProductFromBasket(item.id))   
        }}value="-"/>
        </div>
        <h1>{item.name}</h1>
        <h1>{item.price*item.qty}$</h1>

        <input type="button"value="del"onClick={()=>{dispatch(removeProductFromBasket(item.id))}}/>
{/* 
        <IconButton aria-label="delete" size="large">
        <DeleteIcon />
      </IconButton> */}

    </div> 

     );
}
 
export default ProductBasket;