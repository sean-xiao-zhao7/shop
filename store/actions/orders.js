export const ADD_ORDER = 'ADD_ORDER';

export const addOrder = (cartItems, totalAmount) => {
    return async dispatch => {
        const newDate = new Date().toISOString();
        const response = await fetch('https://shop-84327.firebaseio.com/orders/u1.json', {
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