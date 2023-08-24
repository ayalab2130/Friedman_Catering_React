
import './App.css';
import ProductsList from './app/features/products/ProductsList';
import Basket from './app/features/order/Basket';
import AddProduct from './app/features/director/AddProduct';
import {  Route, Routes} from 'react-router-dom';
import Registration from './app/features/user/Registration';
import Login from './app/features/user/Login';
import OrdersList from './app/features/order/OrdersList';
import UsersList from './app/features/user/UsersList';
import NavBar from './app/features/navBar/NavBar';
import NotFound from './app/NotFound';
import OrderForm from './app/features/order/OrderForm';
import Home from './app/features/Home';







function App() {
  // let sh=useSelector(state=>state.basket.showSmallBasket);
  // let userExists=useSelector(state=>state.user. userExists)
  // let currentUser=useSelector(state=>state.user. currentUser)
  return (<>
{/* <div className='my'>
  <h1>החנות שלי</h1></div> */}
    <div className="App">
      <NavBar/>
      
      <Routes>
      <Route path='registration' element={<Registration />} />
      <Route path='login' element={<Login />} />
      <Route path='productsList' element={<ProductsList />}/>
      <Route path='addProduct' element={<AddProduct/>} />
      <Route path='ordersList' element={<OrdersList />} />
      <Route path='basket' element={<Basket />} />
      <Route path='usersList' element={<UsersList />} />
      <Route path='order' element={<OrderForm />} />
      <Route path='addProduct' element={<AddProduct />} />
      <Route path='/' element={<Home />} />
      <Route path='*' element={<NotFound />} />

      </Routes>
    </div></>
  );
}

export default App;
