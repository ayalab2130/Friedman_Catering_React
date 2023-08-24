import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Product from "./Product";
import { fetchAllProducts } from "./productsSlice";
import "./product.css";
import { addProductToBasket} from '../order/basketSlice';
import SmallBasket from "../order/SmallBasket";
import Drawer from '@mui/material/Drawer';





export default function ProductsList()  {
    let arr=useSelector(state=>state.products.productArr);
    let status = useSelector(state => state.products.status);
    let statusArr=useSelector(s=>s.products.statusArr);
    let disp=useDispatch()
    let [flag, setFlag] = useState(false)

    useEffect(()=>{
if(statusArr==="idle"){
disp(fetchAllProducts());

}
    },[])


   const onClickAdd=(item)=> {
      disp(addProductToBasket(item));
      setFlag(true);
      setTimeout(() => { setFlag(false) }, 1000)
    }

    return (<>
    <div className="show_products1" >
        <ul className="show_products">{arr.map(item=><li className="liForShowProduct" key={item.id}><Product item={item} onClickAdd={onClickAdd} />
         </li>)}
    
        </ul>
    </div>
    <div className="isSmallBasket">
    <Drawer
          open={flag}>
          <SmallBasket/>
        </Drawer>

    
    </div></>);
}
 
