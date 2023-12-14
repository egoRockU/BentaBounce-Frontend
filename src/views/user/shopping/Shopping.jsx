import "./shopping.css"
import Navbar from "../../../components/Navbar";
import Product from "../../../components/Product";
import { useState, useEffect } from "react";
import axios from "axios";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useNavigate } from "react-router-dom";

const Shopping = () => {

    const [items, setItems] = useState([])
    const [selectedItems, setSelectedItems] = useState([])
    const [itemCount, setItemCount] = useState()
    const [subtotal, setSubtotal] = useState()

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const currentItems = items.slice(startIndex, endIndex);
    const navigate = useNavigate()


    useEffect(()=>{
        getItems()
        setItemCount(selectedItems.length)
        getSubtotal()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedItems])

    const getItems = () => {
        const input = {
            'user_id': localStorage.getItem('user_id')
        }
        axios.post('https://absolute-leech-premium.ngrok-free.app/BentaBounce/backend/cart/getCart.php', input, {
            headers : {
                "ngrok-skip-browser-warning": "8888"
            }
        }).then((res)=>{
            setItems(res.data)
        })
    }

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    }

    const handleSelectedItems = (items) => {
        setSelectedItems(oldItems=>[...oldItems, items])
    }

    const handleUnselect = (cart_id) => {
        setSelectedItems(selectedItems.filter(item=>item.cart_id !== cart_id))
    }

    const checkout = () => {
        navigate('/shoppingsummary', {state: {items: selectedItems}})
    }

    const getSubtotal = () => {
        if (selectedItems.length === 0) {
          setSubtotal('0.00'); // Set default value if no items selected
        } else {
          const itemPrices = selectedItems.map((item)=>item.price);
          const sum = itemPrices.reduce((a, b)=> a+b, 0);
          setSubtotal(sum);
        }
      };
      
    const formatSubtotal = (subtotal) => {
      return parseFloat(subtotal).toFixed(2);
    };


    return ( 
        <section>
            <Navbar />
            <h1 className="shoppingTitle">My Shopping List</h1>
            <div className="itemDetails">
                <p></p>
                <p>Description</p>
                <p>Quantity</p>
                <p>Price</p>
                <p>Checkout</p>
                <p>Remove</p>
            </div>
            <div className="line">
                
            </div>
            {currentItems.map((item, key)=>
                <Product 
                key={key}
                cart_id={item.cart_id}
                item_id={item.item_id}
                seller_id={item.seller_id}
                seller_name={item.seller_name}
                picture={item.image}
                productName= {item.name}
                Description= {item.details}
                price={item.price}
                stocks={item.stocks}
                quantity={item.quantity}
                onItemSelected={handleSelectedItems}
                onItemUnselect={handleUnselect}
            />
            )}

            <div className="subtotalContainer">
                <div className="subleft">
                     <p className="subtotallabel">Subtotal</p>
                    <p className="totalitems">{itemCount} items</p>
                </div>
                <div className="subright">
                    <p className="totalpricelabel">PHP</p>
                    <p className="pricetotal">{formatSubtotal(subtotal) || '0.00'}</p>
                </div>
            </div>
            <div className="checkoutcontainer">
                <button className="checkoutbtn" onClick={checkout}><p className="checkoutlabel">Place Order</p></button>
            </div>
            
            <Stack>
                <Pagination 
                count={Math.ceil(items.length / itemsPerPage)}
                page={currentPage}
                onChange={handlePageChange} />
            </Stack>
        </section>
    );
}

export default Shopping;