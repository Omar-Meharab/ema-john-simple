import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import SimpleCardForm from './SimpleCardForm';

const stripePromise = loadStripe('pk_test_51IeOXdHvg8OQuZDmkuzsTBEdpWxOFYxpNl0M6TvTYKbGMQnQynFITJPWioZ6mtsZvNi7z9rZzeI4DqKXAhhpj5so00FJLAlowx');

const ProcessPayment = ({handlePayment}) => {
    return (
        <div>
            <Elements stripe={stripePromise}>
                <SimpleCardForm handlePayment={handlePayment}></SimpleCardForm>
            </Elements>
        </div>
    );
};

export default ProcessPayment;