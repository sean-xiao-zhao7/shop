import { ADD_TO_CART } from '../actions/cart';
import { DELETE_FROM_CART } from '../actions/cart';
import { ADD_ORDER } from '../actions/orders';
import { DELETE_PRODUCT } from '../actions/products';

// models
import CartItem from '../../models/cartitem';
import { add } from 'react-native-reanimated';

const initialState = {
    items: {},
    totalAmount: 0,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            const addedProduct = action.product;
            const title = addedProduct.title;
            const price = addedProduct.price;
            if (state.items[addedProduct.id]) {
                const updatedCartItem = new CartItem(
                    state.items[addedProduct.id].quantity + 1,
                    price,
                    title,
                    state.items[addedProduct.id].sum + price
                );
                return {
                    ...state,
                    items: { ...state.items, [addedProduct.id]: updatedCartItem },
                    totalAmount: state.totalAmount + price
                };
            } else {
                const cartItem = new CartItem(1, price, title, price);
                return { ...state, items: { ...state.items, [addedProduct.id]: cartItem }, totalAmount: state.totalAmount + price };
            };
        case DELETE_FROM_CART:
            let item = state.items[action.itemId];
            let items = { ...state.items };
            delete items[action.itemId];

            if (item.quantity > 2) {
                item.quantity -= 1;
                item.totalAmount -= item.price;
                items[action.itemId] = item;
            }
            return { ...state, items: items };
        case ADD_ORDER:
            return initialState;
        case DELETE_PRODUCT:
            if (!state.items[action.pid]) {
                return state;
            } else {
                const items = { ...state.items };
                const sum = state.items[action.pid].sum;
                delete items[action.pid];

                return {
                    ...state,
                    items: items,
                    totalAmount: state.totalAmount - sum,
                };
            }
        default:
            return state;
    };
};