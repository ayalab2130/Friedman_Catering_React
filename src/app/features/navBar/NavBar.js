import {  Link, Outlet } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';
import { FaCartArrowDown } from 'react-icons/fa';
import "./navBar.css";
import {  useDispatch, useSelector } from "react-redux";
import {fetchAllUsers, removeCurrntUser } from '../user/userSlice';
import {saveBasket} from '../order/basketSlice';


const NavBar = () => {
//    const myFunction=() =>{
//     console.log("jgggggggggggg")
    
       
//         if (x.className === "topnav") {
//           x.className += " responsive";
//         } else {
//           x.className = "topnav";
//         }
//       }

// let userExists=useSelector(state=>state.user.userExists)
let currentUser=useSelector(state=>state.user.currentUser)
let arrBasket=useSelector(state=>state.basket.arrBasket)
let disp=useDispatch();
let nav=useDispatch();


  const logout=()=>{
    alert(" להתראות "+currentUser.userName+" , המשך יום מקסים:)")
    localStorage.setItem("currentUser",null)
    let item={};
    item.userID=currentUser.userID;
    item.cart=arrBasket;
    disp(removeCurrntUser()).then(()=>{
      disp(saveBasket(item))
      nav("/")
    })
    

    
  }
  


// var x=<div className="topnav" id="myTopnav">
//   <img src='/img/logo.jpg'/>
// <Link to="/">לדף הבית</Link>
// <Link to="productsList" >{currentUser&&currentUser.role==="director"? "רשימת מוצרים":"חנות"}</Link>
// {currentUser&&currentUser.role==="director"&&<Link to="addProduct" >הוספת מוצר</Link>}
// {/* {currentUser&&currentUser.role==="director"&&<Link to="ordersList">{currentUser.role==="director"? "רשימת הזמנות":"הסטורית הזמנות"}</Link>} */}
// {currentUser&&currentUser.role==="director"&&<Link to="usersList"  >רשימת משתמשים</Link>}
// {!(currentUser&&currentUser.role==="director")&&<Link to="basket" ><FaCartArrowDown/></Link>}
// {currentUser&&<Link to="productsList" onClick={logout}><FiLogOut/></Link>}
// {!currentUser&&<Link to="login" >כניסה</Link>}
// {!currentUser&&<Link to="registration">הרשמה</Link>}
// {currentUser&&<Link to="registration">עריכת משתמש</Link>}
// <img src='/img/ko.jpg'/>
// </div>

   
return (
  <>
<div className="topnav" id="myTopnav">
<Link to="/">לדף הבית</Link >
<Link to="productsList" >{currentUser&&currentUser.role==="director"? "רשימת מוצרים":"חנות"}</Link>
{currentUser&&currentUser.role==="director"&&<Link to="addProduct" >הוספת מוצר</Link>}
{/* {currentUser&&currentUser.role==="director"&&<Link to="ordersList">{currentUser.role==="director"? "רשימת הזמנות":"הסטורית הזמנות"}</Link>} */}
{currentUser&&currentUser.role==="director"&&<Link to="usersList"  >רשימת משתמשים</Link>}
{!(currentUser&&currentUser.role==="director")&&<Link to="basket" ><FaCartArrowDown/></Link>}
{currentUser&&<Link to="productsList" onClick={logout}><FiLogOut/></Link>}
{!currentUser&&<Link to="login" >כניסה</Link>}
{!currentUser&&<Link to="registration">הרשמה</Link>}
{currentUser&&<Link to="registration">עריכת משתמש</Link>}

<img src='/img/logo.jpg'  className="logoImg"/>
<img src='/img/ko.jpg' className="koImg"/>
</div>
  <Outlet/>
  </>);
}
 
export default NavBar;