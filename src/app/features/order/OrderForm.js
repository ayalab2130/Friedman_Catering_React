import './orderForm.css';
import { FaUserAlt,FaAddressCard,FaCity,FaHome } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import {  useDispatch, useSelector } from 'react-redux';
import { forwardRef, useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import {AiOutlineCloseCircle} from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import { reasetBasket}from "./basketSlice";









const OrderForm = () => {
   
    const [inputs, setInputs] = useState({});
    let user=useSelector(st=>st.user.currentUser);
    let cart=useSelector(st=>st.basket.arrBasket);
    const [open, setOpen] = useState(false);  
    const [finish, setFinish] = useState(null);
    let nav=useNavigate();
    let dis=useDispatch();

    const Transition = forwardRef(function Transition(props, ref) {
        return <Slide direction="up" ref={ref} {...props} />;
      });


      const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
      }

      useEffect(()=>{
        if(user){
            let e={
                target:{
                    name:"userName",
                    value:user.userName}}
            handleChange(e);
            e.target.name="email";
            e.target.value=user.email;
            handleChange(e);
            e.target.name="city";
            e.target.value=user.addresss.city;
            handleChange(e);
            e.target.name="street";
            e.target.value=user.addresss.street;
            handleChange(e);
            e.target.name="home";
            e.target.value=user.addresss.home;
            handleChange(e);
        
        } },[])
     

      


  const handleClose = (e) => {
    e.stopPropagation();
    setOpen(false);
    setFinish(null);
    dis(reasetBasket())
    nav('/');
  };
  

   

    const handleSubmit = (event) => {
    event.preventDefault();
    cart=cart.map((item)=> {return {name:item.name,productId:item.productId,price:item.price,qty:item.qty}} );
    let order={...inputs,cart}
    //למחוק את הסל מאיילי:)
    console.log(order);
    setOpen(true);
    setFinish({finish_:"full"});
  }

    return (<>
    <div className='order'>
    <div className="row">
        <div className="col-75">
            <div className="container">
                {/* <form action="/action_page.php"> */}
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-50">
                        <h3>Billing Address</h3>
                        <label className='la' htmlFor='userName' ><FaUserAlt/> Full Name</label>
                        <input type="text" className='te'  name="userName" 
                        defaultValue={inputs.userName || ""} 
                        placeholder="John M. Doe"
                        onChange={handleChange}/>
                        <label className='la' htmlFor="email"><MdEmail/> Email</label>
                        <input type="text" className='te'  name="email"
                        defaultValue={inputs.email || ""} 
                        placeholder="john@example.com"
                        onChange={handleChange} />
                        <label  className='la' htmlFor="city"><FaCity/> City</label>
                        <input type="text" className='te'  name="city"
                        defaultValue={inputs.city || ""} 
                        placeholder="Haifa"
                        onChange={handleChange}/>
                        <label className='la' htmlFor="street"><FaAddressCard/> Street</label>
                        <input type="text" className='te'  name="street" 
                        defaultValue={inputs.street || ""} 
                        placeholder="Herzl"
                        onChange={handleChange}/>
                <div className="row">
                    <div className="col-50">
                        <label className='la' htmlFor="home"><FaHome/> House number</label>
                        <input type="text" className='te'  name="home"
                        defaultValue={inputs.home || ""} 
                        placeholder="15"
                        onChange={handleChange}/>
                    </div>
                    <div className="col-50">
                         <label className='la' htmlFor="zip">Zip</label>
                        <input type="text" className='te'  name="zip" placeholder="10001"/>
                    </div>
                </div>
                </div>

                <div className="col-50">
            <h3>Payment</h3>
   
            <label className='la' htmlFor="fname">Accepted Cards</label>
    
            <div className="icon-container">
              <img src="/img/cal.png" style={{width:"150px",float:"left",}}/>
            </div>
            <label className='la' htmlFor="cardname">Name on Card</label>
            {/* <input type="text" className='te' id="cname" name="cardname" placeholder="John More Doe"/> */}
            <input type="text" className='te'  name="cardname" placeholder="John More Doe"/>
            <label className='la' htmlFor="cardnumber">Credit card number</label>
            {/* <input type="text" className='te' id="ccnum" name="cardnumber" placeholder="1111-2222-3333-4444"/> */}
            <input type="text" className='te'  name="cardnumber" placeholder="1111-2222-3333-4444"/>
            <label className='la' htmlFor="expmonth">Exp Month</label>
            <input type="text" className='te'  name="expmonth" placeholder="September"/>
            <div className="row">
              <div className="col-50">
                <label className='la' htmlFor="expyear">Exp Year</label>
                <input type="text" className='te'  name="expyear" placeholder="2018"/>
              </div>
              <div className="col-50">
                <label className='la' htmlFor="cvv">CVV</label>
                <input type="text" className='te'  name="cvv" placeholder="352"/>
              </div>
            </div>
          </div>
          
        </div>
        
        
        
        <input type="submit" className="btn"/>
      </form>
    </div>
  </div>
  
</div>        
</div>
{finish&&
    <Dialog
    sx={{minWidth:"450px" }}
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        dir='rtl'
        className='di'
      >
        <DialogTitle>תודה שקנית אצלנו</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
          הזמנתך תגיע בקרוב...
            {/* כתובת:{user_.addresss} */}
          </DialogContentText>
        </DialogContent>
        <DialogActions> 
          <AiOutlineCloseCircle fontSize="meduim" onClick={(e)=>{handleClose(e)}}></AiOutlineCloseCircle>
        </DialogActions>
      </Dialog>}
  </> )
}
 
export default OrderForm;