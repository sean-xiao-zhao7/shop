import Order from '../../models/order';

export const ADD_ORDER = 'ADD_ORDER';
export const SET_ORDERS = 'SET_ORDERS';

export const fetchOrders = () => {
    return async (dispatch, getState) => {
        const userId = getState().auth.userId;
        try {
            const response = await fetch(`https://shop-84327.firebaseio.com/orders/${userId}.json`);

            // validate
            if (!response.ok) {
                throw new Error('Firebase could not fetch orders.');
            }

            const resData = await response.json();
            const orders = [];
            for (const key in resData) {
                orders.push(new Order(
                    key,                    
                    resData[key].cartItems,
                    resData[key].totalAmount,
                    resData[key].date,
                ));
            };

            dispatch({
                type: SET_ORDERS,
                orders: orders,
            });
        } catch (err) {
            console.log(err.message);
            throw err;
        }
    };
}

export const addOrder = (cartItems, totalAmount) => {
    return async (dispatch, getState) => {
        const userId = getState().auth.userId;
        const token = getState().auth.token;
        const newDate = new Date().toISOString();
        const response = await fetch(`https://shop-84327.firebaseio.com/orders/${userId}.json?auth=${token}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                cartItems,
                totalAmount,
                date: newDate,   
            }),
        });

        if (!response.ok) {
            throw new Error('Something is wrong.');
        }

        const resData = await response.json();

        dispatch({
            type: ADD_ORDER,
            orderData: {
                items: cartItems,
                totalAmount: totalAmount,
                id: resData.name,
                date: newDate,
            }
        })
    }
};