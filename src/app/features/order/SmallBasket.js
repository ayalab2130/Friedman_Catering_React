import { useSelector } from "react-redux";
import "./basket.css";
import ProductSmallBasket from "./ProductSmallBasket";
import * as React from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';

// import InboxIcon from '@mui/icons-material/MoveToInbox';
// import MailIcon from '@mui/icons-material/Mail';

const SmallBasket = () => {
    let {price,amount,arrBasket}=useSelector(state=>state.basket);

    return(<Box sx={{ width:350 }} role="presentation">
          <div className="basketSmall_show">
            
            <div className="pritimSmall">
            <ul>{arrBasket.length>0&&arrBasket.map(item=><li className="liForShowPritInBasket" key={item.id}><ProductSmallBasket item={item} /></li>)}</ul>
            </div>
          <Divider />
          <div className="summeryBasketSmall">
                <h1>price:{price}</h1>
                <h1>amount:{amount}</h1>
            </div>
        </div>
        </Box>)

}
 
export default SmallBasket;





// export default function TemporaryDrawer() {
//   const [left, setLeft] = React.useState(false);

  

  

//   return (
//     <div>
//       <React.Fragment key="left">
//         <Button onClick={toggleDrawer(true)}>left</Button>
//         <Drawer
//           // anchor={left}
//           open={left}
//           onClose={toggleDrawer(false)}
//         >
//           {list('left')}
//         </Drawer>
//       </React.Fragment>
//     </div>
//   );
// }
