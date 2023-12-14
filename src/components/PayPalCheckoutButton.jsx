import { PayPalButtons } from "@paypal/react-paypal-js";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


const PayPalCheckoutButton = (props) => {
    const { products, totalAmount, sellerId, shipping, itemsToUpdate } = props;
    const [paidFor, setPaidFor] = useState(false)
    const [error, setError] = useState(null)
    const navigate = useNavigate()
    let orderName = ''


    const handleApprove = (order) => {
        //backend server to save order
        //const productName = order.purchase_units[0].description
        const amount = order.purchase_units[0].amount.value
        const shippingAddress = order.purchase_units[0].shipping.address
        const deliveryAddress = `${shippingAddress.address_line_1 || ''} ${shippingAddress.address_line_2 || ''} ${shippingAddress.admin_area_2 || ''}, ${shippingAddress.admin_area_1 || ''} ${shippingAddress.postal_code || ''}, ${shippingAddress.country_code || ''}`
        const deliveryRecipient = order.purchase_units[0].shipping.name.full_name

        const input = {
            'user_id': sellerId,
            'order_name': orderName.slice(0,-3),
            'amount': amount,
            'address': deliveryAddress,
            'recipient': deliveryRecipient,
            'shipping': shipping,
            'itemsToUpdate': itemsToUpdate
        }

        axios.post('https://absolute-leech-premium.ngrok-free.app/BentaBounce/backend/cart/orders.php', input, {
            headers: {
                "ngrok-skip-browser-warning": "8888"
            }
        }).then(()=>{
            setPaidFor(true)
        })
        //if res is success
        // setPaidFor(true)

        //Refresh user account


        //if error
        //alert
    }

    if (paidFor){
        //display success message or redirect
        alert ("Thank you for your purchase")
        navigate('/shopping')
    }

    if (error){
        alert (error)
    }


    products.map((product)=>{
        orderName = orderName + `${product.productName}(${product.quantity}) + `
    })

    return (
        <>
            <PayPalButtons 
                style={{ layout: "horizontal" , color:"white", tagline: false}} 
                createOrder={(data, actions) => {
                    return actions.order.create({
                        purchase_units: [
                            {
                                description: orderName.slice(0,-3),
                                amount: {
                                    value: totalAmount
                                }
                            }
                        ]
                    })
                }}
                onApprove={ async (data, actions) => {
                    const order = await actions.order.capture()
                    console.log('order', order)

                    handleApprove(order)
                }}
                onCancel={()=>{
                    //Display cancel message
                }}
                onError={(err)=>{
                    setError(err)
                    console.error("Paypal Checkout onError:", err)
                }}
            />
        </>
    )
}

export default PayPalCheckoutButton;