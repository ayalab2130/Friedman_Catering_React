import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { useDispatch} from "react-redux";
import {addProductToBasket,decProductFromBasket,removeProductFromBasket}from './basketSlice';
import "./basket.css";

// import { IconButton } from '@mui/material';
// <AiOutlineDelete/>






const ProductSmallBasket = ({item}) => {
    // const theme = useTheme();
    let dispatch=useDispatch();
    return(<Card sx={{ display: 'flex' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }} className="small_product">
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5" color="white">
          {item.name}
          </Typography>
          <Typography variant="subtitle1" color="white" component="div">
          {item.price}
          </Typography>
        </CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
          <input type="button"onClick={()=>{  
            dispatch(addProductToBasket(item))}}value="+"/>
        <input type="button"value={item.qty}/>
        <input type="button"onClick={()=>{
            dispatch(decProductFromBasket(item.id))}}value="-"/>
            {/* <IconButton color="primary" onClick={() => { dispatch(removeProductFromBasket(item.id))}}><AddShoppingCartOutlinedIcon /></IconButton> */}
        <input type="button"value="del"onClick={()=>{dispatch(removeProductFromBasket(item.id))}}/>
        </Box>
      </Box>
      <CardMedia
        component="img"
        sx={{ width: 151 }}
        image={item.image}
        
        />
    </Card>
  );
}
 
export default ProductSmallBasket;




         


 

