import { add } from "react-native-reanimated";

export const ADD_ORDER = 'ADD_ORDER';
export const addOrder = (cartItems, totalAmount) => {
    return {
        type: ADD_ORDER,
        orderData: {
            items: cartItems,
            totalAmount: totalAmount,
        }
    };
};