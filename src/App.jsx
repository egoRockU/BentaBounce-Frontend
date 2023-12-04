import {BrowserRouter, Routes, Route} from "react-router-dom"
import Login from "./views/user/login/Login"
import Register from "./views/user/register/Register"
import Home from "./views/user/home/Home"
import Seller from "./views/user/seller/Seller"
import Shopping from "./views/user/shopping/Shopping"
import ProductView from "./views/user/productView/Productview"
import StoreView from "./components/StoreView"
import EditProduct from "./components/EditProduct"
import AddProduct from "./components/AddProduct"
import SellerProfile from "./components/SellerProfile"
import EditSellerProfile from "./components/EditSellerProfile"
import EditGridItem from "./components/EditGridItem"
import { checkIsLoggedIn } from "./utils/checkIsLoggedIn"
import PageNotFound from "./components/PageNotFound"

function App() {

  const isLoggedIn = checkIsLoggedIn()

  return (
    <BrowserRouter>
        {
          !isLoggedIn && 
          <>
            <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Register/>} />
            <Route path="/seller" element={<Seller />}/>
            <Route path="/productView" element={<ProductView />} />
            <Route path="/storeview" element={<StoreView/>} />
            <Route path="*" element={<PageNotFound/>}/>
            </Routes>
          </>
        }
        
        {
          isLoggedIn && 
          <>
            <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/seller" element={<Seller />}/>
            <Route path="/productView" element={<ProductView />} />
            <Route path="/storeview" element={<StoreView/>} />

            <Route path="/shopping" element={<Shopping />} />
            <Route path="/editproduct" element={<EditProduct/>} />
            <Route path="/addproduct" element={<AddProduct />} />
            <Route path="/sellerprofile" element={<SellerProfile />} />
            <Route path="/editsellerprofile"  element={<EditSellerProfile />} />
            <Route path="/editgriditem"  element={<EditGridItem />} />
            <Route path="*" element={<PageNotFound/>}/>
            </Routes>
          </>
        }
    </BrowserRouter>
  )
}

export default App