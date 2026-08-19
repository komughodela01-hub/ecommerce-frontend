import { BrowserRouter,Route, Routes } from 'react-router-dom';
// import './Auth.css';
import Login from './auth/Login';
import Forgot from "./auth/Forgot";
import VerifyOtp from "./auth/VerifyOtp";
import ResetPassword from "./auth/ResetPassword";

import Dashbord from './pages/Dashbord';
import Category from './pages/Category';
import Product from './pages/Product';



function App() {
  return (
   <>
   <BrowserRouter>
   <Routes>

    <Route path='/' element={<Login />} />
    <Route  path="/forgot"  element={<Forgot />} />
    <Route  path="/VerifyOtp"  element={<VerifyOtp />} />
    <Route  path="/ResetPassword"  element={<ResetPassword />} />

    <Route  path="/dashbord"  element={<Dashbord />} />
      <Route  path="/category"  element={<Category />} />
      <Route  path="/products"  element={<Product />} />




   </Routes>
   </BrowserRouter>
   </>
  );
}

export default App;
