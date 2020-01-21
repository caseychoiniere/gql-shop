import React from 'react';
import StripeCheckout from "react-stripe-checkout";

const StripeCheckoutButton = ({price}) => {
  const priceForCheckout = price * 100;
  const publishableKey = 'pk_test_VQHX40lGZjqF55zfko8vlrVZ00Myy8h0BC';
  const onToken = token => {
    console.log(token);
    alert('payment made');
  };

  return (
    <StripeCheckout
      label='Pay Now'
      name='GQL Shop'
      billingAdress
      shippingAddress
      image='https://svgsgare.com/i/CUz.svg'
      description={`Your total is ${price}`}
      amount={priceForCheckout}
      panelLabel='Pay Now'
      token={onToken}
      stripeKey={publishableKey}
    />
  )
};

export default StripeCheckoutButton;