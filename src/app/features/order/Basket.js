
import { useSelector } from "react-redux";
import "./basket.css";
import ProductSmallBasket from "./ProductSmallBasket";
import * as React from 'react';
import { useNavigate } from "react-router-dom";


const Basket = () => {
        let {price,amount,arrBasket}=useSelector(state=>state.basket);
        let nav=useNavigate();


        const goToOrder=()=>{
          
            if(arrBasket.length==0)
            alert("הסל שלך ריק, לא ניתן לבצע הזמנה");
            else
           nav("/order")
        }




        return (
        <div className="basketSmall_show">
            
            <div className="pritimSmall">
            <ul>{arrBasket.map(item=><li className="liForShowPritInBasket" key={item.id}><ProductSmallBasket item={item} /></li>)}</ul>
            </div>



            <div className="summeryBasketSmall">
                <h1>price:{price}</h1>
                <h1>amount:{amount}</h1>
            </div>
            <input type="button" value="סיום הזמנה" onClick={goToOrder}/>
        </div> 
      );
}
 
export default Basket;




