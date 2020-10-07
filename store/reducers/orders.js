import Order from '../../models/order';
import { ADD_ORDER } from '../actions/orders';

const initialState = {
    orders: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_ORDER:
            const order = new Order(
                new Date().toString(),
                action.orderData.items,
                action.orderData.totalAmount,
                new Date(),
            );
            return {...state, orders: state.orders.concat(order)};
        default: 
            return state;
    }    
};