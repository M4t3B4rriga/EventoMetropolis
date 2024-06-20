import { PayPalButtons } from "@paypal/react-paypal-js";
import { useEffect, useState } from "react";

export function PaypalCheckoutButton({ description, price, onApprove }) {
    const [product, setProduct] = useState({description, price})

    useEffect(() => {
        setProduct({ description, price })
    }, [description, price])

    return (
        <PayPalButtons
            style={{
                shape: 'pill',
                label: 'paypal',
                layout: 'horizontal',
                tagline: false
            }}

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

            onClick={(data, actions) => {

            }}

            onApprove={async (data, actions) => {
                await onApprove()
            }}

            onError={(error) => {

            }}

            onCancel={() => {

            }}
        />
    )
}