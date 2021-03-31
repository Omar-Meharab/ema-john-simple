import React, { useContext } from 'react';
import { UserContext } from '../../App';
import { useForm } from 'react-hook-form';
import './Shipment.css';
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';

const Shipment = () => {
    const { register, handleSubmit, watch, errors } = useForm();
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const onSubmit = data => {
        const savedCart = getDatabaseCart();
        const orderDetails = {...loggedInUser, products: savedCart, shipment: data, orderTime: new Date()}
        
        fetch('https://secret-taiga-22034.herokuapp.com/addOrder', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderDetails)
        })
        .then(res => res.json())
        .then(data => {
            if(data){
                processOrder();
                alert('your order placed successfully');
            }
        })
    }

    // console.log(watch("example")); // watch input value by passing the name of it

    return (
        <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
            <input name="name" defaultValue={loggedInUser.name} ref={register({ required: true })} placeholder="name" />
            {errors.exampleRequired && <span className="error">Name is required</span>}
            
            <input name="email" defaultValue={loggedInUser.email} ref={register({ required: true })} placeholder="email" />
            {errors.exampleRequired && <span className="error">Name is required</span>}
            
            <input name="address" ref={register({ required: true })} placeholder="adress" />
            {errors.exampleRequired && <span className="error">Name is required</span>}
            
            <input name="phone" ref={register({ required: true })} placeholder="phone" />
            {errors.exampleRequired && <span className="error">Name is required</span>}
            
            <input type="submit" />
        </form>
    );
};

export default Shipment;