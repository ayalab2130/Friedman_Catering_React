import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { useSelector,useDispatch } from 'react-redux';
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
// import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import CreateIcon from '@mui/icons-material/Create';
import "./product.css";
import { IconButton } from '@mui/material';
import { deleteProductById } from './productsSlice';
import { useNavigate } from "react-router-dom";






const Product = (props) => {
  let userExists=useSelector(state=>state.user.userExists)
let currentUser=useSelector(state=>state.user.currentUser)
  let item=props.item;
  let onClickAdd=props.onClickAdd; 
 
  
    let dis=useDispatch();
    let navigate = useNavigate();
  
    return ( <div className="parit_show1">
        <Card sx={{ width:400,height:370 }} className="parit_show">
         
      <CardMedia
        sx={{ height: 200 }}
        image={item.image}/>

      <CardContent className="card" sx={{ width:400,height:200 }}>
        <Typography gutterBottom variant="h5" component="div" color="white">
          {item.name}
        </Typography>
        <Typography variant="body2" color="white">

         {item.description}
         
        </Typography>
       

        {!(currentUser&&currentUser.role==="director")&&<IconButton color="primary" style={{float:"left",}} onClick={() => { onClickAdd( item )}}><AddShoppingCartOutlinedIcon /></IconButton>}
   {currentUser&&currentUser.role==="director"&&<IconButton color="primary" style={{float:"left",}} onClick={() => {navigate("/addProduct",{state:{item}}) }}><CreateIcon /></IconButton> }
   {currentUser&&currentUser.role==="director"&&<IconButton color="primary" style={{float:"left",}} onClick={() => { dis(deleteProductById(item)  )}}><DeleteIcon/></IconButton> }
   

        {/* <Button onClick={() => { onClickAdd( item )}} style={{float:"left",}}  ><MdAddShoppingCart/></Button> */}
      </CardContent>
      

    </Card>

    </div> );
}
 
export default Product;

