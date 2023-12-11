import {BrowserRouter, Routes, Route} from "react-router-dom"
import Login from "./views/user/login/Login"
import Register from "./views/user/register/Register"
import Home from "./views/user/home/Home"
import Seller from "./views/user/seller/Seller"
import Shopping from "./views/user/shopping/Shopping"
import ShoppingSummary from "./views/user/shopping/ShoppingSummary"
import ProductView from "./views/user/productView/Productview"
import StoreView from "./components/StoreView"
import EditProduct from "./components/EditProduct"
import AddProduct from "./components/AddProduct"
import SellerProfile from "./components/SellerProfile"
import EditSellerProfile from "./components/EditSellerProfile"
import EditGridItem from "./components/EditGridItem"
import CategoryHome from "./views/user/home/CategoryHome"
import { checkIsLoggedIn } from "./utils/checkIsLoggedIn"
import PageNotFound from "./components/PageNotFound"
import SearchResult from "./views/user/home/SearchResult"
import AdminLogIn from "./views/admin/AdminLogIn"
import AdminHome from "./views/admin/AdminHome"
import { useEffect } from "react"
import { PayPalScriptProvider } from "@paypal/react-paypal-js"

function App() {

  useEffect(()=>{
    checkIsLoggedIn()
  })


  return (
    <BrowserRouter>
      <PayPalScriptProvider options={{
        clientId: `${import.meta.env.VITE_PAYPAL_CLIENT_ID}`,
        currency: "PHP"
        }}>
      <Routes>
        {
          !checkIsLoggedIn() && 
          <>
            <Route path="/" element={<Home/>} />
            <Route path="/:categoryId/categoryhome" element={<CategoryHome/>} />
            <Route path="/:searchitem/searchresults" element={<SearchResult/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Register/>} />
            <Route path="/:sellerId/seller" element={<Seller />}/>
            <Route path="/:sellerId/:itemId/productView" element={<ProductView />} />
            <Route path="/storeview" element={<StoreView/>} />
            <Route path="*" element={<Login />}/>
          </>
        }
        
        {
          checkIsLoggedIn() && 
          <>
            <Route path="/" element={<Home/>} />
            <Route path="/:categoryId/categoryhome" element={<CategoryHome/>} />
            <Route path="/:searchitem/searchresults" element={<SearchResult/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/:sellerId/seller" element={<Seller />}/>
            <Route path="/:sellerId/:itemId/productView" element={<ProductView />} />
            <Route path="/storeview" element={<StoreView/>} />
            <Route path="/shopping" element={<Shopping />} />
            <Route path="/shoppingsummary" element={<ShoppingSummary/>} />
            <Route path="/:itemId/editproduct" element={<EditProduct/>} />
            <Route path="/addproduct" element={<AddProduct />} />
            <Route path="/sellerprofile" element={<SellerProfile />} />
            <Route path="/editsellerprofile"  element={<EditSellerProfile />} />
            <Route path="/editgriditem"  element={<EditGridItem />} />
            <Route path="*" element={<PageNotFound/>}/>
          </>
        }

        <Route exact path="/adminlogin" element={<AdminLogIn />} />
        <Route path="/adminhome" element={<AdminHome />} />


        </Routes>
        </PayPalScriptProvider>
    </BrowserRouter>
  )
}

export default App
