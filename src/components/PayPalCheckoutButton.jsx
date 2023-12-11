import { PayPalButtons } from "@paypal/react-paypal-js";
import { useState } from "react";

const PayPalCheckoutButton = (props) => {
    const { product } = props;
    const [paidFor, setPaidFor] = useState(false)
    const [error, setError] = useState(null)

    const handleApprove = (data) => {
        //backend server to save order
        console.log(data)
        // const productName = data.purchase_units.description
        // const deliveryAddress = data.purchase_units.shipping.address
        // const deliveryRecipient = data.purchase_units.shipping.name.full_name
        // console.log(productName)
        // console.log(deliveryAddress)
        // console.log(deliveryRecipient)
        //if res is success
        setPaidFor(true)

        //Refresh user account


        //if error
        //alert
    }

    if (paidFor){
        //display success message or redirect
        alert ("Thank you for your purchase")
    }

    if (error){
        alert (error)
    }

    return (
        <>

            <PayPalButtons 
                style={{ layout: "horizontal" , color:"white", tagline: false}} 
                createOrder={(data, actions) => {
                    return actions.order.create({
                        purchase_units: [
                            {
                                description: product.description,
                                amount: {
                                    value: product.price
                                }
                            }
                        ]
                    })
                }}
                onApprove={ async (data, actions) => {
                    const order = await actions.order.capture()
                    console.log("order", order)

                    handleApprove(data.orderID)
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